/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ForbiddenException, Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './users.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as admin from 'firebase-admin';
import { generateMnemonic } from 'bip39';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const aws = require('aws-sdk');

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  private generateMnemonic = generateMnemonic;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async addUser(username: string, email: string, password: string) {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    const seed = this.generateMnemonic();
    const res = await this.usersRepository.save({
      username,
      email,
      password: hashedPassword,
      avatarUrl: '',
      role: 'user',
      seed,
    });
    return res;
  }

  async getUsers(
    cursor: number,
    take: number,
    filterBy?: string,
    order?: string,
  ) {
    if (filterBy) {
      return await this.usersRepository.find({
        order: { [filterBy]: order },
        take: take,
        skip: cursor,
      });
    }
    const res = await this.usersRepository.find({
      order: { created_at: 'DESC' },
      take: take,
      skip: cursor,
    });
    return res;
  }

  async getSingleUser(userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    return {
      ...user,
    };
  }

  async getSingleUserByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });
    if (!user) {
      throw new ForbiddenException(`User not found`);
    }
    return {
      ...user,
    };
  }

  async getUsersCount() {
    const res = await this.usersRepository.count();
    return res;
  }

  async banUser(userId: string) {
    const banUser = await this.usersRepository.findOne({
      where: { id: userId },
    });
    return await this.usersRepository.save({
      ...banUser,
      is_deleted: true,
    });
  }

  async unbanUser(userId: string) {
    const banUser = await this.usersRepository.findOne({
      where: { id: userId },
    });
    return await this.usersRepository.save({
      ...banUser,
      is_deleted: false,
    });
  }

  async updateUser(userId: string, userData: UpdateUserDto, image?: any) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const updatedUserData = {
      ...userData,
    };
    if (image) {
      const avatarUrl = await this.uploadFileWithS3(image);
      return await this.usersRepository.save({
        ...user,
        ...updatedUserData,
        avatarUrl,
      });
    }
    return await this.usersRepository.save({
      ...user,
      ...updatedUserData,
    });
  }

  async updatePassword(userId: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const hashedPassword = await bcrypt.hash(password, 8);
    return await this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  async deleteUser(userId: string) {
    this.usersRepository.delete({ id: userId });
    return userId;
  }

  async searchUser(searchParam: string) {
    const res = await this.usersRepository.find({
      where: [
        { id: Like(`%${searchParam}%`) },
        { username: Like(`%${searchParam}%`) },
        { email: Like(`%${searchParam}%`) },
        { role: Like(`%${searchParam}%`) },
      ],
    });

    return res;
  }

  async uploadFile(file) {
    const bucket = admin.storage().bucket();
    console.log('file', file);

    const filename = file.originalname;

    // Uploads a local file to the bucket
    await bucket
      .file(filename)
      .save(file.buffer)
      .then(res => console.log(res));
    const bucketFile = bucket.file(filename);
    console.log('uploaded');

    const urls = await bucketFile.getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });

    console.log(`${filename} uploaded.`);

    return urls[0];
  }

  async uploadFileWithS3(file) {
    aws.config.update({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      region: 'us-east-1',
    });
    const s3 = new aws.S3();

    const base64Data = new Buffer(file.buffer, 'binary');

    const filename = file.originalname;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: filename,
      Body: base64Data,
    };
    const uploadedImage = await s3
      .upload(params, async (err, data) => {
        if (err) {
          throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
      })
      .promise();

    return uploadedImage.Location;
  }
}
