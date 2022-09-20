import { Controller, Body, Post, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleLikesService } from './articleLikes.service';

@Controller(`article-likes`)
export class ArticleLikesController {
  constructor(private readonly articleLikesService: ArticleLikesService) {}

  @ApiTags('ArticleLikes')
  @ApiOperation({ summary: `Like article` })
  @Post('/')
  async addLike(@Body() body: { articleId: string; userId: string }) {
    return await this.articleLikesService.addLike(body.articleId, body.userId);
  }

  @ApiTags('ArticleLikes')
  @ApiOperation({ summary: `Delete like` })
  @Delete(`/`)
  async deleteLike(@Body() body: { articleId: string; userId: string }) {
    return await this.articleLikesService.deleteLike(
      body.articleId,
      body.userId,
    );
  }
}
