import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() req) {
    // 1. เช็ค User ก่อน
    const user = await this.authService.validateUser(req.username, req.password);
    
    if (!user) {
      throw new UnauthorizedException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }

    // 2. ถ้าผ่าน ให้สร้าง Token
    return this.authService.login(user);
  }
}