import React, { useState } from 'react';
import { message } from 'antd'; // ใช้ antd เพื่อความสวยงาม

interface RegisterModalProps {
  onClose: () => void;
}

export default function RegisterModal({ onClose }: RegisterModalProps) {
  // 🚩 ปรับโครงสร้างให้ตรงกับ User Entity (เน้น username และ password)
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🚩 เปลี่ยน URL ให้ไปที่ /users (หรือตามที่ Backend ตั้งไว้)
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('สมัครสมาชิกสำเร็จ! ลอง Login ดูนะครับ 🐒');
        onClose();
      } else {
        // ถ้าสมัครไม่ผ่าน (เช่น username ซ้ำ)
        message.error(data.message || 'การสมัครสมาชิกล้มเหลว');
      }
    } catch (err) {
      message.error('ไม่สามารถเชื่อมต่อกับ Server ได้');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trego-modal-overlay">
      <div className="trego-modal-box" style={{ maxWidth: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: '#0f1d45' }}>Create Account</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="trego-form-group">
            <label className="trego-label">Username</label>
            <input 
              className="trego-input" 
              required 
              placeholder="ตั้งชื่อผู้ใช้งาน"
              onChange={e => setFormData({...formData, username: e.target.value})} 
            />
          </div>
          
          <div className="trego-form-group">
            <label className="trego-label">Password</label>
            <input 
              className="trego-input" 
              type="password" 
              required 
              placeholder="ตั้งรหัสผ่าน"
              onChange={e => setFormData({...formData, password: e.target.value})} 
            />
          </div>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
            <button type="button" onClick={onClose} className="trego-btn" style={{ flex: 1, border: '1px solid #ddd' }}>
              Cancel
            </button>
            <button type="submit" className="trego-btn trego-btn-primary" style={{ flex: 1 }} disabled={loading}>
              {loading ? 'Processing...' : 'Register Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}