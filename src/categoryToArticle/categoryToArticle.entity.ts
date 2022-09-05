import { Article } from 'src/articles/article.entity';
import { Category } from 'src/category/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('category_to_article')
export class CategoryToArticle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'articleId' })
  articleId: string;

  @Column({ name: 'categoryId' })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => Article, (article) => article.id)
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
