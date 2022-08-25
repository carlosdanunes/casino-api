import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateArticleDto } from './article.dto';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async getArticles() {
    const res = await this.articleRepository.find();
    console.log(res);
    return res;
  }

  async addArticle(label, text, imageUrl) {
    const res = await this.articleRepository.save({
      label,
      text,
      imageUrl,
    });
    return res;
  }

  async deleteArticle(articleId: string) {
    this.articleRepository.delete({ id: articleId });
    return articleId;
  }

  async updateArticle(articleId: string, articleData: UpdateArticleDto) {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
    });
    return await this.articleRepository.save({
      ...article,
      ...articleData,
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
}
