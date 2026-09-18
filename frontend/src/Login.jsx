import { useState } from 'react';

const API_URL = 'http://localhost:3000/api/auth';

function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('jwt_token', data.token);
      onLogin(data.token);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="brand-panel">
        <p className="eyebrow">GROUP 6 / STUDENT PORTAL</p>
        <h1>Student account access</h1>
        <p className="brand-copy">Sign in to manage your student account and access your academic workspace.</p>
      </section>
      <section className="auth-panel">
        <p className="panel-kicker">Login</p>
        <h2>Welcome back</h2>
        <p className="panel-copy">Enter your account details to continue.</p>
        {message && <p className="message error">{message}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <input className="auth-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" required />
          <input className="auth-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required />
          <button type="submit" className="submit-btn" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
        </form>
        <p className="switch-copy">Do not have an account? <button type="button" onClick={onRegister}>Register</button></p>
      </section>
    </main>
  );
}

export default Login;
