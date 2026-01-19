import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
// 🚩 นำเข้า Entity ที่มีอยู่แล้วในโปรเจกต์ (เช็ค Path ให้ตรงกับเครื่องคุณนะ)
import { Booking } from '../bookings/entities/booking.entity';
import { Tour } from '../tours/entities/tour.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    // ลงทะเบียน Entity เพื่อให้ Service เรียกใช้ Repository ได้
    TypeOrmModule.forFeature([Booking, Tour, User]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}