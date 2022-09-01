import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddArticleDto {
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'title',
    required: true,
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'text',
    description: 'text',
    required: true,
  })
  text: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'text',
    description: 'text',
    required: true,
  })
  subtitle: string;
}

export class UpdateArticleDto {
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'label',
    required: false,
  })
  label: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'text',
    required: false,
  })
  text: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'image',
    required: false,
  })
  imageUrl: string;
}
