import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. ต้อง import อันนี้
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity'; // 2. และ import Entity User

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // 3. สำคัญมาก! ต้องใส่บรรทัดนี้ เพื่อบอกว่า Module นี้ใช้ตาราง User
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export ไว้เผื่อ AuthModule ต้องใช้ (ทำเผื่อไว้เลยครับ)
})
export class UsersModule {}