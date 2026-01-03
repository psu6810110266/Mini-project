import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // 1. โหลดค่าจากไฟล์ .envป
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // 2. เชื่อมต่อ Database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true, // เปิดเฉพาะตอน Dev (มันจะแก้ตารางให้อัตโนมัติ)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
=======
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ToursModule } from './tours/tours.module';
import { BookingsModule } from './bookings/bookings.module';
import { User } from './users/entities/user.entity';
import { Tour } from './tours/entities/tour.entity';
import { Booking } from './bookings/entities/booking.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',      // ถ้า error ให้ลองเปลี่ยนเป็น '127.0.0.1'
      port: 5432,
      username: 'admin',      // ตาม docker-compose
      password: 'password123',// ตาม docker-compose
      database: 'tour_booking',
      entities: [User, Tour, Booking], // ระบุ Entity ให้ชัดเจน
      synchronize: true,      // Auto create tables
    }),
    UsersModule,
    ToursModule,
    BookingsModule,
  ],
>>>>>>> af0937d3d2ef7c3f0744ef064d5603a08fa24637
})
export class AppModule {}