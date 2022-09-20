import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/articles/article.entity';
import { ArticleLikesController } from './articleLikes.controller';
import { ArticleLikes } from './articleLikes.entity';
import { ArticleLikesService } from './articleLikes.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleLikes, Article])],
  exports: [ArticleLikesService],
  controllers: [ArticleLikesController],
  providers: [ArticleLikesService],
})
export class ArticleLikesModule {}
