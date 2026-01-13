import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Tour } from '../../tours/entities/tour.entity';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  // 🚩 เพิ่ม 2 บรรทัดนี้เพื่อให้ Service เรียกใช้งาน userId และ tourId เป็นตัวเลขได้
  @Column()
  userId: number;

  @Column()
  tourId: number;

  // เชื่อมกับ User (ใครเป็นคนกด Like)
  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'userId' }) // เชื่อมกับ Column userId ด้านบน
  user: User;

  // เชื่อมกับ Tour (กด Like ทัวร์ไหน)
  @ManyToOne(() => Tour, (tour) => tour.favorites)
  @JoinColumn({ name: 'tourId' }) // เชื่อมกับ Column tourId ด้านบน
  tour: Tour;
}