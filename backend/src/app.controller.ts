import { Controller, Get, Post, Body, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AppService } from './app.service';

// จำลองฐานข้อมูล (ข้อมูลจะหายเมื่อ Restart Server จนกว่าจะต่อ Database จริง)
const usersDatabase: any[] = [];

@Controller('api/user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Authentication: ระบบสมัครสมาชิก
  @Post()
  handleRegister(@Body() data: any) {
    const { username, password } = data;

    // 1. ตรวจสอบ User ซ้ำ
    const exists = usersDatabase.find(u => u.username === username);
    if (exists) throw new ConflictException('Username this already exists');

    // 2. Authorization: การสร้าง ADMIN ROLE
    // เงื่อนไข: ถ้าชื่อมีคำว่า 'admin' จะได้สิทธิ์ ADMIN ทันที
    const role = username.toLowerCase().includes('admin') ? 'ADMIN' : 'USER';
    
    const newUser = { username, password, role };
    usersDatabase.push(newUser);
    
    console.log('Registered New User:', newUser); // ดูข้อมูลที่นี่
    return { message: 'Registration successful', role };
  }

  // Authentication: ระบบ Login
  @Post('login')
  handleLogin(@Body() data: any) {
    const { username, password } = data;

    // ค้นหา User ที่ข้อมูลตรงกัน
    const user = usersDatabase.find(u => u.username === username && u.password === password);

    if (!user) {
      throw new UnauthorizedException('Username หรือ Password ไม่ถูกต้อง');
    }

    console.log('Login Success:', user.username, 'Role:', user.role);

    // ส่ง Role กลับไปให้ React เพื่อทำ Authorization (แบ่งสิทธิ์หน้าจอ)
    return {
      username: user.username,
      role: user.role, // ส่งค่า 'ADMIN' หรือ 'USER' กลับไป
      message: 'Login success'
    };
  }
}