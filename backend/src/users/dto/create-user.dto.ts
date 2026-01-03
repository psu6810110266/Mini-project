import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password ต้องยาวอย่างน้อย 6 ตัวอักษร' })
  password: string;

  // role ไม่ต้องรับจากหน้าบ้าน ให้ระบบ set เป็น USER อัตโนมัติ (หรือจะรับเฉพาะตอน Admin สร้างก็ได้)
}