import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 1. ตรวจสอบว่า Username/Password ถูกต้องไหม
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    
    // ถ้ามี User และรหัสผ่านตรงกัน (ใช้ bcrypt.compare)
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user; // ตัด field password ออกก่อนส่งคืน
      return result;
    }
    return null;
  }

  // 2. สร้าง Token (JWT)
  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload), // สร้าง String ยาวๆ ที่ระบุตัวตน
    };
  }
}