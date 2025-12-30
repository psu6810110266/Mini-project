// src/App.tsx
import { useState, useEffect } from 'react';
import PackageTourPage from './PackageTour';
import LoginForm from './components/LoginForm';
import './App.css';

// Interface สำหรับเก็บข้อมูล User
interface UserState {
  username: string;
  role: 'admin' | 'user';
}

function App() {
  const [user, setUser] = useState<UserState | null>(null);

  // 1. ตรวจสอบ Token ใน LocalStorage เมื่อเปิดเว็บ (Authentication State)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role') as 'admin' | 'user';
    
    if (token && role) {
      // ถ้ามีของเก่า ให้ Restore สถานะกลับมา
      setUser({ username: 'Restored User', role: role });
    }
  }, []);

  // ฟังก์ชัน Login
  const handleLogin = (username: string, role: string) => {
    // สร้าง Mock Token (JWT ปลอมๆ)
    const mockToken = `jwt-token-${Math.random()}`;
    
    // เก็บลง LocalStorage ตามโจทย์
    localStorage.setItem('token', mockToken);
    localStorage.setItem('role', role);

    setUser({ username, role: role as 'admin' | 'user' });
  };

  // ฟังก์ชัน Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
  };

  // --- ส่วนเลือก View (Conditional Rendering) ---
  if (!user) {
    // Public View: แสดงหน้า Login ถ้ายังไม่เข้าสู่ระบบ
    return <LoginForm onLogin={handleLogin} />;
  }

  // User/Admin View: แสดงหน้าทัวร์ โดยส่ง role เข้าไปคุมปุ่ม
  return (
    <>
      <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000 }}>
        <button 
           onClick={handleLogout}
           style={{ padding: '5px 10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Logout ({user.role})
        </button>
      </div>
      
      {/* ส่ง userRole ไปบอกหน้าทัวร์ว่าใครใช้งานอยู่ */}
      <PackageTourPage userRole={user.role} />
    </>
  );
}

export default App;