/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ForbiddenException, Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './users.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async addUser(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 8);
    const res = await this.usersRepository.save({
      username,
      email,
      password: hashedPassword,
      avatarUrl: '',
      role: 'user',
    });
    return res;
  }

  async getUsers(cursor: number, take: number) {
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

  async updateUser(
    userId: string,
    userData: UpdateUserDto,
    isHashed?: boolean,
  ) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const hashedPassword = await bcrypt.hash(userData.password, 8);
    const updatedUserData = {
      ...userData,
      password: isHashed ? userData.password : hashedPassword,
    };
    return await this.usersRepository.save({
      ...user,
      ...updatedUserData,
    });
  }

  async deleteUser(userId: string) {
    this.usersRepository.delete({ id: userId });
    return userId;
  }
}
