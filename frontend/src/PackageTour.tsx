import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TourCard, { type TourPackage } from './components/TourCard'; 
import AddTourModal from './components/AddTourModal';
import DeleteModal from './components/Delete'; 
import TourDetails from './components/TourDetails';
import Settings from './components/Settings'; // ✅ 1. Import Settings

interface PackageTourProps { 
  userRole: 'admin' | 'user'; 
  onLogout: () => void; 
}

export default function PackageTour({ userRole, onLogout }: PackageTourProps) {
  
  // --- 1. Data State ---
  const [tours, setTours] = useState<any[]>([
    { id: 1, title: '7 Islands Krabi', duration: '1 Day', days: 1, nights: 0, price: 1500, imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80', description: 'Visit the magnificent 7 Islands Krabi.' },
    { id: 2, title: 'Samui Retreat', duration: '2 Days 2 Nights', days: 2, nights: 2, price: 8500, imageUrl: 'https://paradiseislandestate.com/wp-content/uploads/2024/11/Is-Koh-Samui-Worth-Visiting-1440x812.jpg', description: 'Relaxing on beautiful beaches of Samui.' },
    { id: 3, title: 'Phi Phi Islands', duration: '2 Days 1 Night', days: 2, nights: 1, price: 5900, imageUrl: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80', description: 'Experience the crystal clear waters of Phi Phi.' },
  ]);

  // --- 2. UI Control States ---
  const [isAddOpen, setAddOpen] = useState(false);
  const [isDelOpen, setDelOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [viewDetailsTour, setViewDetailsTour] = useState<TourPackage | null>(null); 
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]); 
  
  // ✅ 2. เพิ่ม 'settings' ใน Type ของ State
  const [viewMode, setViewMode] = useState<'all' | 'favorites' | 'bookings' | 'settings'>('all');

  // --- 3. Logic Functions ---

  const toggleFavorite = (id: number) => {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(prev => prev.filter(favId => favId !== id));
    } else {
      setFavoriteIds(prev => [...prev, id]);
    }
  };

  const handleSave = (tourData: any) => {
    let processedData = { ...tourData };
    if (processedData.days !== undefined && processedData.nights !== undefined) {
      const d = Number(processedData.days);
      const n = Number(processedData.nights);
      const dayText = d > 0 ? `${d} Day${d > 1 ? 's' : ''}` : '';
      const nightText = n > 0 ? `${n} Night${n > 1 ? 's' : ''}` : '';
      processedData.duration = `${dayText} ${nightText}`.trim() || '1 Day';
    }

    if (selectedTour) {
      setTours(tours.map(t => t.id === selectedTour.id ? { ...processedData, id: t.id } : t));
    } else {
      const newId = Math.max(...tours.map(t => t.id), 0) + 1;
      setTours([...tours, { ...processedData, id: newId }]);
    }
    setAddOpen(false);
    setSelectedTour(null);
  };

  const handleDelete = () => {
    if (selectedTour) {
      setTours(tours.filter(t => t.id !== selectedTour.id));
      setFavoriteIds(prev => prev.filter(id => id !== selectedTour.id));
      setDelOpen(false);
      setSelectedTour(null);
    }
  };

  // --- 4. Filtering Logic ---
  const displayedTours = viewMode === 'favorites' 
    ? tours.filter(tour => favoriteIds.includes(tour.id))
    : tours;

  return (
    <div>
      <Navbar 
        userRole={userRole} 
        onLogout={onLogout} 
        onOpenBookings={() => setViewMode('bookings')}
        onGoHome={() => setViewMode('all')} 
        // ✅ 3. ส่งคำสั่งเปิด Settings ไปให้ Navbar
        onOpenSettings={() => setViewMode('settings')}
      />

      {/* Hero แสดงเฉพาะหน้าแรก (all) */}
      {viewMode === 'all' && <Hero />}

      <div className="trego-container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
        
        {/* --- Header Section (ซ่อนถ้าเป็นหน้า Settings) --- */}
        {viewMode !== 'settings' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <h2 style={{ fontSize: '32px', color: '#0f1d45', margin: 0 }}>
                {viewMode === 'all' && 'Popular Packages'}
                {viewMode === 'favorites' && 'My Favorites'}
                {viewMode === 'bookings' && 'My Bookings'}
              </h2>

              {viewMode !== 'bookings' && (
                <div style={{ background: '#f3f4f6', padding: '5px', borderRadius: '10px', display: 'flex' }}>
                  <button 
                    onClick={() => setViewMode('all')}
                    style={{ 
                      border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
                      background: viewMode === 'all' ? 'white' : 'transparent',
                      color: viewMode === 'all' ? '#0f1d45' : '#666',
                      boxShadow: viewMode === 'all' ? '0 2px 5px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    All Tours
                  </button>
                  <button 
                    onClick={() => setViewMode('favorites')}
                    style={{ 
                      border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
                      background: viewMode === 'favorites' ? 'white' : 'transparent',
                      color: viewMode === 'favorites' ? '#ef4444' : '#666',
                      boxShadow: viewMode === 'favorites' ? '0 2px 5px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    Favorites ({favoriteIds.length})
                  </button>
                </div>
              )}
            </div>

            {userRole === 'admin' && viewMode !== 'bookings' && (
              <button className="trego-btn trego-btn-primary" onClick={() => { setSelectedTour(null); setAddOpen(true); }}>
                + Add Package
              </button>
            )}

            {viewMode === 'bookings' && (
               <button onClick={() => setViewMode('all')} className="trego-btn" style={{border: '1px solid #ddd'}}>
                 ← Back to Tours
               </button>
            )}
          </div>
        )}

        {/* --- Content Body --- */}
        
        {viewMode === 'bookings' ? (
          // 🟡 VIEW: Bookings
          <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '20px', border: '1px dashed #cbd5e1' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>✈️</div>
            <h3 style={{ color: '#0f1d45' }}>Your itinerary is empty</h3>
            <p style={{ color: '#666' }}>Looks like you haven't booked any trips yet.</p>
            <button onClick={() => setViewMode('all')} className="trego-btn trego-btn-primary" style={{ marginTop: '20px' }}>
              Explore Packages
            </button>
          </div>

        ) : viewMode === 'settings' ? (
           // ⚫ VIEW: Settings (เพิ่มใหม่)
           <Settings />
           
        ) : (
          // 🔵 VIEW: All Tours / Favorites
          <>
            {displayedTours.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                {displayedTours.map(tour => (
                  <TourCard 
                    key={tour.id} 
                    tour={tour}
                    isFavorite={favoriteIds.includes(tour.id)}
                    onToggleFavorite={() => toggleFavorite(tour.id)}
                    onDetails={() => setViewDetailsTour(tour)} 
                    onEdit={userRole === 'admin' ? () => { setSelectedTour(tour); setAddOpen(true); } : undefined} 
                    onDelete={userRole === 'admin' ? () => { setSelectedTour(tour); setDelOpen(true); } : undefined} 
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
                <h3>No tours found in this list</h3>
                {viewMode === 'favorites' && (
                  <button onClick={() => setViewMode('all')} className="trego-btn" style={{marginTop: '10px'}}>
                    Go find some tours
                  </button>
                )}
              </div>
            )}
          </>
        )}

      </div>

      {/* --- Modals & Popups --- */}
      <AddTourModal 
        isOpen={isAddOpen} 
        onClose={() => setAddOpen(false)} 
        onSave={handleSave} 
        initialData={selectedTour} 
      />
      <DeleteModal 
        isOpen={isDelOpen} 
        onConfirm={handleDelete} 
        onCancel={() => setDelOpen(false)} 
      />
      {viewDetailsTour && (
        <TourDetails 
          tour={viewDetailsTour} 
          onClose={() => setViewDetailsTour(null)} 
        />
      )}
    </div>
  );
}