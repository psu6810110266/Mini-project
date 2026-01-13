import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';

// 🚩 กำหนดประเภท Role ให้เป็นระเบียบ
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // 🚩 ปรับปรุง: ใช้ Enum แทน string ปกติ เพื่อป้องกันการกรอกค่าผิด
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  // ความสัมพันธ์กับการจองทัวร์
  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  // ✨ ความสัมพันธ์กับรายการโปรดที่เพิ่มเข้ามาใหม่
  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];
}