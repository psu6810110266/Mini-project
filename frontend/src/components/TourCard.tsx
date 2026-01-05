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
}

export default function TourCard({ tour, onEdit, onDelete }: TourCardProps) {
  const isAdmin = !!onEdit && !!onDelete;

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
          <span>⭐ 4.8</span>
        </div>
        <p style={{ fontSize: '14px', color: '#666', margin: '0 0 15px', flex: 1 }}>{tour.description}</p>
        
        <div className="trego-card-footer">
          <div className="trego-price">฿{tour.price.toLocaleString()}</div>
          <button className="trego-btn trego-btn-primary" style={{ fontSize: '12px', padding: '8px 16px' }}>Book Now</button>
        </div>
      </div>
    </div>
  );
}