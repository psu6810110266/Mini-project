import React from 'react';

// 1. เพิ่ม description ใน Interface (ใส่เครื่องหมาย ? แปลว่ามีหรือไม่มีก็ได้)
interface TourPackage {
  id: number;
  title: string;
  duration: string;
  price?: number;
  imageUrl: string;
  description?: string; // <--- เพิ่มบรรทัดนี้
}

interface TourCardProps {
  tour: TourPackage;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <div className="tour-card">
      <div className="card-image-container">
        <img src={tour.imageUrl} alt={tour.title} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{tour.title}</h3>
        <p className="card-duration">⏳ {tour.duration}</p>

        {/* 2. เพิ่มส่วนแสดงคำอธิบาย (ถ้ามีข้อมูลให้แสดง) */}
        {tour.description && (
          <p className="card-description">
            {tour.description}
          </p>
        )}

        <div className="card-footer">
          <span className="card-price">
            {tour.price ? `฿${tour.price.toLocaleString()}` : 'สอบถามราคา'}
          </span>
          <button className="card-button">จองเลย</button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;