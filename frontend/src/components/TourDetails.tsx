import { type TourPackage } from './TourCard';

interface TourDetailsProps {
  tour: TourPackage;
  onBack: () => void;
}

export default function TourDetails({ tour, onBack }: TourDetailsProps) {
  return (
    <div className="trego-container" style={{ padding: '40px 20px' }}>
      
      {/* ปุ่มย้อนกลับ */}
      <button 
        onClick={onBack}
        style={{ 
          background: 'none', border: 'none', cursor: 'pointer', 
          color: '#666', display: 'flex', alignItems: 'center', gap: '5px',
          marginBottom: '20px', fontSize: '16px', fontWeight: 'bold'
        }}
      >
        ← Back to Packages
      </button>

      {/* ส่วนแสดงผลรายละเอียด */}
      <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        
        {/* รูปภาพ Cover ใหญ่ */}
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
            {/* จำลอง text เพิ่มเติม */}
            Experience the ultimate journey with our premium tour package. 
            Enjoy local cuisines, visit historical landmarks, and relax in top-rated accommodations.
            Our guides are professional and ready to serve you.
          </p>

          <div style={{ marginTop: '40px' }}>
            <button className="trego-btn trego-btn-primary" style={{ padding: '12px 30px', fontSize: '16px' }}>
              Book This Tour Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}