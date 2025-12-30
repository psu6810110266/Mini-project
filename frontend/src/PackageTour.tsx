import React, { useState } from 'react';
import './PackageTour.css'; // อย่าลืมไฟล์ CSS นี้นะครับ
import TourCard from './components/TourCard';
import AddTourModal from './components/AddTourModal';

// ประกาศ Interface ตรงนี้อีกรอบ (แยกกันอยู่ ไม่ต้องง้อไฟล์กลาง)
interface TourPackage {
  id: number;
  title: string;
  duration: string;
  price?: number;
  imageUrl: string;
}

// ข้อมูลตัวอย่าง
const initialTourData: TourPackage[] = [
  { id: 1, title: 'เกาะสมุย', duration: '3 วัน 2 คืน', price: 5900, imageUrl: 'https://placehold.co/400x300/purple/white?text=Samui' },
  { id: 2, title: 'ทัวร์ 7 เกาะ', duration: '1 วัน', price: 1500, imageUrl: 'https://placehold.co/400x300/purple/white?text=7+Islands' },
];

export default function PackageTourPage() {
  // State
  const [tours, setTours] = useState<TourPackage[]>(initialTourData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ฟังก์ชันเพิ่มทัวร์
  const handleSaveNewTour = (newTourData: any) => {
    const newTour: TourPackage = {
      id: Date.now(), // สร้าง ID ใหม่
      ...newTourData
    };
    setTours([...tours, newTour]); // เพิ่มเข้า List
    setIsModalOpen(false); // ปิด Modal
  };

  return (
    <div className="tour-page-container">
      <div className="tour-content-wrapper">
        
        {/* Header และ ปุ่มเพิ่มทัวร์ */}
        <header className="tour-header" style={{ position: 'relative' }}>
          <h1 className="tour-title">Package Tour</h1>
          <div className="tour-title-underline"></div>
          
          {/* ปุ่ม + New Tour (มุมขวาบน) */}
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              position: 'absolute', top: 0, right: 0,
              backgroundColor: '#22c55e', color: 'white',
              border: 'none', padding: '10px 20px', borderRadius: '30px',
              cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}
          >
            + เพิ่มทัวร์ใหม่
          </button>
        </header>

        {/* Grid แสดงทัวร์ */}
        <div className="tour-grid">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
          
           {/* การ์ดเปล่าให้เต็มแถว (Optional) */}
           {[...Array(Math.max(0, 4 - (tours.length % 4 || 4)))].map((_, index) => (
             <div key={`empty-${index}`} className="empty-card">
                <span>Coming Soon</span>
             </div>
          ))}
        </div>

        {/* Modal (Popup) */}
        <AddTourModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveNewTour} 
        />

      </div>
    </div>
  );
}