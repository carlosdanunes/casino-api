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

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ArticleModule,
    CategoryModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ssl: {
          rejectUnauthorized: false,
        },
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        port: Number(process.env.TYPEORM_PORT),
        host: process.env.TYPEORM_HOST,
        database: process.env.TYPEORM_DATABASE,
        //@ts-ignore
        type: process.env.TYPEORM_TYPE,
        synchronize: true,
        entities: ['dist/**/*.entity.js'],
      }),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
