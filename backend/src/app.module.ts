import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import Modules
import { UsersModule } from './users/users.module';
import { ToursModule } from './tours/tours.module';
import { BookingsModule } from './bookings/bookings.module';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module'; // ✨ 1. Import Module เข้ามา

// Import Entities
import { User } from './users/entities/user.entity';
import { Tour } from './tours/entities/tour.entity';
import { Booking } from './bookings/entities/booking.entity';
import { Favorite } from './favorites/entities/favorite.entity'; // ✨ 2. Import Entity เข้ามา

@Module({
  imports: [
    // โหลดค่า Config (.env)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // เชื่อมต่อ Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'), 
        
        // ✨ 3. อย่าลืมใส่ Favorite ลงในนี้ด้วย!
        entities: [User, Tour, Booking, Favorite], 
        
        synchronize: true, 
      }),
      inject: [ConfigService],
    }),

    // Modules ย่อย
    UsersModule,
    ToursModule,
    BookingsModule,
    AuthModule,
    FavoritesModule, // ✨ 4. ใส่ Module ลงในถังรวม
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}