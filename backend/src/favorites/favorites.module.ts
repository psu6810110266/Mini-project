import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 🚩 เพิ่มบรรทัดนี้
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorite } from './entities/favorite.entity'; // 🚩 เพิ่มบรรทัดนี้

@Module({
  imports: [
    // 🚩 ลงทะเบียน Favorite Entity เพื่อให้ NestJS สร้าง Repository ให้ Service ใช้งานได้
    TypeOrmModule.forFeature([Favorite]), 
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService], // ส่งออกเผื่อกรณี Module อื่นต้องการเรียกใช้
})
export class FavoritesModule {}