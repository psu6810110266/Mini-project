import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common'; // Import UseGuards, Request เพิ่ม
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard เพิ่ม
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // --- เพิ่มบรรทัดนี้เพื่อล็อคประตู ---
  @UseGuards(AuthGuard('jwt')) 
  @Get()
  findAll(@Request() req) { // ใส่ @Request() req เพื่อดูว่าใครเป็นคนเรียก
    console.log('User ที่เรียก API นี้คือ:', req.user); // ลอง log ดูเล่นๆ
    return this.usersService.findAll();
  }
}