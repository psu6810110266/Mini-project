import { Module } from '@nestjs/common';
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
})
export class AppModule {}