import { Category } from 'src/category/category.entity';
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

  @Column({ type: 'varchar', length: 50, nullable: true })
  title_ua?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title_ru?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title_de?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title_es?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title_fr?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title_pt?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title_tr?: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'text', nullable: true })
  text_ua?: string;

  @Column({ type: 'text', nullable: true })
  text_ru?: string;

  @Column({ type: 'text', nullable: true })
  text_de?: string;

  @Column({ type: 'text', nullable: true })
  text_es?: string;

  @Column({ type: 'text', nullable: true })
  text_fr?: string;

  @Column({ type: 'text', nullable: true })
  text_pt?: string;

  @Column({ type: 'text', nullable: true })
  text_tr?: string;

  @Column({ type: 'varchar', length: 1000 })
  subtitle: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  subtitle_ua?: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  subtitle_ru?: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  subtitle_de?: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  subtitle_es?: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  subtitle_fr?: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  subtitle_pt?: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  subtitle_tr?: string;

  @Column({ type: 'varchar', length: 1000 })
  imageUrl: string;

  @Column({ type: 'varchar', length: 1000 })
  publicUrl: string;

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

  @OneToMany(() => Category, category => category.id)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
