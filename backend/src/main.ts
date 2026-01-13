// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());// ✨ เพิ่มบรรทัดนี้เพื่อตรวจสอบความถูกต้องของข้อมูล (DTO)
  // เพิ่มบรรทัดนี้เพื่อแก้ปัญหา Network Error (CORS)
  app.enableCors({
    origin: 'http://localhost:5173', // URL ของฝั่ง React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000); // ตรวจสอบว่าพอร์ตตรงกับที่ React เรียก (3000)
}
bootstrap();