import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (username: string, role: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') onLogin('Admin', 'admin');
    else if (username === 'user' && password === '1234') onLogin('User', 'user');
    else setError('Invalid credentials. Try admin/1234');
  };

  return (
    <div className="login-bg">
      <div className="trego-modal-box" style={{ maxWidth: '350px', textAlign: 'center' }}>
        <h1 className="trego-logo" style={{ justifyContent: 'center', marginBottom: '20px' }}>🐒 Tour</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>Welcome back! Please login.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="trego-form-group">
            <input className="trego-input" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="trego-form-group">
            <input className="trego-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
          <button type="submit" className="trego-btn trego-btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#999', background: '#f9fafb', padding: '10px', borderRadius: '8px' }}>
          Admin: <b>admin/1234</b> | User: <b>user/1234</b>
        </div>
      </div>
    </div>
  );
}