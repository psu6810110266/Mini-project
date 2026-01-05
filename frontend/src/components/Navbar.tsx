interface NavbarProps {
  userRole?: string;
  onLogout?: () => void;
}

export default function Navbar({ userRole, onLogout }: NavbarProps) {
  return (
    <nav className="trego-navbar">
      {/* --- แก้ไขจุดนี้ครับ --- */}
      {/* 1. เปลี่ยนจาก <div> เป็น <a> */}
      {/* 2. ใส่ href="/" เพื่อให้คลิกแล้วกลับหน้าแรก (Reload) */}
      {/* 3. เพิ่ม style textDecoration: 'none' เพื่อไม่ให้มีขีดเส้นใต้ */}
      <a href="/" className="trego-logo" style={{ textDecoration: 'none' }}>
        🐒 Tour
      </a>
      {/* ---------------------- */}

      <div className="trego-nav-links">
        <a href="#">Home</a>
        <a href="#">Favorited</a>
        <a href="#">Packages</a>
        <a href="#">Booking</a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {userRole && (
          <span style={{ fontSize: '12px', background: '#e0e7ff', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold', color: '#0f1d45', textTransform: 'uppercase' }}>
            {userRole}
          </span>
        )}
        <button onClick={onLogout} style={{ border: 'none', background: 'transparent', color: '#ef4444', fontWeight: '600', cursor: 'pointer' }}>
          Logout
        </button>
        <img src="https://i.pinimg.com/736x/13/44/8a/13448a4483f0245f1b27e52341d143b9.jpg" alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
      </div>
    </nav>
  );
}