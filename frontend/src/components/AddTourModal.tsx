import { useState, useEffect } from 'react';

interface AddTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export default function AddTourModal({ isOpen, onClose, onSave, initialData }: AddTourModalProps) {
  const [formData, setFormData] = useState({ title: '', duration: '', price: 0, imageUrl: '', description: '' });

  useEffect(() => {
    if (isOpen) setFormData(initialData || { title: '', duration: '', price: 0, imageUrl: '', description: '' });
  }, [isOpen, initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  if (!isOpen) return null;

  return (
    <div className="trego-modal-overlay">
      <div className="trego-modal-box">
        <h2 style={{ marginTop: 0 }}>{initialData ? 'Edit Package' : 'New Package'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <div className="trego-form-group"><label className="trego-label">Name</label><input className="trego-input" name="title" value={formData.title} onChange={handleChange} required /></div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div className="trego-form-group" style={{ flex: 1 }}><label className="trego-label">Duration</label><input className="trego-input" name="duration" value={formData.duration} onChange={handleChange} required /></div>
            <div className="trego-form-group" style={{ flex: 1 }}><label className="trego-label">Price</label><input className="trego-input" name="price" type="number" value={formData.price} onChange={handleChange} required /></div>
          </div>
          <div className="trego-form-group"><label className="trego-label">Image URL</label><input className="trego-input" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required /></div>
          <div className="trego-form-group"><label className="trego-label">Description</label><textarea className="trego-input" name="description" rows={3} value={formData.description} onChange={handleChange} /></div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="button" className="trego-btn trego-btn-cancel" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
            <button type="submit" className="trego-btn trego-btn-primary" style={{ flex: 1 }}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}