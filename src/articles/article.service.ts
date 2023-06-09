import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as admin from 'firebase-admin';
import { ArticlesToUsers } from 'src/articlesToUsers/articlesToUsers.entity';
import { Category } from 'src/category/category.entity';
import { Repository } from 'typeorm';
import { UpdateArticleDto } from './article.dto';
import { Article } from './article.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ArticleLikes } from 'src/articleLikes/articleLikes.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const aws = require('aws-sdk');

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(ArticlesToUsers)
    private articlesToUsersRepository: Repository<ArticlesToUsers>,
    @InjectRepository(ArticleLikes)
    private articleLikesRepository: Repository<ArticleLikes>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async getArticles(
    cursor: number,
    take: number,
    category?: string,
    userId?: string,
  ) {
    const res = await this.articleRepository.find(
      !category
        ? {
            order: { created_at: 'DESC' },
            take: take,
            skip: cursor,
          }
        : {
            order: { created_at: 'DESC' },
            take: take,
            skip: cursor,
            where: {
              categoryId: category,
            },
          },
    );
    const categoriesIds = Promise.all(
      res.map(async article => {
        let updatedArticle = { ...article } as any;
        const category = await this.categoriesRepository.findOne({
          where: { id: article.categoryId },
        });

        const userToArticle = await this.articlesToUsersRepository.findOne({
          where: { articleId: article.id, userId },
        });

        if (category) {
          updatedArticle = {
            ...updatedArticle,
            categoryId: category.id,
            categoryName: category.name,
          };
        }

        if (userToArticle) {
          updatedArticle = { ...updatedArticle, isNew: false };
        } else {
          updatedArticle = { ...updatedArticle, isNew: true };
        }

        return updatedArticle;
      }),
    );
    return categoriesIds;
  }

  async getArticlesCount(categoryId?: string) {
    if (categoryId) {
      const res = await this.articleRepository.findAndCount({
        where: { categoryId },
      });
      return res;
    }
    const res = await this.articleRepository.count();
    return res;
  }

  async addArticle(
    title,
    title_ru,
    title_ua,
    title_de,
    title_es,
    title_fr,
    title_pt,
    title_tr,
    text,
    text_ru,
    text_ua,
    text_de,
    text_es,
    text_fr,
    text_pt,
    text_tr,
    subtitle,
    subtitle_ru,
    subtitle_ua,
    subtitle_de,
    subtitle_es,
    subtitle_fr,
    subtitle_pt,
    subtitle_tr,
    categoryId,
    publicUrl,
    image: Express.Multer.File,
  ) {
    const url = await this.uploadFile(image);

    const sameArticleUrl = await this.articleRepository.findOne({
      where: { publicUrl },
    });

    if (sameArticleUrl) {
      return { error: true, message: 'Article with this url already exists' };
    }

    const res = await this.articleRepository.save({
      title,
      title_ru,
      title_ua,
      title_de,
      title_es,
      title_fr,
      title_pt,
      title_tr,
      text,
      text_ru,
      text_ua,
      text_de,
      text_es,
      text_fr,
      text_pt,
      text_tr,
      subtitle,
      subtitle_ru,
      subtitle_ua,
      subtitle_de,
      subtitle_es,
      subtitle_fr,
      subtitle_pt,
      subtitle_tr,
      imageUrl: url,
      likesCount: 0,
      viewsCount: 0,
      categoryId,
      publicUrl,
    });
    return res;
  }

  async deleteArticle(articleId: string) {
    await this.articleRepository.delete({ id: articleId });
    return articleId;
  }

  async updateArticle(
    articleId: string,
    articleData: UpdateArticleDto,
    image: Express.Multer.File,
  ) {
    let url = null;
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
    });

    const sameArticleUrl = await this.articleRepository.findOne({
      where: { publicUrl: articleData.publicUrl },
    });

    /* if (sameArticleUrl && sameArticleUrl.id !== article.id) {
      return { error: true, message: 'Article with this url already exists' };
    } */

    if (image) {
      url = await this.uploadFile(image);
    }
    return await this.articleRepository.save({
      ...article,
      ...articleData,
      imageUrl: url ? url : article.imageUrl,
    });
  }

  async getSingleArticleById(articleId: string) {
    const res = await this.articleRepository.findOne({
      where: { id: articleId },
    });
    return {
      ...res,
    };
  }

  async getSingleArticleByPublicUrl(publicUrl: string, userId: string) {
    const res = await this.articleRepository.findOne({
      where: { publicUrl },
    });
    const isArticleLikedByUser = await this.articleLikesRepository.findOne({
      where: {
        articleId: res.id,
        userId,
      },
    });
    if (userId) {
      await this.addArticleToUser(res.id, userId);
    }
    console.log('res', res);
    return {
      ...res,
      isLiked: !!isArticleLikedByUser,
    };
  }

  async updateArticleViewsCount(id: string) {
    const res = await this.articleRepository.findOne({
      where: { id },
    });
    return await this.articleRepository.save({
      ...res,
      viewsCount: res.viewsCount + 1,
    });
  }

  async addArticleToUser(articleId: string, userId: string) {
    const res = await this.articlesToUsersRepository.save({
      articleId,
      userId,
    });

    return res;
  }

  // async uploadFile(file) {
  //   const bucket = admin.storage().bucket();
  //   console.log('file', file);

  //   const filename = file.originalname;

  //   await bucket
  //     .file(filename)
  //     .save(file.buffer)
  //     .then(res => console.log(res));
  //   const bucketFile = bucket.file(filename);
  //   console.log('uploaded');

  //   const urls = await bucketFile.getSignedUrl({
  //     action: 'read',
  //     expires: '03-09-2491',
  //   });

  //   console.log(`${filename} uploaded.`);

  //   return urls[0];
  // }

  async uploadFile(file) {
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
