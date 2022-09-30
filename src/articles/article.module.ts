import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleLikes } from 'src/articleLikes/articleLikes.entity';
import { ArticlesToUsers } from 'src/articlesToUsers/articlesToUsers.entity';
import { Category } from 'src/category/category.entity';
import { ArticleController } from './article.controller';
import { Article } from './article.entity';
import { ArticleService } from './article.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Article,
      Category,
      ArticlesToUsers,
      ArticleLikes,
    ]),
  ],
  exports: [ArticleService],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
