import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 🚩 ต้องมี Guard เพื่อตรวจเช็ค Token

@Controller('bookings')
@UseGuards(JwtAuthGuard) // 🛡️ ป้องกันไม่ให้คนไม่ล็อกอินเข้ามาจอง
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    // 🚩 ดึง userId ออกมาจาก req.user (ที่ได้จาก Token) แล้วส่งไปให้ Service
    const userId = req.user.userId; 
    return this.bookingsService.create(createBookingDto, userId);
  }

  @Get()
  async findAll(@Request() req) {
    // 🚩 ดึง userId ออกมาจาก req.user เพื่อดูว่า user คนนี้จองอะไรไว้บ้าง
    const userId = req.user.userId;
    return this.bookingsService.findAll(userId);
  }
}