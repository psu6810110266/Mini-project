// src/components/TourCard.tsx
import React from 'react';

// (Interface เดิม)
interface TourPackage {
  id: number;
  title: string;
  duration: string;
  price?: number;
  imageUrl: string;
  description?: string;
}

interface TourCardProps {
  tour: TourPackage;
  onDelete?: () => void;
  onEdit?: () => void; // 1. เพิ่ม prop onEdit
}

const TourCard: React.FC<TourCardProps> = ({ tour, onDelete, onEdit }) => {
  // เช็คว่าเป็น Admin มั้ย (ถ้ามีทั้ง onEdit และ onDelete ส่งมาแปลว่าเป็น Admin)
  const isAdmin = !!onDelete && !!onEdit;

  return (
    <div className="tour-card" style={{ position: 'relative', border: '1px solid #eee', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#fff' }}>
      
      {/* --- Admin Action Buttons --- */}
      {isAdmin && (
        <div style={{
            position: 'absolute', top: '10px', right: '10px', zIndex: 10,
            display: 'flex', gap: '8px'
        }}>
            {/* ปุ่มแก้ไข (สีเหลือง/ส้ม) */}
            <button
                onClick={(e) => { e.stopPropagation(); onEdit && onEdit(); }}
                style={{
                    backgroundColor: '#f59e0b', color: 'white', border: 'none',
                    borderRadius: '50%', width: '32px', height: '32px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
            >
                {/* Icon ดินสอ */}
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>

            {/* ปุ่มลบ (สีแดง) */}
            <button
                onClick={(e) => { e.stopPropagation(); onDelete && onDelete(); }}
                style={{
                    backgroundColor: '#ef4444', color: 'white', border: 'none',
                    borderRadius: '50%', width: '32px', height: '32px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
            >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
        </div>
      )}

      {/* ... (เนื้อหาการ์ดส่วนล่างเหมือนเดิม) ... */}
      <img src={tour.imageUrl} alt={tour.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 10px' }}>{tour.title}</h3>
        <p style={{ color: '#888', fontSize: '14px' }}>⏳ {tour.duration}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#8b5cf6' }}>฿{tour.price?.toLocaleString()}</span>
          <button style={{ backgroundColor: '#8b5cf6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>จองเลย</button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;