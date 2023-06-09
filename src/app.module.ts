/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ArticleModule } from './articles/article.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from 'src/category/category.module';
import { WssModule } from './wss/wss.module';
import { VaultModule } from './vault/vault.module';
import { typeormConfig } from 'src/orm.config';
import { UserBalanceModule } from './user-balance/user-balance.module';
import { ArticleLikesModule } from './articleLikes/articleLikes.module';
import { ArticlesToUsersModule } from 'src/articlesToUsers/articlesToUsers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    ArticleModule,
    ArticleLikesModule,
    CategoryModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => typeormConfig,
    }),
    ConfigModule.forRoot({ cache: true }),
    WssModule,
    VaultModule,
    UserBalanceModule,
    ArticlesToUsersModule,
  ],
})
export class AppModule {}
