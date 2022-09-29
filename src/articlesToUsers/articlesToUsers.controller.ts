import { Controller, Body, Post, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticlesToUsersService } from 'src/articlesToUsers/articlesToUsers.service';
// import { ArticleLikesService } from './articleLikes.service';

@Controller(`articles-to-users`)
export class ArticlesToUsersController {
  constructor(
    private readonly articlesToUsersService: ArticlesToUsersService,
  ) {}

  @ApiTags('Article To Users')
  @ApiOperation({ summary: `Add article to user` })
  @Post('/')
  async addArticleToUser(@Body() body: { articleId: string; userId: string }) {
    return await this.articlesToUsersService.addArticleToUser(
      body.articleId,
      body.userId,
    );
  }
}
