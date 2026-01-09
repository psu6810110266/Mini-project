import { useState, useEffect } from 'react';

interface AddTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export default function AddTourModal({ isOpen, onClose, onSave, initialData }: AddTourModalProps) {
  // ✅ 1. ปรับ State ให้มี days และ nights แทน duration เดิม
  const [formData, setFormData] = useState({ 
    title: '', 
    days: 1, 
    nights: 0, 
    price: 0, 
    imageUrl: '', 
    description: '' 
  });

  useEffect(() => {
    if (isOpen) {
      // ✅ 2. โหลดข้อมูลเดิม ถ้าไม่มีให้ตั้งค่าเริ่มต้นเป็น 1 วัน 0 คืน
      setFormData({
        title: initialData?.title || '',
        days: initialData?.days || 1,
        nights: initialData?.nights || 0,
        price: initialData?.price || 0,
        imageUrl: initialData?.imageUrl || '',
        description: initialData?.description || ''
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    // ✅ 3. แปลงค่าเป็นตัวเลขสำหรับ days, nights, และ price
    const isNumberField = ['price', 'days', 'nights'].includes(name);
    setFormData(prev => ({ 
      ...prev, 
      [name]: isNumberField ? Number(value) : value 
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="trego-modal-overlay">
      <div className="trego-modal-box">
        <h2 style={{ marginTop: 0 }}>{initialData ? 'Edit Package' : 'New Package'}</h2>
        
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          
          {/* Name */}
          <div className="trego-form-group">
            <label className="trego-label">Name</label>
            <input className="trego-input" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          {/* ✅ 4. แบ่ง Duration เป็น 2 ช่อง (Days / Nights) */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <div className="trego-form-group" style={{ flex: 1 }}>
              <label className="trego-label">Days</label>
              <input 
                className="trego-input" 
                name="days" 
                type="number" 
                min="1" 
                value={formData.days} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="trego-form-group" style={{ flex: 1 }}>
              <label className="trego-label">Nights</label>
              <input 
                className="trego-input" 
                name="nights" 
                type="number" 
                min="0" 
                value={formData.nights} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* Price */}
          <div className="trego-form-group">
            <label className="trego-label">Price (฿)</label>
            <input 
              className="trego-input" 
              name="price" 
              type="number" 
              min="0" 
              value={formData.price} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Image URL */}
          <div className="trego-form-group">
            <label className="trego-label">Image URL</label>
            <input className="trego-input" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
          </div>

          {/* Description */}
          <div className="trego-form-group">
            <label className="trego-label">Description</label>
            <textarea className="trego-input" name="description" rows={3} value={formData.description} onChange={handleChange} />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="button" className="trego-btn trego-btn-cancel" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
            <button type="submit" className="trego-btn trego-btn-primary" style={{ flex: 1 }}>Save</button>
          </div>

        </form>
      </div>
    </div>
  );
}