/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();
const standardConfig = {
  username: configService.get('TYPEORM_USERNAME'),
  password: configService.get('TYPEORM_PASSWORD') as string,
  port: configService.get('TYPEORM_PORT'),
  host: configService.get('TYPEORM_HOST'),
  database: configService.get('TYPEORM_DATABASE'),
  type: configService.get('TYPEORM_TYPE'),
  entities: ['dist/**/*.entity.js'],
};
export const typeormConfig = configService.get('DEV_MODE_MELLON')
  ? {
      ...standardConfig,
      synchronize: true,
      autoLoadEntities: true,
    }
  : {
      ...standardConfig,
      synchronize: true,
      autoLoadEntities: true,
    };

export default new DataSource(typeormConfig);
