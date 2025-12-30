// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToursModule } from './tours/tours.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // โหลดค่า Config
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',      // ต้องตรงกับ docker-compose.yml
      password: 'password123', // ต้องตรงกับ docker-compose.yml
      database: 'tour_booking',
      autoLoadEntities: true, // โหลด Entity อัตโนมัติ
      synchronize: true,      // true = แก้โค้ดแล้วแก้ DB ให้ (ใช้เฉพาะตอน Dev)
    }), ToursModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}