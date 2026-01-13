import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // ✅ แก้: ยอมให้ว่างได้
  @Column('text', { nullable: true })
  description: string;

  // ✅ แก้: ยอมให้ว่างได้ (ตัวต้นเหตุ Error 500)
  @Column({ nullable: true })
  location: string;

  // ✅ แก้: ยอมให้ว่างได้ (เผื่อหน้าบ้านไม่ได้คำนวณส่งมา)
  @Column({ nullable: true })
  duration: string;

  @Column({ default: 1 })
  days: number;

  @Column({ default: 0 })
  nights: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  // ✅ แก้: ยอมให้ว่างได้
  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Booking, (booking) => booking.tour)
  bookings: Booking[];

  @OneToMany(() => Favorite, (favorite) => favorite.tour)
  favorites: Favorite[];
}