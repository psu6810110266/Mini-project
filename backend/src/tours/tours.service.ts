// src/tours/tours.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Tour } from './entities/tour.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private tourRepository: Repository<Tour>,
  ) {}

  // ฟังก์ชันเพิ่มทัวร์
  create(createTourDto: CreateTourDto) {
    const tour = this.tourRepository.create(createTourDto);
    return this.tourRepository.save(tour);
  }

  // ฟังก์ชันดึงทัวร์ทั้งหมด
  findAll() {
    return this.tourRepository.find();
  }

  // ฟังก์ชันดึงทัวร์ตาม ID (เผื่อเพื่อนทำหน้ารายละเอียด)
  findOne(id: number) {
    return this.tourRepository.findOneBy({ id });
  }

  update(id: number, updateTourDto: UpdateTourDto) {
    return this.tourRepository.update(id, updateTourDto);
  }

  remove(id: number) {
    return this.tourRepository.delete(id);
  }
}