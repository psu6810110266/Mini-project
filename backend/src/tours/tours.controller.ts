import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 🛡️ ตรวจ Token
import { RolesGuard } from '../auth/roles.guard';     // 🛡️ ตรวจ Role
import { UserRole } from '../users/entities/user.entity'; // 🚩 นำเข้า Enum Role

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  // 🚩 เฉพาะ Admin เท่านั้นที่เพิ่มทัวร์ได้
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN]) 
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }

  // ✅ ทุกคน (รวมถึงคนไม่ล็อกอิน) ดูทัวร์ทั้งหมดได้
  @Get()
  findAll() {
    return this.toursService.findAll();
  }

  // ✅ ทุกคนดูรายละเอียดทัวร์รายอันได้
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toursService.findOne(+id);
  }

  // 🚩 เฉพาะ Admin เท่านั้นที่แก้ไขทัวร์ได้
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(+id, updateTourDto);
  }

  // 🚩 เฉพาะ Admin เท่านั้นที่ลบทัวร์ได้
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  remove(@Param('id') id: string) {
    return this.toursService.remove(+id);
  }
}