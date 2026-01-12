import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import LoginForm from './components/LoginForm';
import RegisterModal from './components/RegisterModal';
import PackageTour from './PackageTour';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  // เรายังคง state นี้ไว้ สำหรับเปิด Modal ในหน้า Login
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* -------------------------------------------
            📍 เส้นทางที่ 1: หน้า Login (Public) 
           ------------------------------------------- */}
        <Route 
          path="/login" 
          element={
            <>
              {/* ส่ง props ไปให้ LoginForm ใช้เปิด Modal */}
              <LoginForm onShowRegister={() => setIsModalOpen(true)} />
              
              {/* แสดง Modal ซ้อนทับ ถ้า state เป็น true */}
              {isModalOpen && (
                <RegisterModal onClose={() => setIsModalOpen(false)} />
              )}
            </>
          } 
        />

        {/* -------------------------------------------
            📍 เส้นทางที่ 2: หน้า Home / PackageTour (Private)
            ต้องผ่านด่าน ProtectedRoute ก่อนถึงจะเข้าได้
           ------------------------------------------- */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              {/* ไม่ต้องส่ง props userRole/onLogout แล้ว (ให้ PackageTour จัดการเอง) */}
              <PackageTour />
            </ProtectedRoute>
          } 
        />

        {/* -------------------------------------------
            📍 เส้นทางอื่นๆ (Redirect)
            ถ้าพิมพ์มั่ว หรือเข้าหน้าแรก (/) ให้ดีดไป /home
            (เดี๋ยวยาม ProtectedRoute จะเช็คเองว่าต้อง Login ไหม)
           ------------------------------------------- */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;