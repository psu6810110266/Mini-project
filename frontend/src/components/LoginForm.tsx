// src/components/LoginForm.tsx
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (username: string, role: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // ใช้ Type React.ChangeEvent ตามโจทย์
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  // ใช้ Type React.FormEvent ตามโจทย์
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // --- จำลองการตรวจสอบ Password (Mock Authentication) ---
    // ในระบบจริงต้องยิง API ไปเช็คที่ Backend
    if (username === 'admin' && password === '1234') {
      onLogin('Admin User', 'admin'); // ล็อกอินเป็น Admin
    } else if (username === 'user' && password === '1234') {
      onLogin('General User', 'user'); // ล็อกอินเป็น User ธรรมดา
    } else {
      alert('Login Failed! ลองใช้ admin/1234 หรือ user/1234');
    }
  };

  return (
    <div style={{ 
      height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', 
      backgroundColor: '#f3f4f6' 
    }}>
      <div style={{ 
        background: 'white', padding: '40px', borderRadius: '10px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '300px' 
      }}>
        <h2 style={{ textAlign: 'center', color: '#4c1d95', marginBottom: '20px' }}>Login System</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={handleUsernameChange}
              placeholder="admin หรือ user"
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="1234"
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <button type="submit" style={{ 
            width: '100%', padding: '10px', background: '#6d28d9', color: 'white', 
            border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
          }}>
            เข้าสู่ระบบ
          </button>
        </form>
        <p style={{marginTop: '10px', fontSize: '12px', color: '#666'}}>
           *Admin: admin / 1234 <br/> *User: user / 1234
        </p>
      </div>
    </div>
  );
}