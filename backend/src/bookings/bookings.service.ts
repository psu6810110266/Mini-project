import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //
import { Repository } from 'typeorm'; //
import { Booking } from './entities/booking.entity'; //
import { CreateBookingDto } from './dto/create-booking.dto'; //
import { UpdateBookingDto } from './dto/update-booking.dto'; //

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>, //
  ) {}

  // 🚩 รวมร่าง: ระบบบันทึกข้อมูล + ระบบกันจองซ้ำ
  async create(createBookingDto: CreateBookingDto, userId: number) {
    // 1. เช็คก่อนว่าเคยจองทัวร์นี้ในวันนี้ไปหรือยัง
    const existingBooking = await this.bookingRepository.findOne({
      where: {
        user: { id: userId },
        tour: { id: createBookingDto.tourId },
        startDate: createBookingDto.startDate, // กันจองซ้ำเฉพาะวันเดินทางเดียวกัน
      },
    });

    // 2. ถ้าเจอข้อมูลเดิม ให้ดีดออกทันที
    if (existingBooking) {
      throw new ConflictException('คุณได้ทำการจองทัวร์นี้ในวันที่เลือกไว้แล้วครับ 🚫');
    }

    // 3. ถ้าไม่ซ้ำ ก็สร้างข้อมูลใหม่ลง Database
    const newBooking = this.bookingRepository.create({
      ...createBookingDto, //
      user: { id: userId }, //
      tour: { id: createBookingDto.tourId }, //
    });

    return await this.bookingRepository.save(newBooking); //
  }

  // ดึงข้อมูลการจองทั้งหมดของ User นั้นๆ
  async findAll(userId: number) {
    return await this.bookingRepository.find({
      where: { user: { id: userId } }, //
      relations: ['tour'], // ดึงข้อมูลทัวร์มาด้วย
      order: { id: 'DESC' }, // ใหม่สุดขึ้นก่อน
    });
  }

  // ฟังก์ชันพื้นฐานอื่นๆ
  findOne(id: number) {
    return this.bookingRepository.findOne({ 
      where: { id }, 
      relations: ['tour', 'user'] 
    });
  }

  async remove(id: number) {
    const booking = await this.findOne(id);
    if (booking) {
      return await this.bookingRepository.remove(booking);
    }
  }
}