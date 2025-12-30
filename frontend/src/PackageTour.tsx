// src/PackageTourPage.tsx
import React, { useState, useEffect } from 'react';
import './PackageTour.css';
import TourCard from './components/TourCard';
import AddTourModal from './components/AddTourModal';

// ... (Interface TourPackage คงเดิม) ...
interface TourPackage {
  id: number;
  title: string;
  duration: string;
  price?: number;
  imageUrl: string;
  description?: string;
}

const initialTourData: TourPackage[] = [
  { id: 1, title: 'เกาะสมุย', duration: '3 วัน 2 คืน', price: 5900, imageUrl: 'https://placehold.co/400x300/purple/white?text=Samui', description: 'เที่ยวเกาะสวรรค์อ่าวไทย...' },
  { id: 2, title: 'ทัวร์ 7 เกาะ', duration: '1 วัน', price: 1500, imageUrl: 'https://placehold.co/400x300/purple/white?text=7+Islands', description: 'ล่องเรือเที่ยว 7 เกาะ...' },
];

// 1. รับ Props userRole เข้ามา
interface PackageTourPageProps {
  userRole: 'admin' | 'user';
}

export default function PackageTourPage({ userRole }: PackageTourPageProps) {
  // ... (State และ Logic เดิมคงไว้เหมือนเดิม) ...
  const [tours, setTours] = useState<TourPackage[]>(() => {
    const savedTours = localStorage.getItem('myTours');
    return savedTours ? JSON.parse(savedTours) : initialTourData;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('myTours', JSON.stringify(tours));
  }, [tours]);

  const handleSaveNewTour = (newTourData: any) => {
    setTours([...tours, { id: Date.now(), ...newTourData }]);
    setIsModalOpen(false);
  };
  
  const handleReset = () => {
    localStorage.removeItem('myTours');
    setTours(initialTourData);
    window.location.reload();
  };

  return (
    <div className="tour-page-container">
      <div className="tour-content-wrapper">
        
        <header className="tour-header-row">
          <div className="tour-title-group">
            <h1 className="tour-title">Package Tour</h1>
            <div className="tour-title-underline"></div>
          </div>
          
          <div style={{display: 'flex', gap: '10px'}}>
             
             {/* 2. Admin View: ปุ่ม Reset จะเห็นเฉพาะ Admin */}
             {userRole === 'admin' && (
               <button onClick={handleReset} style={{cursor: 'pointer', background: 'transparent', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '20px', color: '#666'}}>
                  รีเซ็ต
               </button>
             )}

             {/* 3. Admin View: ปุ่มเพิ่มทัวร์ จะเห็นเฉพาะ Admin */}
             {userRole === 'admin' && (
               <button className="btn-add-tour" onClick={() => setIsModalOpen(true)}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  เพิ่มทัวร์ใหม่
               </button>
             )}
             
             {/* User View: จะไม่เห็นปุ่มข้างบนเลย เห็นแค่รายชื่อทัวร์ */}

          </div>
        </header>

        <div className="tour-grid">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
          {/* ... (Empty Card Logic คงเดิม) ... */}
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