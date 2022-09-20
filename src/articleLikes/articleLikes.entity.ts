import { Article } from 'src/articles/article.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity(`article_likes`)
export class ArticleLikes {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @ManyToOne(() => Article, article => article.id)
  @JoinColumn({ name: `articleId` })
  article: Article;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: `userId` })
  user: User;

  @Column({ name: `userId` })
  userId: string;

  @Column({ name: `articleId` })
  articleId: string;
}
