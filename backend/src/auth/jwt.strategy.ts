import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ให้ไปหา Token ใน Header ที่ชื่อ Authorization: Bearer ...
      ignoreExpiration: false, // ถ้า Token หมดอายุจะไม่ให้ผ่าน
      secretOrKey: 'SECRET_KEY_NAJA', // *สำคัญ* ต้องตรงกับที่ใส่ใน auth.module.ts
    });
  }

  // ถ้า Token ถูกต้อง ข้อมูลใน Token จะถูกส่งมาที่นี่
  async validate(payload: any) {
    // ส่งข้อมูล User กลับไปให้ Controller ใช้งาน (ผ่าน req.user)
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}