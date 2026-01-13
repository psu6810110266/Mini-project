import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    
    // 🚩 ลอง console.log ดูว่า user.role มาจริงไหม
    console.log('Role ของคนที่จะเข้า:', user?.role); 
    console.log('Role ที่ต้องการ:', requiredRoles);

    if (!user || !user.role) return false;

    // 🚩 เช็คแบบตรงตัวเลยว่า Role เราอยู่ในรายการที่อนุญาตไหม
    return requiredRoles.includes(user.role); 
  }
}