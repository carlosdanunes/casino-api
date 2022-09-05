import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getCategories() {
    const res = await this.categoryRepository.find();
    return res;
  }

  async addCategory(name) {
    const res = await this.categoryRepository.save({
      name,
    });
    return res;
  }

  async deleteCategory(categoryId: string) {
    this.categoryRepository.delete({ id: categoryId });
    return categoryId;
  }
}
