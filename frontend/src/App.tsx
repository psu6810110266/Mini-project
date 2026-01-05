import { useState } from 'react';
import LoginForm from './components/LoginForm';
import PackageTour from './PackageTour';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user'>('user');

  const handleLogin = (username: string,role: string) => {
    setUserRole(role as 'admin' | 'user');
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) return <LoginForm onLogin={handleLogin} />;

  return <PackageTour userRole={userRole} onLogout={() => setIsLoggedIn(false)} />;
}

export default App;