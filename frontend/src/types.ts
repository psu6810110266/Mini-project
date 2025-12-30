// src/types.ts
export interface TourPackage {
  id: number;
  title: string;
  description?: string;
  duration: string;
  price?: number;
  imageUrl: string;
}