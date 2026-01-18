import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard) // 🛡️ ล็อกประตูทั้ง Controller (คนนอกห้ามเข้า)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // 1. สร้างการจอง
  @Post()
  async create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    // ดึง userId จาก Token ส่งไปบันทึก
    return this.bookingsService.create(createBookingDto, req.user.userId);
  }

  // 2. ดูประวัติการจอง (ของตัวเองเท่านั้น)
  @Get()
  async findAll(@Request() req) {
    // ดึง userId จาก Token ไปค้นหา
    return this.bookingsService.findAll(req.user.userId);
  }

  // ⭐ 3. ยกเลิกการจอง (เพิ่มส่วนนี้เข้าไป)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    // ส่งทั้ง userId (เพื่อยืนยันตัวตน) และ id (รายการที่จะลบ) ไปให้ Service
    return this.bookingsService.cancelBooking(req.user.userId, +id);
  }
}