import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f1d45', color: '#fff', paddingTop: '60px', marginTop: 'auto' }}>
      <div className="trego-container" style={{ paddingBottom: '40px' }}>
        
        {/* Grid Layout: ใช้ Flexbox เพื่อให้รองรับมือถือ (Wrap) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px' }}>
          
          {/* Column 1: Brand Info */}
          <div style={{ flex: '1 1 250px' }}>
            <h2 style={{ fontSize: '24px', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              🐒 Monkey Tour
            </h2>
            <p style={{ color: '#a0aec0', lineHeight: '1.6', fontSize: '14px' }}>
              We provide the best travel experiences in Thailand. 
              Explore mountains, beaches, and culture with our professional guides.
              Safe, Fun, and Memorable.
            </p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
              {/* Social Icons (สมมติ) */}
              <SocialIcon>FB</SocialIcon>
              <SocialIcon>IG</SocialIcon>
              <SocialIcon>TW</SocialIcon>
              <SocialIcon>YT</SocialIcon>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div style={{ flex: '1 1 150px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '20px', color: '#fff' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <FooterLink to="/home">Home</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/blog">Travel Blog</FooterLink>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div style={{ flex: '1 1 150px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '20px', color: '#fff' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <FooterLink to="/faq">Help Center</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/contact">Contact Support</FooterLink>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '20px', color: '#fff' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: '#a0aec0', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📍</span> 123 Hatyai, Songkla, Thailand
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📞</span> +66 9 999 9999
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📧</span> support@monkeytour.com
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{ borderTop: '1px solid #2d3748', padding: '20px 0', textAlign: 'center' }}>
        <p style={{ margin: 0, color: '#718096', fontSize: '13px' }}>
          &copy; {new Date().getFullYear()} Monkey Tour Co., Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// --- Sub Components เล็กๆ เพื่อลดโค้ดซ้ำ ---

function FooterLink({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <li style={{ marginBottom: '12px' }}>
      <Link 
        to={to} 
        style={{ color: '#a0aec0', textDecoration: 'none', transition: 'color 0.2s', fontSize: '14px' }}
        onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
        onMouseOut={(e) => e.currentTarget.style.color = '#a0aec0'}
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <div 
      style={{ 
        width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', 
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '12px', cursor: 'pointer', color: '#fff'
      }}
      onMouseOver={(e) => e.currentTarget.style.background = '#3b82f6'}
      onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
    >
      {children}
    </div>
  );
}