import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiTags('Category')
  @ApiOperation({ summary: 'Get category' })
  @Public()
  @Get()
  async getArticles() {
    return await this.categoryService.getCategories();
  }

  @ApiTags('Category')
  @ApiOperation({ summary: 'Add category' })
  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async addCategory(@Body() body: { name: string }) {
    return await this.categoryService.addCategory(body.name);
  }

  @ApiTags('Category')
  @ApiOperation({ summary: 'Delete category by id' })
  @Delete(':id')
  async deleteCategory(@Param('id') categoryId: string) {
    return await this.categoryService.deleteCategory(categoryId);
  }
}
