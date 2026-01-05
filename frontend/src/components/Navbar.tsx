import React, { useState } from 'react'; // 1. อย่าลืม import useState

interface NavbarProps {
  userRole?: string;
  onLogout?: () => void;
}

export default function Navbar({ userRole, onLogout }: NavbarProps) {
  // 2. สร้าง State สำหรับเปิด/ปิดเมนู
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="trego-navbar">
      <a href="/" className="trego-logo" style={{ textDecoration: 'none' }}>
        🐒 Monkey Tour
      </a>

      <div className="trego-nav-links">
        <a href="#">Home</a>
        <a href="#">Favorited</a>
        <a href="#">Packages</a>
        <a href="#">Contact</a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {userRole && (
          <span style={{ fontSize: '12px', background: '#e0e7ff', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold', color: '#0f1d45', textTransform: 'uppercase' }}>
            {userRole}
          </span>
        )}

        {/* --- ส่วน Dropdown User Profile --- */}
        <div style={{ position: 'relative' }}>
          
          {/* รูปโปรไฟล์ (เป็นปุ่มกดเปิดเมนู) */}
          <img 
            src="https://i.pinimg.com/736x/13/44/8a/13448a4483f0245f1b27e52341d143b9.jpg" 
            alt="User" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // กดเพื่อสลับ เปิด/ปิด
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              objectFit: 'cover', 
              cursor: 'pointer',
              border: '2px solid #fff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }} 
          />

          {/* ตัวเมนูที่จะโผล่ออกมา (Dropdown) */}
          {isDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '50px',
              right: '0',
              backgroundColor: 'white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              borderRadius: '10px',
              width: '180px',
              overflow: 'hidden',
              zIndex: 100,
              animation: 'fadeIn 0.2s ease-out'
            }}>
              {/* ส่วนหัวเมนู */}
              <div style={{ padding: '12px 15px', borderBottom: '1px solid #f3f4f6', fontSize: '14px', color: '#666' }}>
                Signed in as <br/> 
                <strong style={{ color: '#0f1d45' }}>{userRole || 'User'}</strong>
              </div>

              {/* รายการเมนู */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <a href="#" style={menuItemStyle}> Account</a>
                <a href="#" style={menuItemStyle}> Settings</a>
                <a href="#" style={menuItemStyle}> My Bookings</a>
                
                <div style={{ borderTop: '1px solid #f3f4f6', marginTop: '5px' }}>
                  <button 
                    onClick={onLogout}
                    style={{
                      ...menuItemStyle,
                      width: '100%',
                      textAlign: 'left',
                      border: 'none',
                      background: 'transparent',
                      color: '#ef4444',
                      fontWeight: 'bold'
                    }}
                  >
                     Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* ---------------------------------- */}
      </div>
    </nav>
  );
}

// สไตล์สำหรับรายการในเมนู (เพื่อให้โค้ดข้างบนดูสะอาดตา)
const menuItemStyle: React.CSSProperties = {
  padding: '10px 15px',
  textDecoration: 'none',
  color: '#374151',
  fontSize: '14px',
  display: 'block',
  transition: 'background 0.2s',
  cursor: 'pointer'
};