import { ApiProperty } from '@nestjs/swagger';

export class AddArticleDto {
  @ApiProperty({
    type: 'string',
    description: 'title',
  })
  title: string;

  @ApiProperty({
    type: 'text',
    description: 'text',
  })
  text: string;

  @ApiProperty({
    type: 'text',
    description: 'text',
  })
  subtitle: string;

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
    type: 'text',
    description: 'text',
  })
  text: string;

  @ApiProperty({
    type: 'text',
    description: 'text',
  })
  subtitle: string;

  @ApiProperty({
    type: 'string',
    description: 'array of ids',
  })
  categoryId: string;
}
