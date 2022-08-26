import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  label: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  text: string;

  @Column({ type: 'varchar', length: 1000 })
  imageUrl: string;
}
