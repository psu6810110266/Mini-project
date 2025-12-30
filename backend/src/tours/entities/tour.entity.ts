// src/tours/entities/tour.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 }) // รองรับทศนิยม 2 ตำแหน่ง
  price: number;

  @Column()
  max_seats: number;

  @Column({ default: 0 })
  current_seats: number;

  @Column({ default: true })
  is_active: boolean;

  @Column('jsonb', { nullable: true }) // เก็บกำหนดการแบบ JSON
  itinerary: any;

  @Column({ nullable: true })
  image_url: string;

  @Column({ type: 'timestamp', nullable: true })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}