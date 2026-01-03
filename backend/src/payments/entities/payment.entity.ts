import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

export enum PaymentStatus {
  PENDING = 'PENDING',     // รอตรวจสอบ
  APPROVED = 'APPROVED',   // อนุมัติแล้ว
  REJECTED = 'REJECTED',   // สลิปไม่ผ่าน
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number; // ยอดเงินที่โอน

  @Column({ nullable: true })
  slip_image_url: string; // เก็บ URL ของรูปสลิป

  @Column({ nullable: true })
  paid_at: Date; // วันที่โอน (User กรอกมา)

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @CreateDateColumn()
  created_at: Date; // วันที่ส่งเรื่องแจ้งโอน

  // เชื่อมกับ Booking แบบ 1 ต่อ 1
  @OneToOne(() => Booking)
  @JoinColumn({ name: 'booking_id' }) // สร้าง FK ชื่อ booking_id เก็บไว้ที่ตารางนี้
  booking: Booking;
}