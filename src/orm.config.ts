/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

//@ts-ignore
export const typeormConfig = {
  ssl: {
    rejectUnauthorized: false,
  },
  username: configService.get('TYPEORM_USERNAME'),
  password: configService.get('TYPEORM_PASSWORD') as string,
  port: configService.get('TYPEORM_PORT'),
  host: configService.get('TYPEORM_HOST'),
  database: configService.get('TYPEORM_DATABASE'),
  //@ts-ignore
  type: configService.get('TYPEORM_TYPE'),
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
};

export default new DataSource(typeormConfig);
