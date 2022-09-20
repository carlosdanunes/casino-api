import { Article } from 'src/articles/article.entity';
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

  @Column({ type: 'varchar', length: 50 })
  name_ua: string;

  @Column({ type: 'varchar', length: 50 })
  name_ru: string;

  // @Column({ name: 'articleId' })
  // articleId: string;

  @OneToMany(() => Article, article => article.id)
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
