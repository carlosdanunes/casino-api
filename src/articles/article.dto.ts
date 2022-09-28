import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddArticleDto {
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
    type: 'string',
    description: 'title_de',
  })
  title_de: string;

  @ApiProperty({
    type: 'string',
    description: 'title_es',
  })
  title_es: string;

  @ApiProperty({
    type: 'string',
    description: 'title_fr',
  })
  title_fr: string;

  @ApiProperty({
    type: 'string',
    description: 'title_pt',
  })
  title_pt: string;

  @ApiProperty({
    type: 'string',
    description: 'title_tr',
  })
  title_tr: string;

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
    description: 'text_de',
  })
  text_de: string;

  @ApiProperty({
    type: 'text',
    description: 'text_es',
  })
  text_es: string;

  @ApiProperty({
    type: 'text',
    description: 'text_fr',
  })
  text_fr: string;

  @ApiProperty({
    type: 'text',
    description: 'text_pt',
  })
  text_pt: string;

  @ApiProperty({
    type: 'text',
    description: 'text_tr',
  })
  text_tr: string;

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
    type: 'text',
    description: 'subtitle_de',
  })
  subtitle_de: string;

  @ApiProperty({
    type: 'text',
    description: 'subtitle_es',
  })
  subtitle_es: string;

  @ApiProperty({
    type: 'text',
    description: 'subtitle_fr',
  })
  subtitle_fr: string;

  @ApiProperty({
    type: 'text',
    description: 'subtitle_pt',
  })
  subtitle_pt: string;

  @ApiProperty({
    type: 'text',
    description: 'subtitle_tr',
  })
  subtitle_tr: string;

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
    type: 'string',
    description: 'title_de',
  })
  title_de: string;

  @ApiProperty({
    type: 'string',
    description: 'title_es',
  })
  title_es: string;

  @ApiProperty({
    type: 'string',
    description: 'title_fr',
  })
  title_fr: string;

  @ApiProperty({
    type: 'string',
    description: 'title_pt',
  })
  title_pt: string;

  @ApiProperty({
    type: 'string',
    description: 'title_tr',
  })
  title_tr: string;

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
    description: 'text_de',
  })
  text_de: string;

  @ApiProperty({
    type: 'text',
    description: 'text_es',
  })
  text_es: string;

  @ApiProperty({
    type: 'text',
    description: 'text_fr',
  })
  text_fr: string;

  @ApiProperty({
    type: 'text',
    description: 'text_pt',
  })
  text_pt: string;

  @ApiProperty({
    type: 'text',
    description: 'text_tr',
  })
  text_tr: string;

  @ApiProperty({
    type: 'text',
    description: 'subtitle',
  })
  subtitle: string;

  @ApiProperty({
    type: 'text',
    description: 'subtitle_ru',
  })
  subtitle_ru: string;

  @ApiProperty({
    type: 'text',
    description: 'subtitle_ua',
  })
  subtitle_ua: string;

  @ApiProperty({
    type: 'text',
    description: 'subtitle_de',
  })
  subtitle_de: string;

  @ApiProperty({
    type: 'text',
    description: 'subtitle_es',
  })
  subtitle_es: string;

  @ApiProperty({
    type: 'text',
    description: 'subtitle_fr',
  })
  subtitle_fr: string;

  @ApiProperty({
    type: 'text',
    description: 'subtitle_pt',
  })
  subtitle_pt: string;

  @ApiProperty({
    type: 'text',
    description: 'subtitle_tr',
  })
  subtitle_tr: string;

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
