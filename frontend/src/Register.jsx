import { useState } from 'react';

const API_URL = 'http://localhost:3000/api/auth';

function Register({ onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      setMessage('Registration successful. You can now log in.');
      setForm({ name: '', email: '', password: '' });
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
        <h1>Create a student account</h1>
        <p className="brand-copy">Register to keep your student account and academic workspace in one place.</p>
      </section>
      <section className="auth-panel">
        <p className="panel-kicker">Register</p>
        <h2>Create account</h2>
        <p className="panel-copy">Fill in your details to get started.</p>
        {message && <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <input className="auth-input" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
          <input className="auth-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email address" required />
          <input className="auth-input" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
          <button type="submit" className="submit-btn" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</button>
        </form>
        <p className="switch-copy">Already have an account? <button type="button" onClick={onLogin}>Login</button></p>
      </section>
    </main>
  );
}

export default Register;
