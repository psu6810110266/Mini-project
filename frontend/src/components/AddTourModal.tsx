import React, { useState } from 'react';

interface AddTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  // รับค่าอะไรก็ได้ (any) ไปก่อน จะได้ไม่ error ง่ายๆ
  onSave: (tour: any) => void;
}

const AddTourModal: React.FC<AddTourModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    price: '',
    imageUrl: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: formData.title,
      duration: formData.duration,
      price: Number(formData.price) || 0,
      imageUrl: formData.imageUrl || 'https://placehold.co/400x300/purple/white?text=New',
    });
    // ล้างค่าในฟอร์มหลังบันทึก
    setFormData({ title: '', duration: '', price: '', imageUrl: '' });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>เพิ่มแพ็คเกจทัวร์ใหม่</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ชื่อทัวร์:</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>ระยะเวลา:</label>
            <input
              type="text"
              required
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>ราคา (บาท):</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>ลิงก์รูปภาพ (URL):</label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose} style={{marginRight: '10px'}}>
              ยกเลิก
            </button>
            <button type="submit" className="btn-save" style={{background: '#9333ea', color: 'white'}}>
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTourModal;