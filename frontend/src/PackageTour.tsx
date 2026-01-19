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
import AdminDashboard from './components/AdminDashboard'; // 🚩 1. เพิ่ม Import Dashboard

export default function PackageTour() {
  const navigate = useNavigate();

  // --- 1. จัดการ Token และ Role ---
  const token = localStorage.getItem('app_token'); 
  const rawRole = localStorage.getItem('app_role') || 'user';
  const userRole = rawRole.toLowerCase() === 'admin' ? 'admin' : 'user';

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login'); 
  };

  // --- 2. Data & State ---
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  // ดึง Favorite จากเครื่องทันทีที่โหลดหน้า
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('app_favorites');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 🚩 2. เพิ่ม Type 'dashboard' เข้าไปใน viewMode
  const [viewMode, setViewMode] = useState<'all' | 'favorites' | 'bookings' | 'settings' | 'dashboard'>('all');
  
  const [isAddOpen, setAddOpen] = useState(false);
  const [isDelOpen, setDelOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [viewDetailsTour, setViewDetailsTour] = useState<TourPackage | null>(null);
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [bookingTour, setBookingTour] = useState<TourPackage | null>(null);

  // --- 3. API Functions ---
  const fetchTours = async () => {
    try {
      const res = await axios.get('http://localhost:3000/tours');
      if (Array.isArray(res.data)) {
        setTours(res.data);
      }
    } catch (error) {
      message.error('ไม่สามารถดึงข้อมูลทัวร์ได้');
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    if (!token || token === 'undefined') return;
    try {
      const res = await axios.get('http://localhost:3000/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (Array.isArray(res.data)) {
        const ids = res.data.map((fav: any) => typeof fav === 'number' ? fav : fav.tourId || fav.id);
        if (ids.length > 0) {
          setFavoriteIds(ids);
          localStorage.setItem('app_favorites', JSON.stringify(ids));
        }
      }
    } catch (error) {
      console.error('Fetch Favorites Error:', error);
    }
  };

  useEffect(() => {
    fetchTours();
    fetchFavorites();
  }, []);

  const toggleFavorite = async (id: number) => {
    if (!token) {
      message.warning('กรุณาเข้าสู่ระบบก่อนนะครับ 🔒');
      return;
    }

    try {
      await axios.post('http://localhost:3000/favorites', { tourId: id }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFavoriteIds(prev => {
        const newIds = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
        localStorage.setItem('app_favorites', JSON.stringify(newIds));
        return newIds;
      });
    } catch (error) {
      message.error('ไม่สามารถบันทึกรายการโปรดได้');
    }
  };

  const handleSave = async (tourData: TourPackage) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (selectedTour) {
        await axios.patch(`http://localhost:3000/tours/${selectedTour.id}`, tourData, config);
        message.success('✅ แก้ไขสำเร็จ');
      } else {
        await axios.post('http://localhost:3000/tours', tourData, config);
        message.success('✅ เพิ่มสำเร็จ');
      }
      setAddOpen(false);
      fetchTours();
    } catch (error) {
      message.error('❌ คุณไม่มีสิทธิ์จัดการข้อมูล');
    }
  };

  const handleDelete = async () => {
    if (!selectedTour) return;
    try {
      await axios.delete(`http://localhost:3000/tours/${selectedTour.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('🗑️ ลบสำเร็จ');
      setDelOpen(false);
      fetchTours();
    } catch (error) {
      message.error('❌ ลบไม่สำเร็จ');
    }
  };

  const handleOpenBooking = (tour: TourPackage) => {
    if (!token || token === 'undefined') {
      message.warning('กรุณาเข้าสู่ระบบก่อนจองนะครับ 🔒');
      return;
    }
    setBookingTour(tour);
    setBookingOpen(true);
  };

  const displayedTours = viewMode === 'favorites'
    ? tours.filter(tour => favoriteIds.includes(tour.id))
    : tours;

  return (
    <div>
      <Navbar userRole={userRole} onLogout={handleLogout} onOpenBookings={() => setViewMode('bookings')} onGoHome={() => setViewMode('all')} onOpenSettings={() => setViewMode('settings')} />

      {viewMode === 'all' && <Hero />}

      <div className="trego-container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
        {/* ส่วน Header และปุ่มกดเปลี่ยนหน้า */}
        {viewMode !== 'settings' && viewMode !== 'bookings' && viewMode !== 'dashboard' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <h2 style={{ fontSize: '32px', color: '#0f1d45', margin: 0 }}>
                {viewMode === 'all' ? 'Popular Packages' : 'My Favorites'}
              </h2>
              <div style={{ background: '#f3f4f6', padding: '5px', borderRadius: '10px', display: 'flex' }}>
                <button onClick={() => setViewMode('all')} style={{ border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', background: viewMode === 'all' ? 'white' : 'transparent', color: viewMode === 'all' ? '#0f1d45' : '#666' }}>All Tours</button>
                <button onClick={() => setViewMode('favorites')} style={{ border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', background: viewMode === 'favorites' ? 'white' : 'transparent', color: viewMode === 'favorites' ? '#ef4444' : '#666' }}>Favorites ({favoriteIds.length})</button>
              </div>
            </div>

            {/* 🚩 3. ปุ่มสำหรับ Admin (Add Package & Dashboard) */}
            {userRole === 'admin' && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => setViewMode('dashboard')}
                  className="trego-btn"
                  style={{ background: '#6366f1', color: 'white', border: 'none' }}
                >
                  📊 Dashboard
                </button>
                <button 
                  className="trego-btn trego-btn-primary" 
                  onClick={() => { setSelectedTour(null); setAddOpen(true); }}
                >
                  + Add Package
                </button>
              </div>
            )}
          </div>
        )}

        {/* 🚩 4. ส่วน Render เนื้อหาตาม viewMode */}
        {viewMode === 'dashboard' ? (
          <div>
             <button onClick={() => setViewMode('all')} className="trego-btn" style={{ marginBottom: '20px', border: '1px solid #ddd' }}>← Back to Tours</button>
             <AdminDashboard />
          </div>
        ) : viewMode === 'bookings' ? (
          <div>
            <button onClick={() => setViewMode('all')} className="trego-btn" style={{ marginBottom: '20px', border: '1px solid #ddd' }}>← Back to Tours</button>
            <MyBookings />
          </div>
        ) : viewMode === 'settings' ? (
          <Settings onBack={() => setViewMode('all')} />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {displayedTours.map(tour => (
              <TourCard key={tour.id} tour={tour} isFavorite={favoriteIds.includes(tour.id)} onToggleFavorite={() => toggleFavorite(tour.id)} onDetails={() => setViewDetailsTour(tour)} onBook={() => handleOpenBooking(tour)} onEdit={userRole === 'admin' ? () => { setSelectedTour(tour); setAddOpen(true); } : undefined} onDelete={userRole === 'admin' ? () => { setSelectedTour(tour); setDelOpen(true); } : undefined} />
            ))}
          </div>
        )}
      </div>

      <AddTourModal isOpen={isAddOpen} onClose={() => setAddOpen(false)} onSave={handleSave} initialData={selectedTour} />
      <DeleteModal isOpen={isDelOpen} onConfirm={handleDelete} onCancel={() => setDelOpen(false)} />
      {viewDetailsTour && <TourDetails tour={viewDetailsTour} onClose={() => setViewDetailsTour(null)} />}
      {bookingTour && (
        <BookingModal visible={isBookingOpen} onClose={() => { setBookingOpen(false); setBookingTour(null); }} tourId={bookingTour.id} tourName={bookingTour.title} price={bookingTour.price} />
      )}
      <Footer />
    </div>
  );
}