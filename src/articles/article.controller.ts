import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddArticleDto, UpdateArticleDto } from './article.dto';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  async getArticles(@Body() body: { cursor: number; take: number }) {
    return await this.articleService.getArticles(body.cursor, body.take);
  }

  @Get('/count')
  async getArticlesCount() {
    return await this.articleService.getArticlesCount();
  }

  @Post('/add')
  async addArticle(@Body() addArticleDto: AddArticleDto) {
    return await this.articleService.addArticle(
      addArticleDto.label,
      addArticleDto.text,
      addArticleDto.imageUrl,
    );
  }

  @Delete(':id')
  async deleteArticle(@Param('id') articleId: string) {
    return await this.articleService.deleteArticle(articleId);
  }

  @Patch(':id')
  async updateArticle(
    @Param('id') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articleService.updateArticle(articleId, updateArticleDto);
  }

  @Get(':id')
  async getSingleArticleById(@Param('id') articleId: string) {
    return await this.articleService.getSingleArticleById(articleId);
  }
}
