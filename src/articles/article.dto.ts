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
    type: 'text',
    description: 'text',
  })
  text: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'text',
    description: 'text',
  })
  subtitle: string;

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
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'title',
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'text',
    description: 'text',
  })
  text: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'text',
    description: 'text',
  })
  subtitle: string;

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
