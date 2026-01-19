import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../bookings/entities/booking.entity';
import { Tour } from '../tours/entities/tour.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
    @InjectRepository(Tour) private tourRepo: Repository<Tour>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getSummary() {
    // 1. นับจำนวนทั้งหมด (Counts)
    const totalTours = await this.tourRepo.count();
    const totalUsers = await this.userRepo.count();
    const totalBookings = await this.bookingRepo.count();

    // 2. คำนวณรายได้รวม (Sum Total Price)
    // ใช้ QueryBuilder ช่วยบวกเลขคอลัมน์ totalPrice
    const revenueResult = await this.bookingRepo
      .createQueryBuilder('booking')
      .select('SUM(booking.totalPrice)', 'sum')
      .getRawOne();
    
    // แปลงผลลัพธ์เป็นตัวเลข (ถ้าไม่มีจองเลยให้เป็น 0)
    const totalRevenue = revenueResult.sum ? parseInt(revenueResult.sum) : 0;

    // 3. หาทัวร์ยอดฮิต 5 อันดับแรก (Top 5 Popular Tours)
    const popularTours = await this.bookingRepo
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.tour', 'tour')
      .select('tour.title', 'name')        // เลือกชื่อทัวร์
      .addSelect('COUNT(booking.id)', 'count') // นับจำนวนการจอง
      .groupBy('tour.title')               // จัดกลุ่มตามชื่อ
      .orderBy('count', 'DESC')            // เรียงจากมากไปน้อย
      .limit(5)                            // เอาแค่ 5 อันดับ
      .getRawMany();

    // ส่งข้อมูลกลับไปเป็นก้อนเดียว
    return {
      totalTours,
      totalUsers,
      totalBookings,
      totalRevenue,
      popularTours, 
    };
  }
}