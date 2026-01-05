import React, { useState } from 'react';

interface RegisterModalProps {
  onClose: () => void;
}

export default function RegisterModal({ onClose }: RegisterModalProps) {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ตรวจสอบว่าพอร์ต 3000 ตรงกับ NestJS ของคุณ
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registration Successful! You can now login.');
        onClose();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Registration failed.');
      }
    } catch (err) {
      alert('Network error. Check if your NestJS server is running on port 3000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trego-modal-overlay">
      <div className="trego-modal-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: 'var(--trego-blue)' }}>Create Account</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="trego-form-group">
            <label className="trego-label">Username</label>
            <input 
              className="trego-input" 
              required 
              onChange={e => setFormData({...formData, username: e.target.value})} 
            />
          </div>
          <div className="trego-form-group">
            <label className="trego-label">Email Address</label>
            <input 
              className="trego-input" 
              type="email" 
              required 
              onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          <div className="trego-form-group">
            <label className="trego-label">Password</label>
            <input 
              className="trego-input" 
              type="password" 
              required 
              onChange={e => setFormData({...formData, password: e.target.value})} 
            />
          </div>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
            <button type="button" onClick={onClose} className="trego-btn trego-btn-cancel" style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="trego-btn trego-btn-primary" style={{ flex: 1 }} disabled={loading}>
              {loading ? 'Processing...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}