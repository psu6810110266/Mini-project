import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterModal from './components/RegisterModal';
import PackageTour from './PackageTour';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [userRole, setUserRole] = useState<'admin' | 'user'>('user');

  const handleLogin = (username: string, role: string) => {
    setUserRole(role as 'admin' | 'user');
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <>
        <LoginForm 
          onLogin={handleLogin} 
          onShowRegister={() => setIsModalOpen(true)} 
        />
        {/* แสดง Pop-up เมื่อกดปุ่ม Register */}
        {isModalOpen && (
          <RegisterModal onClose={() => setIsModalOpen(false)} />
        )}
      </>
    );
  }

  return (
    <PackageTour 
      userRole={userRole} 
      onLogout={() => setIsLoggedIn(false)} 
    />
  );
}

export default App;