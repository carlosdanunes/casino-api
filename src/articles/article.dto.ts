import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddArticleDto {
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'title',
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'title_ru',
  })
  title_ru: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'title_ua',
  })
  title_ua: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'text',
    description: 'text',
  })
  text: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'text',
    description: 'text_ru',
  })
  text_ru: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'text',
    description: 'text_ua',
  })
  text_ua: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'text',
    description: 'text',
  })
  subtitle: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'text',
    description: 'text_ru',
  })
  subtitle_ru: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'text',
    description: 'text_ua',
  })
  subtitle_ua: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'public url',
  })
  publicUrl: string;

  @ApiProperty({
    type: 'string',
    description: 'array of ids',
  })
  categoryId: string;
}

export class UpdateArticleDto {
  @ApiProperty({
    type: 'string',
    description: 'title',
  })
  title: string;

  @ApiProperty({
    type: 'string',
    description: 'title_ru',
  })
  title_ru: string;

  @ApiProperty({
    type: 'string',
    description: 'title_ua',
  })
  title_ua: string;

  @ApiProperty({
    type: 'text',
    description: 'text',
  })
  text: string;

  @ApiProperty({
    type: 'text',
    description: 'text_ru',
  })
  text_ru: string;

  @ApiProperty({
    type: 'text',
    description: 'text_ua',
  })
  text_ua: string;

  @ApiProperty({
    type: 'text',
    description: 'text',
  })
  subtitle: string;

  @ApiProperty({
    type: 'text',
    description: 'text_ru',
  })
  subtitle_ru: string;

  @ApiProperty({
    type: 'text',
    description: 'text_ua',
  })
  subtitle_ua: string;

  @ApiProperty({
    type: 'string',
    description: 'public url',
  })
  publicUrl: string;

  @ApiProperty({
    type: 'string',
    description: 'array of ids',
  })
  categoryId: string;
}
