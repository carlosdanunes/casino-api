/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './articles/article.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from 'src/category/category.module';
import { typeormConfig } from 'src/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    ArticleModule,
    CategoryModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => typeormConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
