import { useState } from 'react';

export default function Settings() {
  // จำลอง State สำหรับข้อมูล User
  const [profile, setProfile] = useState({
    firstName: 'Monkey',
    lastName: 'Admin',
    email: 'admin@monkeytour.com',
    phone: '081-234-5678',
    language: 'English',
    notifications: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setProfile(prev => ({ ...prev, notifications: !prev.notifications }));
  };

  const handleSave = () => {
    alert('✅ Settings saved successfully!');
    // ตรงนี้ถ้ามี backend ก็จะยิง API update user
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', animation: 'fadeIn 0.5s' }}>
      
      <h2 style={{ color: '#0f1d45', fontSize: '28px', marginBottom: '30px', borderBottom: '2px solid #e2e8f0', paddingBottom: '15px' }}>
        ⚙️ Account Settings
      </h2>

      {/* --- Section 1: Profile --- */}
      <div className="settings-card" style={cardStyle}>
        <h3 style={headerStyle}>Profile Information</h3>
        
        <div style={gridStyle}>
          <div>
            <label style={labelStyle}>First Name</label>
            <input 
              type="text" 
              name="firstName" 
              value={profile.firstName} 
              onChange={handleChange} 
              style={inputStyle} 
            />
          </div>
          <div>
            <label style={labelStyle}>Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              value={profile.lastName} 
              onChange={handleChange} 
              style={inputStyle} 
            />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={profile.email} 
              onChange={handleChange} 
              style={inputStyle} 
            />
          </div>
          <div>
             <label style={labelStyle}>Phone Number</label>
             <input type="text" name="phone" value={profile.phone} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
      </div>

      {/* --- Section 2: Preferences --- */}
      <div className="settings-card" style={cardStyle}>
        <h3 style={headerStyle}>Preferences</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Language</label>
          <select name="language" value={profile.language} onChange={handleChange} style={inputStyle}>
            <option value="English">English</option>
            <option value="Thai">Thai (ภาษาไทย)</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0', borderTop: '1px solid #f1f5f9' }}>
          <div>
            <div style={{ fontWeight: 'bold', color: '#334155' }}>Email Notifications</div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Receive updates about your bookings and promotions.</div>
          </div>
          
          <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
            <input 
              type="checkbox" 
              checked={profile.notifications} 
              onChange={handleToggle}
              style={{ opacity: 0, width: 0, height: 0 }} 
            />
            <span style={{ 
              position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, 
              backgroundColor: profile.notifications ? '#0f1d45' : '#ccc', 
              borderRadius: '34px', transition: '.4s' 
            }}>
              <span style={{ 
                position: 'absolute', content: '""', height: '16px', width: '16px', left: '4px', bottom: '4px', 
                backgroundColor: 'white', borderRadius: '50%', transition: '.4s',
                transform: profile.notifications ? 'translateX(26px)' : 'translateX(0)'
              }}></span>
            </span>
          </label>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
        <button onClick={handleSave} className="trego-btn trego-btn-primary" style={{ padding: '12px 30px', fontSize: '16px' }}>
          Save Changes
        </button>
        <button className="trego-btn" style={{ border: '1px solid #cbd5e1', color: '#64748b' }}>
          Cancel
        </button>
      </div>

    </div>
  );
}

// --- Styles ---
const cardStyle: React.CSSProperties = {
  background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '25px'
};

const headerStyle: React.CSSProperties = {
  marginTop: 0, marginBottom: '20px', color: '#0f1d45', fontSize: '18px'
};

const gridStyle: React.CSSProperties = {
  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'
};

const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#334155'
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', color: '#0f1d45',
  boxSizing: 'border-box' // สำคัญเพื่อให้ padding ไม่ดัน width เกิน
};