import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 🚩 ตรวจสอบ Path ให้ถูกต้องตามโปรเจกต์คุณ

@UseGuards(JwtAuthGuard) // 🚩 ล็อกประตูทั้ง Controller: ต้องมี Token ถึงจะเข้าถึงข้อมูลรายการโปรดได้
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // 1. เพิ่มหรือลบรายการโปรด (Toggle)
  @Post()
  create(@Request() req, @Body() createFavoriteDto: CreateFavoriteDto) {
    // 🚩 req.user.userId มาจากการถอดรหัสบัตรผ่าน (Token) ใน JwtAuthGuard
    return this.favoritesService.toggleFavorite(req.user.userId, createFavoriteDto);
  }

  // 2. ดึงรายการโปรดทั้งหมด "เฉพาะของ User คนที่ล็อกอิน"
  @Get()
  findAll(@Request() req) {
    // 🚩 ส่ง userId ไปดึงข้อมูล เพื่อแก้ปัญหา "เข้าใหม่แล้วข้อมูลไม่ดึงมา"
    return this.favoritesService.findAll(req.user.userId);
  }

  // 3. ลบรายการโปรด (ระบุ tourId)
  @Delete(':tourId')
  remove(@Request() req, @Param('tourId') tourId: string) {
    // ใช้ userId ร่วมกับ tourId เพื่อความปลอดภัย (ลบได้เฉพาะของตัวเอง)
    return this.favoritesService.remove(req.user.userId, +tourId);
  }
}