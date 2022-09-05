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

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'varchar', length: 1000 })
  subtitle: string;

  @Column({ type: 'varchar', length: 1000 })
  imageUrl: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'int' })
  likesCount: number;

  @Column({ type: 'int' })
  viewsCount: number;

  @Column({ name: 'categoryId' })
  categoryId: string;

  @OneToMany(() => CategoryToArticle, (category) => category.category)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryToArticle;
}
