import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class userEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
