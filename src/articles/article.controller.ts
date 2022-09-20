import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { AddArticleDto, UpdateArticleDto } from './article.dto';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiTags('Article')
  @Public()
  @ApiOperation({ summary: 'Get articles' })
  @Public()
  @Post()
  async getArticles(
    @Body() body: { cursor: number; take: number; category?: string },
  ) {
    return await this.articleService.getArticles(
      body.cursor,
      body.take,
      body.category,
    );
  }

  @ApiTags('Article')
  @Public()
  @ApiOperation({ summary: 'Get articles count' })
  @Public()
  @Get('/count/:category')
  async getArticlesCount(@Param('id') categoryId: string) {
    return await this.articleService.getArticlesCount(categoryId);
  }

  @ApiTags('Article')
  @ApiOperation({ summary: 'Add article' })
  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async addArticle(
    @UploadedFile() image: Express.Multer.File,
    @Body() addArticleDto: AddArticleDto,
  ) {
    return await this.articleService.addArticle(
      addArticleDto.title,
      addArticleDto.title_ru,
      addArticleDto.title_ua,
      addArticleDto.text,
      addArticleDto.text_ru,
      addArticleDto.text_ua,
      addArticleDto.subtitle,
      addArticleDto.subtitle_ru,
      addArticleDto.subtitle_ua,
      addArticleDto.categoryId,
      addArticleDto.publicUrl,
      image,
    );
  }

  @ApiTags('Article')
  @ApiOperation({ summary: 'Delete article by id' })
  @Delete(':id')
  async deleteArticle(@Param('id') articleId: string) {
    return await this.articleService.deleteArticle(articleId);
  }

  @ApiTags('Article')
  @ApiOperation({ summary: 'Update article by id' })
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async updateArticle(
    @Param('id') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return await this.articleService.updateArticle(
      articleId,
      updateArticleDto,
      image,
    );
  }

  @ApiTags('Article')
  @ApiOperation({ summary: 'Get single article by id' })
  @Public()
  @Get(':id')
  async getSingleArticleById(@Param('id') articleId: string) {
    return await this.articleService.getSingleArticleById(articleId);
  }

  @ApiTags('Article')
  @ApiOperation({ summary: 'Get single article by publicUrl' })
  @Public()
  @Get('/url/:publicUrl')
  async getSingleArticleByPublicUrl(@Param('publicUrl') publicUrl: string) {
    return await this.articleService.getSingleArticleByPublicUrl(publicUrl);
  }

  @ApiTags('Article')
  @ApiOperation({ summary: `Update article views count` })
  @Public()
  @Patch(`/views/:id`)
  async updateArticleViewsCount(@Param(`id`) articleId: string) {
    return await this.articleService.updateArticleViewsCount(articleId);
  }
}
