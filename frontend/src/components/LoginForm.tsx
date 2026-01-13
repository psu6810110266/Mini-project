import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd'; 
import { jwtDecode } from "jwt-decode"; // 🚩 นำเข้าตัวถอดรหัส Token

interface LoginFormProps {
  onShowRegister?: () => void;
}

// กำหนด Interface สำหรับข้อมูลใน Token
interface JwtPayload {
  sub: number;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export default function LoginForm({ onShowRegister }: LoginFormProps) {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. ส่งข้อมูลไป Login ที่ Backend
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 2. ดึง Token ออกมา (รองรับหลายชื่อที่ Backend อาจส่งมา)
        const token = data.access_token || data.token || data.accessToken;

        if (token) {
          // 🚩 3. ถอดรหัส Token เพื่อดึง Role และข้อมูลอื่นๆ
          const decoded = jwtDecode<JwtPayload>(token);
          const userRole = (decoded.role || 'user').toLowerCase();

          // 🚩 4. บันทึกข้อมูลลง localStorage ให้ครบถ้วน
          localStorage.setItem('app_token', token); 
          localStorage.setItem('app_username', decoded.username);
          localStorage.setItem('app_role', userRole);

          message.success(`ยินดีต้อนรับคุณ ${decoded.username} (${userRole}) 🐒`);
          
          // 5. นำทางไปหน้าหลัก
          // แนะนำให้ใช้ window.location.href เพื่อให้ทั้งแอปโหลดสถานะใหม่จาก localStorage
          window.location.href = '/home'; 
        } else {
          setError('Backend ไม่ได้ส่ง Token มาให้');
        }

      } else {
        // กรณี Password ผิด หรือไม่พบ User
        setError(data.message || 'Username หรือ Password ไม่ถูกต้อง');
        message.error(data.message || 'เข้าสู่ระบบไม่สำเร็จ');
      }
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อกับ Server ได้');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="trego-modal-box" style={{ maxWidth: '350px', textAlign: 'center', margin: 'auto', marginTop: '100px' }}>
        <h1 className="trego-logo" style={{ justifyContent: 'center', marginBottom: '20px' }}>
          🐒 Monkey Tour
        </h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>จัดการทัวร์ของคุณได้ง่ายๆ ที่นี่</p>
        
        <form onSubmit={handleSubmit}>
          <div className="trego-form-group" style={{ textAlign: 'left' }}>
            <label className="trego-label">Username</label>
            <input 
              className="trego-input" 
              placeholder="Enter username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required
            />
          </div>
          <div className="trego-form-group" style={{ textAlign: 'left', marginTop: '15px' }}>
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

          {error && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '10px' }}>
              ⚠️ {error}
            </p>
          )}
          
          <button 
            type="submit" 
            className="trego-btn trego-btn-primary" 
            style={{ width: '100%', marginTop: '20px', padding: '10px' }}
            disabled={loading}
          >
            {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '14px' }}>
          <span>ยังไม่มีบัญชี? </span>
          <button 
            type="button" 
            onClick={onShowRegister} 
            style={{ background: 'none', border: 'none', color: '#0f1d45', cursor: 'pointer', fontWeight: '700', textDecoration: 'underline' }}
          >
            สมัครสมาชิกใหม่
          </button>
        </div>
      </div>
    </div>
  );
}