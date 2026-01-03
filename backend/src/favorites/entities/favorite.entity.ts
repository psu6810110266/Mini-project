import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Tour } from '../../tours/entities/tour.entity';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  // เชื่อมกับ User (ใครเป็นคนกด Like)
  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // เชื่อมกับ Tour (กด Like ทัวร์ไหน)
  @ManyToOne(() => Tour, (tour) => tour.favorites)
  @JoinColumn({ name: 'tour_id' })
  tour: Tour;
}