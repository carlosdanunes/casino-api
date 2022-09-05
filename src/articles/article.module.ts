import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { CategoryToArticle } from 'src/categoryToArticle/categoryToArticle.entity';
import { ArticleController } from './article.controller';
import { Article } from './article.entity';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article, CategoryToArticle, Category])],
  exports: [ArticleService],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
