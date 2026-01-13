import { Card, Tag, Button, Typography } from 'antd';
import { ClockCircleOutlined, TeamOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';

const { Text } = Typography;

export interface TourPackage {
  id: number;
  title: string;
  duration: string;
  price: number;
  imageUrl: string;
  description?: string;
  days?: number;
  nights?: number;
}

interface TourCardProps {
  tour: TourPackage;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onDetails: () => void;
  
  // ✅ 1. ต้องรับ onBook เข้ามา เพื่อให้กดจองได้
  onBook?: () => void;
  
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TourCard({ 
  tour, 
  isFavorite, 
  onToggleFavorite, 
  onDetails, 
  onBook, // ✅ รับ Props
  onEdit, 
  onDelete 
}: TourCardProps) {

  // 🛡️ 2. ระบบกันจอขาว: ถ้าข้อมูลยังไม่มา ให้หยุดทำงานส่วนนี้ (สำคัญมาก!)
  if (!tour) return null; 

  // 🛡️ 3. เตรียมข้อมูลแบบปลอดภัย (กันค่าว่าง/undefined)
  const safeImage = tour.imageUrl || 'https://via.placeholder.com/400x200?text=No+Image';
  const safeTitle = tour.title || 'Unknown Tour';
  const safePrice = tour.price ? tour.price.toLocaleString() : '0';
  
  return (
    <Card
      hoverable
      style={{ width: '100%', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
      cover={
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          <img alt={safeTitle} src={safeImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div 
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
            style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.8)', borderRadius: '50%', padding: '8px', cursor: 'pointer', display: 'flex' }}
          >
            {isFavorite ? <HeartFilled style={{ color: '#ff4d4f', fontSize: '20px' }} /> : <HeartOutlined style={{ color: '#666', fontSize: '20px' }} />}
          </div>
        </div>
      }
    >
      <div style={{ padding: '0 10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
           <h3 style={{ margin: 0, fontSize: '18px', color: '#0f1d45', fontWeight: 'bold' }}>{safeTitle}</h3>
           <Tag color="blue">{tour.duration || 'N/A'}</Tag>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', color: '#666', marginBottom: '15px', fontSize: '13px' }}>
           <span><ClockCircleOutlined /> {tour.days || 0}D/{tour.nights || 0}N</span>
           <span><TeamOutlined /> Min 1</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
           <div>
              <Text style={{ fontSize: '12px', color: '#888' }}>Starting from</Text>
              <div style={{ color: '#0f1d45', fontSize: '20px', fontWeight: 'bold' }}>฿{safePrice}</div>
           </div>

           <div style={{ display: 'flex', gap: '10px' }}>
              <Button onClick={onDetails}>Details</Button>
              
              {/* ✅ 4. ปุ่มจองที่ใช้งานได้จริง */}
              <Button type="primary" onClick={onBook} style={{ background: '#0f1d45' }}>
                 Book Now
              </Button>
           </div>
        </div>

        {(onEdit || onDelete) && (
          <div style={{ borderTop: '1px solid #eee', marginTop: '15px', paddingTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
             {onEdit && <Button size="small" onClick={onEdit}>Edit</Button>}
             {onDelete && <Button size="small" danger onClick={onDelete}>Delete</Button>}
          </div>
        )}
      </div>
    </Card>
  );
}