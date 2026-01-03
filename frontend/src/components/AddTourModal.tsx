// src/components/AddTourModal.tsx
import React, { useState, useEffect } from 'react';

interface AddTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any; // เพิ่ม prop นี้เพื่อรับข้อมูลเก่ามาแก้ไข
}

const AddTourModal: React.FC<AddTourModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  // สร้าง State สำหรับ Form
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    price: 0,
    imageUrl: '',
    description: ''
  });

  // useEffect: เมื่อ Modal เปิด หรือ initialData เปลี่ยน ให้เช็คว่าจะต้องเติมข้อมูลลงฟอร์มมั้ย
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // โหมดแก้ไข: เอาข้อมูลเก่าใส่ฟอร์ม
        setFormData(initialData);
      } else {
        // โหมดเพิ่มใหม่: ล้างฟอร์ม
        setFormData({ title: '', duration: '', price: 0, imageUrl: '', description: '' });
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // ส่งข้อมูลกลับไป
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '400px', maxWidth: '90%' }}>
        <h2>{initialData ? 'แก้ไขทัวร์' : 'เพิ่มทัวร์ใหม่'}</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            name="title" placeholder="ชื่อทัวร์" value={formData.title} onChange={handleChange} required 
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input 
            name="duration" placeholder="ระยะเวลา (เช่น 3 วัน 2 คืน)" value={formData.duration} onChange={handleChange} required 
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input 
            name="price" type="number" placeholder="ราคา" value={formData.price || ''} onChange={handleChange} required 
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input 
            name="imageUrl" placeholder="URL รูปภาพ" value={formData.imageUrl} onChange={handleChange} required 
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <textarea 
            name="description" placeholder="รายละเอียด" value={formData.description} onChange={handleChange} rows={3}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', cursor: 'pointer', backgroundColor: '#eee', border: 'none', borderRadius: '4px' }}>ยกเลิก</button>
            <button type="submit" style={{ flex: 1, padding: '10px', cursor: 'pointer', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '4px' }}>
               {initialData ? 'บันทึกการแก้ไข' : 'เพิ่มข้อมูล'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTourModal;