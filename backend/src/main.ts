// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // เพิ่มบรรทัดนี้: อนุญาตให้ Frontend (ปกติคือ port 5173) ยิงมาหาเราได้
  app.enableCors(); 
  
  await app.listen(3000);
}
bootstrap();