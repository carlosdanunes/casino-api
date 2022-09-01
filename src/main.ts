import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });

  const options = new DocumentBuilder()
    .setTitle('Binobi')
    .setDescription('The Binobi API description')
    .setVersion('1.0')
    .addTag('Binobi')
    .build();
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, options);
  app.enableCors();
  SwaggerModule.setup('api', app, document);

  async function createBucket() {
    // Creates the new bucket
    const bucket = admin.storage().bucket();
    console.log(`Bucket ${bucket} created.`);
  }

  createBucket().catch(console.error);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
