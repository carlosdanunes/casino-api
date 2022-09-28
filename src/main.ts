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
      privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCft7G4/vMA3DjC\nMS38bR5E3O63Hb2wQyx+nJlP1HXFfJGvS2zD/8M+GFGeN3DQDsqz9RdMrhUSTfgb\n5GG2v/23/r6SFlhHnLHA2Hr1rFqvMx6kl97iqfTFOpEn2mCtYhse70FYkVBID+gC\nfqYzHnck0N+Ehhs5XETO3go7TR+IvgXG8XQC2JoGPDE8cO4nr2gxmYDFfdEEnOk9\nazPm+cLrfDZW98psCVLoufiLF2SyqO323HQHTRYJPuZaG4tVmrIw3h83RE+8OUaL\nnxU70ikRIVUGo0+Vd9IzpCCTnY/6yZ2P8gSYzecV7PIFQdYxCfgd2Sf6NC+5d1FW\n8GwdQFjLAgMBAAECggEAMbGu+1df9mmOw2UX4M12uIhhQdpgFcKgyngg/4SkbCDZ\nF0iJe+ZNMjnQ00B+uk2P5jQg3rvfVIWr58nEWV8dKy14z+1h5E4txEnW4C+TO6XV\nJ/MU50NoJCGX3mWE5Q18UMCyfUMhTnqcfoI3ZfpZqbvPf+VV/R/nTNIrLs5NPHcd\nMmfV19dbQARZ1zuWoOBT18ZtUfdGTmF9PrL8JmCLyukf3JlJebnZGrsR0n/Xt3GB\nI1bUxVUereDiLPNMGiNrjDiBk1Nm+HzG/L8Kho7Vl+SkQefwF6dr6cljVvtmLycX\nZ1Ru2MC2QuAlC4Upo938X0DNrEqgMdnLYCqQeeaM4QKBgQDXX4hAk3+UvAWKHjSm\njLDhumYP5J/GPddusXjdBsoogYJHb4wFxE+Ci43BgoRXnstMPTR+QQ0RZYzqYIXc\nN6ALOemsrkbhOlF7cH27G9Y+eLWkjcuo4LZoyYOKbDG5SQJYsR366dc4BMFN6E1n\nqRvT2TkIfoF9lw8oebHD1jciWwKBgQC92IbwhfGFDY4L/8w+nEzrYLzJXtuArj4L\neWAktzln+gDUGn21LNzku5Sv45r+0xgQ32h1LQ+LebSrlxaX9gYhihGJ85QVKHUW\nxz2Im2DXMIDuBSmINCCrLDeMF9glDZYfnaJuu5YjncBWl8k3iqjGVPTuETgU+G/n\nJ3fSnkCOUQKBgCu+ZI8xJiWQdtORxQHa64Y9dMNfnTAHmX0LINBLs728aDiYKGl3\ncOrD63vVRYoCX6pReBr4nW3eIVvtVOLgjWoaTiLbltviG3Cl7XOWeNJhdAtDHY1k\nbsgjvcrcpNDMSmS3PK6c1jCzjouDVk1qpJNHuHTINQbMKrD+3qM3HCWnAoGAdiFh\n9hCitLQ2i2jkYqFHi79qObN4yp2hpeok1TPd2MFL+q9xQWdlHD9MyhXKwH4CH52k\nliUv4w4cShl9yZkhP4V2XGzg3DmMglwAAh0NKVnZIEK+ES6+lUSyW84KhSPrIkko\nZdb8GbVzlW5lmtYBJ0h+EBVO3F2q5B8/BCPM78ECgYBMAmyAGEC7bSnurqOkiQTQ\nAT7XeDtmengaL4Uz6PAifkNSVZ9GHaVTHSZT0L2A4IQ0g9pUmARhEjsi3O9I1L0A\nZboxDqvTPvUMuSM9Qec17fyoc3JA6WKaCghadojIw/MvXyVmJufU2H3rt9c5yApT\nrKcurWIMHhEVI7lbC6+PYg==\n-----END PRIVATE KEY-----\n',
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

  // async function createBucket() {
  //   // Creates the new bucket
  //   const bucket = admin.storage().bucket();
  //   console.log(`Bucket ${bucket} created.`);
  // }

  // createBucket().catch(console.error);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
