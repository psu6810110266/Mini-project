import { IsNumber, IsNotEmpty } from 'class-validator';

export  class CreateFavoriteDto {
  @IsNumber()
  @IsNotEmpty()
  tourId: number; // 🚩 ประกาศตัวแปร tourId ให้ DTO รู้จัก
}