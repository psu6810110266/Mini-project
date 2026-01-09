import React, { useState } from 'react';

interface NavbarProps {
  userRole?: string;
  onLogout?: () => void;
  onOpenBookings?: () => void;
  onGoHome?: () => void;
  // ✅ 1. เพิ่ม onOpenSettings เพื่อรับคำสั่งเปิดหน้าตั้งค่า
  onOpenSettings?: () => void;
}

export default function Navbar({ 
  userRole, 
  onLogout, 
  onOpenBookings, 
  onGoHome,
  onOpenSettings // ✅ รับค่ามา
}: NavbarProps) {
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="trego-navbar" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 30px', 
      background: 'white', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      position: 'relative'
    }}>
      
      {/* --- ส่วนซ้าย: LOGO --- */}
      <a 
        href="/" 
        // ✅ 2. ใส่ onClick ให้ Logo กลับหน้า Home
        onClick={(e) => { e.preventDefault(); onGoHome?.(); }} 
        className="trego-logo" 
        style={{ 
          textDecoration: 'none', 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#0f1d45',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 2 
        }}
      >
        🐒 Monkey Tour
      </a>

      {/* --- ส่วนขวา: ACTIONS --- */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', zIndex: 2 }}>
        
        <button 
          onClick={onOpenBookings}
          style={{
            background: 'white',
            border: '1px solid #e0e7ff',
            borderRadius: '20px',
            padding: '8px 16px',
            cursor: 'pointer',
            color: '#0f1d45',
            fontSize: '13px',
            fontWeight: 'bold',
            display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'}
          onMouseOut={(e) => e.currentTarget.style.background = 'white'}
        >
          My Bookings
        </button>

        {userRole && (
          <span style={{ fontSize: '12px', background: '#e0e7ff', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold', color: '#0f1d45', textTransform: 'uppercase' }}>
            {userRole}
          </span>
        )}

        {/* User Profile Dropdown */}
        <div style={{ position: 'relative' }}>
          <img 
            src="https://i.pinimg.com/736x/13/44/8a/13448a4483f0245f1b27e52341d143b9.jpg" 
            alt="User" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer', border: '2px solid #fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} 
          />

          {isDropdownOpen && (
            <div style={{
              position: 'absolute', top: '50px', right: '0', backgroundColor: 'white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)', borderRadius: '10px', width: '180px',
              overflow: 'hidden', zIndex: 100, animation: 'fadeIn 0.2s ease-out'
            }}>
               <div style={{ padding: '12px 15px', borderBottom: '1px solid #f3f4f6', fontSize: '14px', color: '#666' }}>
                 Signed in as <strong style={{ color: '#0f1d45' }}>{userRole}</strong>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column' }}>
                  
                  {/* ✅ 3. แก้ไขปุ่ม Settings ให้กดได้จริง */}
                  <a 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      setIsDropdownOpen(false); // ปิด dropdown
                      onOpenSettings?.();       // เรียกฟังก์ชันเปิด Settings
                    }} 
                    style={menuItemStyle}
                  >
                    Settings
                  </a>

                  <div style={{ borderTop: '1px solid #f3f4f6', marginTop: '5px' }}>
                    <button onClick={onLogout} style={{ ...menuItemStyle, width: '100%', textAlign: 'left', border: 'none', background: 'transparent', color: '#ef4444', fontWeight: 'bold' }}>
                      Logout
                    </button>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const menuItemStyle: React.CSSProperties = { 
  padding: '10px 15px', textDecoration: 'none', color: '#374151', fontSize: '14px', display: 'block', cursor: 'pointer' 
};