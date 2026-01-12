import React from 'react'; // ✅ 1. เพิ่ม import React เข้ามา
import { Navigate } from 'react-router-dom';

// ✅ 2. เปลี่ยน JSX.Element เป็น React.ReactNode
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // เช็คว่ามี Token ในกล่องเก็บของไหม (ทั้งแบบจำและไม่จำ)
  const token = localStorage.getItem('app_token') || sessionStorage.getItem('app_token');

  if (!token) {
    // ⛔ ถ้าไม่มีบัตรผ่าน ให้ถีบส่งไปหน้า Login
    return <Navigate to="/login" replace />;
  }

  // ✅ ถ้ามีบัตรผ่าน ให้ยอมให้แสดงหน้า Home (children)
  return children;
}