import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TourCard, { type TourPackage } from './components/TourCard'; 
import AddTourModal from './components/AddTourModal';
import DeleteModal from './components/Delete';

interface PackageTourProps { userRole: 'admin' | 'user'; onLogout: () => void; }

export default function PackageTour({ userRole, onLogout }: PackageTourProps) {
  const [tours, setTours] = useState<TourPackage[]>([
    { id: 1, title: '7 Islands Krabi', duration: '1 Day', price: 1500, imageUrl: 'https://www.krabiteerapongtour.com/uploads/package/pictures/pic-618950471758.jpg', description: 'Visit the magnificent 7 Islands Krabi.' },
    { id: 2, title: 'Samui', duration: '2 Days 2 Nights', price: 8500, imageUrl: 'https://blog.bangkokair.com/wp-content/uploads/2023/11/%E0%B9%80%E0%B8%81%E0%B8%B2%E0%B8%B0%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%A2.png', description: 'Relaxing on beautiful beaches.' },
    { id: 3, title: 'Phi Phi Islands', duration: '2 Days 1 Night', price: 5900, imageUrl: 'https://teawkrabi.com/wp-content/uploads/Phi-Phi-Isaland.jpg', description: 'Experience Northern culture.' }
  ]);

  const [isAddOpen, setAddOpen] = useState(false);
  const [isDelOpen, setDelOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);

  const handleSave = (data: any) => {
    if (selectedTour) setTours(prev => prev.map(t => t.id === selectedTour.id ? { ...data, id: t.id } : t));
    else setTours(prev => [...prev, { ...data, id: Date.now() }]);
    setAddOpen(false);
  };

  const handleDelete = () => {
    if (selectedTour) setTours(prev => prev.filter(t => t.id !== selectedTour.id));
    setDelOpen(false);
  };

  return (
    <div>
      <Navbar userRole={userRole} onLogout={onLogout} />
      <Hero />
      <div className="trego-container" style={{ padding: '60px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', color: '#0f1d45', margin: 0 }}>Popular Packages</h2>
          {userRole === 'admin' && (
            <button className="trego-btn trego-btn-primary" onClick={() => { setSelectedTour(null); setAddOpen(true); }}>+ Add Package</button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {tours.map(tour => (
            <TourCard 
              key={tour.id} tour={tour} 
              onEdit={userRole === 'admin' ? () => { setSelectedTour(tour); setAddOpen(true); } : undefined} 
              onDelete={userRole === 'admin' ? () => { setSelectedTour(tour); setDelOpen(true); } : undefined} 
            />
          ))}
        </div>
      </div>

      <AddTourModal isOpen={isAddOpen} onClose={() => setAddOpen(false)} onSave={handleSave} initialData={selectedTour} />
      <DeleteModal isOpen={isDelOpen} onConfirm={handleDelete} onCancel={() => setDelOpen(false)} />
    </div>
  );
}