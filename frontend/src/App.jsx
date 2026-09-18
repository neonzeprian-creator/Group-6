import { useCallback, useState } from 'react';
import './App.css';
import Dashboard from './Dashboard.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [token, setToken] = useState(() => localStorage.getItem('jwt_token') || '');

  const navigate = useCallback((nextPath) => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
  }, []);

  const handleLogin = (newToken) => {
    setToken(newToken);
    navigate('/dashboard');
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('jwt_token');
    setToken('');
    navigate('/login');
  }, [navigate]);

  if (path === '/dashboard' && token) {
    return <Dashboard token={token} onLogout={handleLogout} />;
  }

  if (path === '/register') {
    return <Register onLogin={() => navigate('/login')} />;
  }

  return <Login onLogin={handleLogin} onRegister={() => navigate('/register')} />;
}

export default App;
