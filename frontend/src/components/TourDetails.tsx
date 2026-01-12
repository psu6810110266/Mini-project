import { useEffect } from 'react';
import { type TourPackage } from './TourCard';

interface TourDetailsProps {
  tour: TourPackage;
  onClose: () => void; // เปลี่ยนชื่อจาก onBack เป็น onClose ให้สื่อความหมาย
}

export default function TourDetails({ tour, onClose }: TourDetailsProps) {
  
  // (Optional) ป้องกันหน้าหลังเลื่อนตอนเปิด Popup
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    // 1. Overlay พื้นหลังสีดำจางๆ (เต็มจอ)
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', // สีดำโปร่งแสง
      zIndex: 9999, // อยู่บนสุด
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      backdropFilter: 'blur(5px)' // เบลอฉากหลังนิดๆ ให้ดูหรู
    }} onClick={onClose}> {/* กดที่ว่างเพื่อปิด */}

      {/* 2. กล่องเนื้อหา (Popup) */}
      <div 
        onClick={(e) => e.stopPropagation()} // กดในกล่องแล้วไม่ปิด
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh', // สูงไม่เกิน 90% ของจอ
          overflowY: 'auto', // ถ้าเนื้อหายาวให้เลื่อนได้
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          animation: 'fadeInUp 0.3s ease-out'
        }}
      >
        {/* 3. ปุ่มปิดกากบาท (X) มุมซ้ายบน */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px', // มุมซ้ายบน
            zIndex: 10,
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            color: '#333',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          ✕
        </button>

        {/* --- เนื้อหาข้างใน (เหมือนเดิม) --- */}
        
        {/* รูปภาพ Cover */}
        <div style={{ height: '400px', overflow: 'hidden' }}>
          <img src={tour.imageUrl} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <h1 style={{ fontSize: '32px', color: '#0f1d45', margin: '0 0 10px' }}>{tour.title}</h1>
              <span style={{ background: '#e0e7ff', color: '#0f1d45', padding: '5px 12px', borderRadius: '50px', fontSize: '14px', fontWeight: 'bold' }}>
                ⏳ {tour.duration}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#0f1d45' }}>฿{tour.price.toLocaleString()}</div>
              <p style={{ margin: 0, color: '#666' }}>per person</p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '30px 0' }} />

          <h3 style={{ color: '#0f1d45' }}>Description</h3>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#4b5563' }}>
            {tour.description}
            <br /><br />
            Experience the ultimate journey with our tour package. 
            Enjoy local cuisines, visit historical landmarks, and relax in top-rated accommodations.
          </p>

          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <button className="trego-btn trego-btn-primary" style={{ padding: '15px 40px', fontSize: '18px', width: '100%' }}>
              Book This Tour Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}