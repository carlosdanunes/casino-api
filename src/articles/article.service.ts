import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as admin from 'firebase-admin';
import { Category } from 'src/category/category.entity';
import { CategoryToArticle } from 'src/categoryToArticle/categoryToArticle.entity';
import { Repository } from 'typeorm';
import { UpdateArticleDto } from './article.dto';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(CategoryToArticle)
    private categoriesToArticleRepository: Repository<CategoryToArticle>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getArticles(cursor: number, take: number, category?: string) {
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
      res.map(async (article) => {
        const categoryToArticle =
          await this.categoriesToArticleRepository.findOne({
            where: { categoryId: article.categoryId },
          });
        if (categoryToArticle) {
          console.log('categoryId', categoryToArticle);
          const category = await this.categoriesRepository.findOne({
            where: { id: categoryToArticle.categoryId },
          });
          return {
            ...article,
            categoryId: category.id,
            categoryName: category.name,
          };
        }
        return article;
      }),
    );
    return categoriesIds;
  }

  async getArticlesCount() {
    const res = await this.articleRepository.count();
    return res;
  }

  async addArticle(
    title,
    text,
    subtitle,
    categoryId,
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
      categoryId: categoryId,
    });
    await this.categoriesToArticleRepository.save({
      category: categoryId,
      categoryId: categoryId,
      article: res,
      articleId: res.id,
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
    if (articleData.categoryId) {
      await this.categoriesToArticleRepository.save({
        categoryId: articleData.categoryId,
        article: article,
        articleId: articleId,
      });
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
