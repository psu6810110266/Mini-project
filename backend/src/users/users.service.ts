import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'; // พระเอกของเรา

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    // 1. เช็คว่า Username ซ้ำไหม?
    const existingUser = await this.usersRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('Username นี้ถูกใช้งานแล้ว');
    }

    // 2. Hash Password (ความปลอดภัยตามโจทย์)
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. สร้าง User Object
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      // role จะเป็น USER โดย Default ตามที่เราตั้งใน Entity
    });

    // 4. บันทึกลง Database
    return this.usersRepository.save(user);
  }

  // ฟังก์ชันหา User (จะใช้ตอน Login ทีหลัง)
  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  findAll() {
    return this.usersRepository.find();
  }
}