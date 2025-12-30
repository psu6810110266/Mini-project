import React, { useState, useEffect } from 'react';
import './PackageTour.css';
import TourCard from './components/TourCard';
import AddTourModal from './components/AddTourModal';

// 1. อัปเดต Interface ตรงนี้ด้วย
interface TourPackage {
  id: number;
  title: string;
  duration: string;
  price?: number;
  imageUrl: string;
  description?: string; // <--- เพิ่มบรรทัดนี้
}

// 2. เพิ่มคำอธิบายตัวอย่างในข้อมูลเริ่มต้น
const initialTourData: TourPackage[] = [
  { 
    id: 1, 
    title: 'เกาะสมุย', 
    duration: '3 วัน 2 คืน', 
    price: 5900, 
    imageUrl: 'https://placehold.co/400x300/purple/white?text=Samui',
    description: 'เที่ยวเกาะสวรรค์อ่าวไทย ดำน้ำชมปะการัง พักผ่อนริมหาดทรายขาว พร้อมที่พักสุดหรู' // <--- เพิ่มข้อมูลตัวอย่าง
  },
  { 
    id: 2, 
    title: 'ทัวร์ 7 เกาะ', 
    duration: '1 วัน', 
    price: 1500, 
    imageUrl: 'https://placehold.co/400x300/purple/white?text=7+Islands',
    description: 'ล่องเรือเที่ยว 7 เกาะดังในกระบี่ ทะเลแหวก เกาะปอดะ ถ้ำพระนาง รวมอาหารกลางวัน' // <--- เพิ่มข้อมูลตัวอย่าง
  },
];

export default function PackageTourPage() {
  // (ส่วนที่เหลือเหมือนเดิมเป๊ะ ไม่ต้องแก้ครับ)
  const [tours, setTours] = useState<TourPackage[]>(() => {
    const savedTours = localStorage.getItem('myTours');
    if (savedTours) {
      return JSON.parse(savedTours);
    } else {
      return initialTourData;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('myTours', JSON.stringify(tours));
  }, [tours]);

  const handleSaveNewTour = (newTourData: any) => {
    const newTour: TourPackage = {
      id: Date.now(),
      ...newTourData
    };
    setTours([...tours, newTour]);
    setIsModalOpen(false);
  };
  
  const handleReset = () => {
    localStorage.removeItem('myTours');
    setTours(initialTourData);
    window.location.reload();
  }

  return (
    <div className="tour-page-container">
      <div className="tour-content-wrapper">
        
        <header className="tour-header-row">
          <div className="tour-title-group">
            <h1 className="tour-title">Package Tour</h1>
            <div className="tour-title-underline"></div>
          </div>
          
          <div style={{display: 'flex', gap: '10px'}}>
             <button onClick={handleReset} style={{cursor: 'pointer', background: 'transparent', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '20px', color: '#666'}}>
                รีเซ็ต
             </button>

             <button className="btn-add-tour" onClick={() => setIsModalOpen(true)}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                เพิ่มทัวร์ใหม่
             </button>
          </div>
        </header>

        <div className="tour-grid">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
          
          {[...Array(Math.max(0, 4 - (tours.length % 4 || 4)))].map((_, index) => (
             <div key={`empty-${index}`} className="empty-card">
                <span>Coming Soon</span>
             </div>
          ))}
        </div>

        <AddTourModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveNewTour} 
        />

      </div>
    </div>
  );
}