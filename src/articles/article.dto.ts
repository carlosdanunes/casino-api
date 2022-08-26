import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddArticleDto {
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'label',
    required: true,
  })
  label: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'text',
    required: true,
  })
  text: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'image',
    required: true,
  })
  imageUrl: string;
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
