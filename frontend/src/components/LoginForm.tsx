import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onShowRegister?: () => void;
}

export default function LoginForm({ onShowRegister }: LoginFormProps) {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // ❌ ลบ state rememberMe ออกแล้ว
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // ❌ ไม่ส่ง rememberMe ไปแล้ว
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ เปลี่ยนมาใช้ localStorage อย่างเดียว (จำการล็อกอินไว้เสมอ)
        const storage = localStorage;

        storage.setItem('app_token', data.access_token); 
        storage.setItem('app_username', data.username);
        storage.setItem('app_role', data.role);

        navigate('/home'); 

      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อกับ Server ได้');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="trego-modal-box" style={{ maxWidth: '350px', textAlign: 'center' }}>
        <h1 className="trego-logo" style={{ justifyContent: 'center', marginBottom: '20px' }}>🐒 Monkey Tour</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>Welcome back! Please login.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="trego-form-group">
            <label className="trego-label">Username</label>
            <input 
              className="trego-input" 
              placeholder="Enter username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required
            />
          </div>
          <div className="trego-form-group">
            <label className="trego-label">Password</label>
            <input 
              className="trego-input" 
              type="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
            />
          </div>

          {/* ❌ ลบส่วน Checkbox UI ออกไปแล้ว */}

          {error && <p style={{ color: 'var(--trego-red)', fontSize: '12px' }}>{error}</p>}
          
          <button 
            type="submit" 
            className="trego-btn trego-btn-primary" 
            style={{ width: '100%', marginTop: '20px' }} // เพิ่ม margin นิดหน่อยให้สวยงาม
            disabled={loading}
          >
            {loading ? 'Checking...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '14px' }}>
          <span>Don't have an account? </span>
          <button 
            type="button" 
            onClick={onShowRegister} 
            style={{ background: 'none', border: 'none', color: 'var(--trego-blue)', cursor: 'pointer', fontWeight: '700', textDecoration: 'underline' }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}