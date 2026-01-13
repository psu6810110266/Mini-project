import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity'; // ตรวจสอบชื่อ Entity ให้ถูกต้อง
import {CreateFavoriteDto} from './dto/create-favorite.dto'; // ตรวจสอบชื่อ DTO ให้ถูกต้อง

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>, // 🚩 1. ฉีด Repository เข้ามาเพื่อคุยกับ DB
  ) {}

  // 🚩 2. ฟังก์ชัน Toggle (เพิ่มถ้ายังไม่มี / ลบถ้ามีแล้ว)
  async toggleFavorite(userId: number, createFavoriteDto: CreateFavoriteDto) {
    const { tourId } = createFavoriteDto;

    // เช็คว่า User คนนี้เคยถูกใจทัวร์นี้ไปหรือยัง
    const existing = await this.favoriteRepository.findOne({
      where: { userId, tourId },
    });

    if (existing) {
      // ✅ ถ้ามีอยู่แล้วให้ลบออก (Toggle Off)
      await this.favoriteRepository.remove(existing);
      return { message: 'Removed', tourId };
    }

    // ✅ ถ้ายังไม่มีให้สร้างใหม่ (Toggle On)
    const newFavorite = this.favoriteRepository.create({
      userId,
      tourId,
    });
    
    // 🚩 บันทึกลงฐานข้อมูลจริงๆ
    return await this.favoriteRepository.save(newFavorite);
  }

  // 🚩 3. ดึงรายการโปรดทั้งหมดของ User (แก้ปัญหา Map Error)
  async findAll(userId: number) {
    // 🚩 ค้นหาเฉพาะรายการโปรดที่เป็นของ User คนที่ล็อกอินอยู่
    const favorites = await this.favoriteRepository.find({
      where: { userId },
    });

    // ✅ ส่งกลับเป็น Array ของ Object จริงๆ เพื่อให้หน้าบ้านใช้ .map() ได้
    return favorites; 
  }

  // 🚩 4. ลบรายการโปรดระบุตัวตน
  async remove(userId: number, tourId: number) {
    const result = await this.favoriteRepository.delete({ userId, tourId });
    if (result.affected === 0) {
      throw new NotFoundException('ไม่พบรายการโปรดที่ต้องการลบ');
    }
    return { success: true };
  }
}