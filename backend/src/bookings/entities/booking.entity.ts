import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn,Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Tour } from '../../tours/entities/tour.entity';

@Entity()
@Unique(['user', 'tour', 'startDate']) // 🚩 ห้าม User คนเดิม จองทัวร์เดิม ในวันเริ่มเดินทางวันเดิมซ้ำ
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column()
  bookedSeats: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ default: 'pending' }) // pending, confirmed, cancelled
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  // เชื่อมกับ User (Many-to-One)
  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
  user: User;

  // เชื่อมกับ Tour (Many-to-One)
  @ManyToOne(() => Tour, (tour) => tour.bookings, { onDelete: 'CASCADE' })
  tour: Tour;
}