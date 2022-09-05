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
  @Post()
  async getArticles(@Body() body: { cursor: number; take: number }) {
    return await this.articleService.getArticles(body.cursor, body.take);
  }

  @ApiTags('Article')
  @Public()
  @ApiOperation({ summary: 'Get articles count' })
  @Get('/count')
  async getArticlesCount() {
    return await this.articleService.getArticlesCount();
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
      addArticleDto.text,
      addArticleDto.subtitle,
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
  @Get(':id')
  async getSingleArticleById(@Param('id') articleId: string) {
    return await this.articleService.getSingleArticleById(articleId);
  }
}
