import { CategoryToArticle } from 'src/categoryToArticle/categoryToArticle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'articleId' })
  articleId: string;

  @OneToMany(() => CategoryToArticle, (category) => category.article)
  @JoinColumn({ name: 'articleId' })
  article: CategoryToArticle;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
