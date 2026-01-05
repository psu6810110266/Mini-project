import { useState } from 'react';

export interface TourPackage {
  id: number;
  title: string;
  duration: string;
  price: number;
  imageUrl: string;
  description?: string;
}

interface TourCardProps {
  tour: TourPackage;
  onEdit?: () => void;
  onDelete?: () => void;
  onDetails?: () => void; // 1. เพิ่มบรรทัดนี้: รับฟังก์ชันกดดูรายละเอียด
}

export default function TourCard({ tour, onEdit, onDelete, onDetails }: TourCardProps) {
  const isAdmin = !!onEdit && !!onDelete;
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="trego-card">
      {isAdmin && (
        <div className="admin-actions">
          <button className="action-btn btn-edit" onClick={onEdit}>✎</button>
          <button className="action-btn btn-del" onClick={onDelete}>🗑</button>
        </div>
      )}

      <img src={tour.imageUrl} alt={tour.title} className="trego-card-img" />
      
      <div className="trego-card-body">
        <h3 className="trego-card-title">{tour.title}</h3>
        <div className="trego-card-meta">
          <span>⏳ {tour.duration}</span>
        </div>
        <p style={{ fontSize: '14px', color: '#666', margin: '0 0 15px', flex: 1 }}>{tour.description}</p>
        
        <div className="trego-card-footer">
          <div className="trego-price">฿{tour.price.toLocaleString()}</div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              className="btn-favorite" 
              onClick={() => setIsFavorite(!isFavorite)}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "#ef4444" : "none"} stroke={isFavorite ? "#ef4444" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            {/* 2. ผูก onClick กับ onDetails ตรงนี้ครับ */}
            <button 
              className="trego-btn trego-btn-primary" 
              style={{ fontSize: '12px', padding: '8px 16px' }}
              onClick={onDetails}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}