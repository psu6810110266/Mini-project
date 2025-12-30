// src/tours/dto/create-tour.dto.ts
export class CreateTourDto {
  title: string;
  description: string;
  price: number;
  max_seats: number;
  image_url: string;
  start_date: Date;
  end_date: Date;
}