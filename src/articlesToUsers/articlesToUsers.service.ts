import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesToUsers } from 'src/articlesToUsers/articlesToUsers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesToUsersService {
  constructor(
    @InjectRepository(ArticlesToUsers)
    private articlesToUsersRepository: Repository<ArticlesToUsers>,
  ) {}

  async addArticleToUser(articleId: string, userId: string) {
    const res = await this.articlesToUsersRepository.save({
      articleId,
      userId,
    });

    return res;
  }
}
