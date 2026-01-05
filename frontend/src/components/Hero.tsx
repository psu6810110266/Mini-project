export default function Hero() {
  return (
    <div className="trego-hero">
      <div className="trego-overlay"></div>
      <div className="trego-hero-content">
        <h1 className="trego-hero-title">Discover Your Next Adventure</h1>
        <p className="trego-hero-subtitle">Explore the world with our premium tour packages.</p>
        
        {/* Search Box จำลอง */}
        <div style={{ background: 'white', padding: '10px', borderRadius: '50px', display: 'flex', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>
          <input type="text" placeholder="Where do you want to go?" style={{ border: 'none', padding: '10px 20px', flex: 1, borderRadius: '50px', outline: 'none' }} />
          <button className="trego-btn trego-btn-primary">Search</button>
        </div>
      </div>
    </div>
  );
}