import React from 'react';
import './PackageTour.css'; // นำเข้า CSS ที่เราสร้าง

// 1. Interface
interface TourPackage {
  id: number;
  title: string;
  duration: string;
  price?: number;
  imageUrl: string;
}

// 2. Data
const tourData: TourPackage[] = [
  {
    id: 1,
    title: 'เกาะสมุย',
    duration: '3 วัน 2 คืน',
    price: 5900,
    imageUrl: 'https://placehold.co/400x300/purple/white?text=Samui',
  },
  {
    id: 2,
    title: 'ทัวร์ 7 เกาะ',
    duration: '1 วัน (One Day Trip)',
    price: 1500,
    imageUrl: 'https://placehold.co/400x300/purple/white?text=7+Islands',
  },
  {
    id: 3,
    title: 'ดำน้ำเกาะเต่า',
    duration: '2 วัน 1 คืน',
    price: 3200,
    imageUrl: 'https://placehold.co/400x300/purple/white?text=Tao+Island',
  },
  {
    id: 4,
    title: 'ล่องเรืออ่าวพังงา',
    duration: 'ครึ่งวัน',
    price: 1200,
    imageUrl: 'https://placehold.co/400x300/purple/white?text=Phang+Nga',
  },
];

// 3. Sub-Component (TourCard)
const TourCard: React.FC<{ tour: TourPackage }> = ({ tour }) => {
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
          <button className="card-button">
            จองเลย
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. Main Component (Page)
export default function PackageTourPage() {
  return (
    <div className="tour-page-container">
      <div className="tour-content-wrapper">
        
        <header className="tour-header">
          <h1 className="tour-title">Package Tour</h1>
          <div className="tour-title-underline"></div>
        </header>

        <div className="tour-grid">
          {/* วนลูปข้อมูลจริง */}
          {tourData.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
          
          {/* วนลูปสร้างการ์ดเปล่า */}
          {[...Array(4)].map((_, index) => (
             <div key={`empty-${index}`} className="empty-card">
                <span>Coming Soon</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}