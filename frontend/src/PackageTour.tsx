import { useState, useEffect } from 'react';
import './PackageTour.css';
import TourCard from './components/TourCard';
import AddTourModal from './components/AddTourModal';
import DeleteModal from './components/delete'; // หรือ DeleteModal ถ้าเปลี่ยนชื่อไฟล์แล้ว

interface TourPackage {
  id: number;
  title: string;
  duration: string;
  price?: number;
  imageUrl: string;
  description?: string;
}

const initialTourData: TourPackage[] = [
  { id: 1, title: 'เกาะสมุย', duration: '3 วัน 2 คืน', price: 5900, imageUrl: 'https://placehold.co/400x300/purple/white?text=Samui', description: 'เที่ยวเกาะสวรรค์อ่าวไทย...' },
  { id: 2, title: 'ทัวร์ 7 เกาะ', duration: '1 วัน', price: 1500, imageUrl: 'https://placehold.co/400x300/purple/white?text=7+Islands', description: 'ล่องเรือเที่ยว 7 เกาะ...' },
];

interface PackageTourPageProps {
  userRole: 'admin' | 'user';
}

export default function PackageTourPage({ userRole }: PackageTourPageProps) {
  const [tours, setTours] = useState<TourPackage[]>(() => {
    const savedTours = localStorage.getItem('myTours');
    return savedTours ? JSON.parse(savedTours) : initialTourData;
  });

  // State สำหรับ Modal (ใช้ร่วมกันทั้ง Add และ Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 3. เพิ่ม State เก็บ "ทัวร์ที่กำลังแก้ไข" (ถ้าเป็น null แปลว่าเพิ่มใหม่)
  const [editingTour, setEditingTour] = useState<TourPackage | null>(null);

  // State สำหรับ Modal ลบทัวร์
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tourIdToDelete, setTourIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('myTours', JSON.stringify(tours));
  }, [tours]);

  // ฟังก์ชันเปิด Modal เพื่อ "เพิ่ม"
  const handleAddClick = () => {
    setEditingTour(null); // เคลียร์ข้อมูลเก่าออก
    setIsModalOpen(true);
  };

  // 4. ฟังก์ชันเปิด Modal เพื่อ "แก้ไข"
  const handleEditClick = (tour: TourPackage) => {
    setEditingTour(tour); // ใส่ข้อมูลที่จะแก้เข้าไป
    setIsModalOpen(true);
  };

  // 5. ปรับ Logic การบันทึก ให้รองรับทั้ง Add และ Edit
  const handleSaveTour = (tourData: any) => {
    if (editingTour) {
      // --- กรณีแก้ไข (Update) ---
      setTours(tours.map(t => 
        t.id === editingTour.id ? { ...t, ...tourData } : t
      ));
    } else {
      // --- กรณีเพิ่มใหม่ (Create) ---
      setTours([...tours, { id: Date.now(), ...tourData }]);
    }
    setIsModalOpen(false);
    setEditingTour(null); // Reset
  };
  
  const handleReset = () => {
    localStorage.removeItem('myTours');
    setTours(initialTourData);
    window.location.reload();
  };

  const handleDeleteClick = (id: number) => {
    setTourIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (tourIdToDelete !== null) {
      const updatedTours = tours.filter(tour => tour.id !== tourIdToDelete);
      setTours(updatedTours);
      setIsDeleteModalOpen(false);
      setTourIdToDelete(null);
    }
  };

  return (
    <div className="tour-page-container">
      <div className="tour-content-wrapper">
        
        <header className="tour-header-row">
          <div className="tour-title-group">
            <h1 className="tour-title">Package Tour</h1>
            <div className="tour-title-underline"></div>
          </div>
          
          <div style={{display: 'flex', gap: '10px'}}>
             {userRole === 'admin' && (
               <button onClick={handleReset} style={{cursor: 'pointer', background: 'transparent', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '20px', color: '#666'}}>
                  รีเซ็ต
               </button>
             )}

             {userRole === 'admin' && (
                // เปลี่ยนไปใช้ handleAddClick แทนการ set state ตรงๆ
               <button className="btn-add-tour" onClick={handleAddClick}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  เพิ่มทัวร์ใหม่
               </button>
             )}
          </div>
        </header>

        <div className="tour-grid">
          {tours.map((tour) => (
            <TourCard 
              key={tour.id} 
              tour={tour}
              // ส่งทั้ง Edit และ Delete ถ้าเป็น Admin
              onDelete={userRole === 'admin' ? () => handleDeleteClick(tour.id) : undefined}
              onEdit={userRole === 'admin' ? () => handleEditClick(tour) : undefined}
            />
          ))}
        </div>

        {/* Modal เพิ่ม/แก้ไข ทัวร์ */}
        <AddTourModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveTour} // เปลี่ยนชื่อฟังก์ชันเป็น handleSaveTour
          initialData={editingTour} // ส่งข้อมูลที่จะแก้ (ถ้ามี)
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />

      </div>
    </div>
  );
}