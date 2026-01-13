import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { message } from 'antd'; 
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Hero from './components/Hero';     
import TourCard, { type TourPackage } from './components/TourCard'; 
import AddTourModal from './components/AddTourModal';
import DeleteModal from './components/Delete';
import TourDetails from './components/TourDetails';
import MyBookings from './components/MyBookings';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import Settings from './components/Settings';

export default function PackageTour() {
  const navigate = useNavigate();

  // --- เช็ค Role สำหรับแสดงผลปุ่มบนหน้าเว็บ ---
  const rawRole = localStorage.getItem('app_role') || sessionStorage.getItem('app_role') || 'user';
  const userRole = rawRole.toLowerCase() === 'admin' ? 'admin' : 'user';

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login'); 
  };

  // --- Data & State ---
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isAddOpen, setAddOpen] = useState(false);
  const [isDelOpen, setDelOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [viewDetailsTour, setViewDetailsTour] = useState<TourPackage | null>(null);

  const [isBookingOpen, setBookingOpen] = useState(false);
  const [bookingTour, setBookingTour] = useState<TourPackage | null>(null);
  
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]); 
  const [viewMode, setViewMode] = useState<'all' | 'favorites' | 'bookings' | 'settings'>('all');

  // --- API Functions ---
  
  // 1. ดึงข้อมูลทัวร์ (เป็น Public ไม่ต้องใช้บัตรผ่าน)
  const fetchTours = async () => {
    try {
      const res = await axios.get('http://localhost:3000/tours');
      setTours(res.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
      message.error('ไม่สามารถดึงข้อมูลทัวร์ได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTours(); }, []);

  // 🚩 2. ฟังก์ชัน บันทึก/แก้ไข (ต้องใช้บัตร Admin)
  const handleSave = async (tourData: TourPackage) => {
    // ✨ ดึงบัตรผ่านจากเครื่อง
    const token = localStorage.getItem('app_token'); 
    const config = {
      headers: { Authorization: `Bearer ${token}` } // 🚩 ยื่นบัตรให้ Backend
    };

    try {
      if (selectedTour) {
        // แก้ไขแพ็คเกจเดิม
        await axios.patch(`http://localhost:3000/tours/${selectedTour.id}`, tourData, config);
        message.success('✅ แก้ไขแพ็คเกจเรียบร้อย');
      } else {
        // เพิ่มแพ็คเกจใหม่
        await axios.post('http://localhost:3000/tours', tourData, config);
        message.success('✅ เพิ่มแพ็คเกจใหม่เรียบร้อย');
      }
      setAddOpen(false);
      setSelectedTour(null);
      fetchTours();
    } catch (error) {
      // 🕵️‍♂️ ถ้ายังติด 401 แสดงว่า Token หายหรือคุณไม่ใช่ Admin จริงๆ
      message.error('❌ คุณไม่มีสิทธิ์จัดการข้อมูล (Admin Only)');
    }
  };

  // 🚩 3. ฟังก์ชัน ลบ (ต้องใช้บัตร Admin)
  const handleDelete = async () => {
    if (selectedTour) {
      const token = localStorage.getItem('app_token');
      try {
        await axios.delete(`http://localhost:3000/tours/${selectedTour.id}`, {
          headers: { Authorization: `Bearer ${token}` } // 🚩 ยื่นบัตรให้ Backend
        });
        message.success('🗑️ ลบแพ็คเกจเรียบร้อย');
        setDelOpen(false);
        setSelectedTour(null);
        fetchTours();
      } catch (error) {
        message.error('❌ ลบไม่สำเร็จ (คุณอาจไม่มีสิทธิ์ หรือมีข้อมูลจองค้างอยู่)');
      }
    }
  };

  // --- ส่วนอื่นๆ ของ Component ---
  const handleOpenBooking = (tour: TourPackage) => {
    const token = localStorage.getItem('app_token'); 
    if (!token || token === 'undefined') {
       message.warning('กรุณาเข้าสู่ระบบก่อนจองนะครับ 🔒');
       return;
    }
    setBookingTour(tour);
    setBookingOpen(true);
  };

  const toggleFavorite = (id: number) => {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(prev => prev.filter(favId => favId !== id));
    } else {
      setFavoriteIds(prev => [...prev, id]);
    }
  };

  const displayedTours = viewMode === 'favorites' 
    ? tours.filter(tour => favoriteIds.includes(tour.id))
    : tours;

  return (
    <div>
      <Navbar 
        userRole={userRole} 
        onLogout={handleLogout} 
        onOpenBookings={() => setViewMode('bookings')} 
        onGoHome={() => setViewMode('all')} 
        onOpenSettings={() => setViewMode('settings')}
      />

      {viewMode === 'all' && <Hero />}

      <div className="trego-container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
        
        {/* Admin Header */}
        {viewMode !== 'settings' && viewMode !== 'bookings' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <h2 style={{ fontSize: '32px', color: '#0f1d45', margin: 0 }}>
                {viewMode === 'all' && 'Popular Packages'}
                {viewMode === 'favorites' && 'My Favorites'}
              </h2>
            </div>
            {userRole === 'admin' && (
              <button className="trego-btn trego-btn-primary" onClick={() => { setSelectedTour(null); setAddOpen(true); }}>+ Add Package</button>
            )}
          </div>
        )}

        {/* Content Views */}
        {viewMode === 'bookings' ? (
          <div>
             <button onClick={() => setViewMode('all')} className="trego-btn" style={{ marginBottom: '20px', border: '1px solid #ddd' }}>← Back to Tours</button>
             <MyBookings />
          </div>
        ) : viewMode === 'settings' ? (
           <Settings onBack={() => setViewMode('all')} />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {displayedTours.map(tour => (
              <TourCard 
                key={tour.id} 
                tour={tour}
                isFavorite={favoriteIds.includes(tour.id)}
                onToggleFavorite={() => toggleFavorite(tour.id)}
                onDetails={() => setViewDetailsTour(tour)}
                onBook={() => handleOpenBooking(tour)} 
                onEdit={userRole === 'admin' ? () => { setSelectedTour(tour); setAddOpen(true); } : undefined} 
                onDelete={userRole === 'admin' ? () => { setSelectedTour(tour); setDelOpen(true); } : undefined} 
              />
            ))}
          </div>
        )}
      </div>

      {/* --- Modals --- */}
      <AddTourModal isOpen={isAddOpen} onClose={() => setAddOpen(false)} onSave={handleSave} initialData={selectedTour} />
      <DeleteModal isOpen={isDelOpen} onConfirm={handleDelete} onCancel={() => setDelOpen(false)} />
      
      {viewDetailsTour && <TourDetails tour={viewDetailsTour} onClose={() => setViewDetailsTour(null)} />}

      {bookingTour && (
        <BookingModal 
           visible={isBookingOpen} 
           onClose={() => { setBookingOpen(false); setBookingTour(null); }} 
           tourId={bookingTour.id}
           tourName={bookingTour.title}
           price={bookingTour.price} 
        />
      )}

      <Footer />
    </div>
  );
}