import { Module } from '@nestjs/common';
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
})
export class AppModule {}