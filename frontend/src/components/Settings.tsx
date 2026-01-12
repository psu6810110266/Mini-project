import React, { useState } from 'react';

interface SettingsProps {
  onBack?: () => void;
}

export default function Settings({ onBack }: SettingsProps) {
  
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

  const handleSave = () => {
    alert('✅ Settings saved successfully!');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', animation: 'fadeIn 0.5s' }}>
      
      {/* ✅ ส่วนหัว: ปรับให้เหมือนรูป My Bookings */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', // ดันข้อความไปซ้าย ปุ่มไปขวา
        alignItems: 'center', 
        marginBottom: '30px', 
        borderBottom: '1px solid #e2e8f0', // เส้นบางลงตามสไตล์โมเดิร์น
        paddingBottom: '20px' 
      }}>
        
        {/* หัวข้อทางซ้าย */}
        <h2 style={{ color: '#0f1d45', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
          Account Settings
        </h2>

        {/* ปุ่ม Back ทางขวา (ทรงแคปซูล) */}
        {onBack && (
          <button 
            onClick={onBack}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f8fafc', 
              border: '1px solid #cbd5e1', 
              borderRadius: '50px', // ทรงแคปซูล
              padding: '8px 20px', 
              fontSize: '14px', 
              fontWeight: '600',
              color: '#0f1d45', 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#e2e8f0';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>←</span> Back to Home
          </button>
        )}
      </div>

      {/* --- Section 1: Profile (เหมือนเดิม) --- */}
      <div className="settings-card" style={cardStyle}>
        <h3 style={headerStyle}>Profile Information</h3>
        
        <div style={gridStyle}>
          <div>
            <label style={labelStyle}>First Name</label>
            <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Last Name</label>
            <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Email Address</label>
            <input type="email" name="email" value={profile.email} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
             <label style={labelStyle}>Phone Number</label>
             <input type="text" name="phone" value={profile.phone} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div style={{ display: 'flex', gap: '15px', marginTop: '30px', justifyContent: 'flex-end' }}>
        <button onClick={onBack} className="trego-btn" style={{ 
          padding: '12px 30px', fontSize: '16px', border: '1px solid #cbd5e1', 
          color: '#64748b', background: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' 
        }}>
          Cancel
        </button>
        <button onClick={handleSave} className="trego-btn trego-btn-primary" style={{ 
          padding: '12px 30px', fontSize: '16px', background: '#0f1d45', 
          color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(15, 29, 69, 0.2)'
        }}>
          Save Changes
        </button>
      </div>

    </div>
  );
}

// --- Styles (คงเดิม) ---
const cardStyle: React.CSSProperties = {
  background: 'white', padding: '30px', borderRadius: '16px', 
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '25px', border: '1px solid #f1f5f9'
};

const headerStyle: React.CSSProperties = {
  marginTop: 0, marginBottom: '20px', color: '#0f1d45', fontSize: '18px', fontWeight: 'bold'
};

const gridStyle: React.CSSProperties = {
  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'
};

const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#334155'
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 15px', borderRadius: '8px', 
  border: '1px solid #cbd5e1', fontSize: '15px', color: '#0f1d45',
  boxSizing: 'border-box', outline: 'none', transition: 'border 0.2s'
};