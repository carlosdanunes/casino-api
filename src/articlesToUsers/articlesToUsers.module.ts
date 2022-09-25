import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesToUsersController } from 'src/articlesToUsers/articlesToUsers.controller';
import { ArticlesToUsers } from 'src/articlesToUsers/articlesToUsers.entity';
import { ArticlesToUsersService } from 'src/articlesToUsers/articlesToUsers.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticlesToUsers])],
  exports: [ArticlesToUsersService],
  controllers: [ArticlesToUsersController],
  providers: [ArticlesToUsersService],
})
export class ArticlesToUsersModule {}
