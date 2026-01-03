import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; // 1. Import มา

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY_NAJA',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  // 2. ใส่ JwtStrategy เข้าไปใน providers
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}