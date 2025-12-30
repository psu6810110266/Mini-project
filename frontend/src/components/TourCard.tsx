import React from 'react';

// ประกาศตรงนี้เลย ไม่ต้อง import
interface TourPackage {
  id: number;
  title: string;
  duration: string;
  price?: number;
  imageUrl: string;
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