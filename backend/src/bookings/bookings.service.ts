import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'; // 🚩 เพิ่ม NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  // 🚩 1. สร้างการจอง (มีระบบกันจองซ้ำ)
  async create(createBookingDto: CreateBookingDto, userId: number) {
    // เช็คก่อนว่าเคยจองทัวร์นี้ในวันนี้ไปหรือยัง
    const existingBooking = await this.bookingRepository.findOne({
      where: {
        user: { id: userId },
        tour: { id: createBookingDto.tourId },
        startDate: createBookingDto.startDate, // กันจองซ้ำเฉพาะวันเดินทางเดียวกัน
      },
    });

    // ถ้าเจอข้อมูลเดิม ให้ดีดออกทันที
    if (existingBooking) {
      throw new ConflictException('คุณได้ทำการจองทัวร์นี้ในวันที่เลือกไว้แล้วครับ 🚫');
    }

    // ถ้าไม่ซ้ำ ก็สร้างข้อมูลใหม่ลง Database
    const newBooking = this.bookingRepository.create({
      ...createBookingDto,
      user: { id: userId },
      tour: { id: createBookingDto.tourId },
    });

    return await this.bookingRepository.save(newBooking);
  }

  // 🚩 2. ดึงข้อมูลการจองทั้งหมดของ User นั้นๆ
  async findAll(userId: number) {
    return await this.bookingRepository.find({
      where: { user: { id: userId } },
      relations: ['tour'], // ดึงข้อมูลทัวร์มาด้วย
      order: { id: 'DESC' }, // ใหม่สุดขึ้นก่อน
    });
  }

  // 🚩 3. ฟังก์ชันดูรายละเอียด (ใช้ภายใน หรือเผื่อ Admin)
  findOne(id: number) {
    return this.bookingRepository.findOne({ 
      where: { id }, 
      relations: ['tour', 'user'] 
    });
  }

  // ⭐ 4. ฟังก์ชันยกเลิกการจอง (ตัวใหม่ที่เพิ่มเข้ามา)
  async cancelBooking(userId: number, bookingId: number) {
    // สั่งลบโดยเช็ค 2 เงื่อนไข: ต้องตรงทั้ง bookingId และ userId (เจ้าของ)
    const result = await this.bookingRepository.delete({ 
      id: bookingId, 
      user: { id: userId } 
    });

    // ถ้าลบไม่ได้ (ไม่เจอ ID หรือไม่ใช่เจ้าของ) ให้แจ้ง Error
    if (result.affected === 0) {
      throw new NotFoundException('ไม่พบรายการจอง หรือคุณไม่มีสิทธิ์ยกเลิกรายการนี้');
    }

    return { message: 'Booking cancelled successfully' };
  }
}