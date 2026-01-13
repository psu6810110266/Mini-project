// backend/src/bookings/dto/create-booking.dto.ts
export class CreateBookingDto {
  tourId: number;       // 🚩 เพิ่มบรรทัดนี้เพื่อให้ Service รู้จักค่าที่ส่งมาจากหน้าบ้าน
  bookedSeats: number;
  totalPrice: number;
  startDate: string;
  endDate: string;
}