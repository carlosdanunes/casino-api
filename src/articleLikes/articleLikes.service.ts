import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/articles/article.entity';
import { Repository } from 'typeorm';
import { ArticleLikes } from './articleLikes.entity';

@Injectable()
export class ArticleLikesService {
  constructor(
    @InjectRepository(ArticleLikes)
    private articleLikesRepository: Repository<ArticleLikes>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async addLike(articleId: string, userId: string) {
    const res = await this.articleLikesRepository.save({ articleId, userId });
    const article = await this.articleRepository.find({
      where: { id: articleId },
    });
    const likes = await this.articleLikesRepository.findAndCount({
      relations: [`article`],
      where: { articleId },
    });

    const updatedArticle = await this.articleRepository.save({
      ...article,
      likesCount: likes[1],
    });

    console.log(updatedArticle);

    return updatedArticle;
  }

  async deleteLike(articleId: string, userId: string) {
    const res = await this.articleLikesRepository.delete({ articleId, userId });
    return res;
  }
}
