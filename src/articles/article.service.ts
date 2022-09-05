import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as admin from 'firebase-admin';
import { Repository } from 'typeorm';
import { UpdateArticleDto } from './article.dto';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async getArticles(cursor: number, take: number) {
    const res = await this.articleRepository.find({
      order: { created_at: 'DESC' },
      take: take,
      skip: cursor,
    });
    console.log(res);
    return res;
  }

  async getArticlesCount() {
    const res = await this.articleRepository.count();
    return res;
  }

  async addArticle(
    title,
    text,
    subtitle,
    categoryIds,
    image: Express.Multer.File,
  ) {
    const url = await this.uploadFile(image);
    const res = await this.articleRepository.save({
      title,
      text,
      subtitle,
      imageUrl: url,
      likesCount: 0,
      viewsCount: 0,
    });
    return res;
  }

  async deleteArticle(articleId: string) {
    this.articleRepository.delete({ id: articleId });
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
    console.log(res);
    console.log(articleId);
    return {
      ...res,
    };
  }

  async uploadFile(file) {
    const bucket = admin.storage().bucket();
    console.log('file', file);

    const filename = file.originalname;

    // Uploads a local file to the bucket
    await bucket
      .file(filename)
      .save(file.buffer)
      .then((res) => console.log(res));
    const bucketFile = bucket.file(filename);
    console.log('uploaded');

    const urls = await bucketFile.getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });

    console.log(`${filename} uploaded.`);

    return urls[0];
  }
}
