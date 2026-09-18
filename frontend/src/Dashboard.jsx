import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/auth';

function Dashboard({ token, onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Session expired');
        setUser(data.user);
      })
      .catch(onLogout);
  }, [token, onLogout]);

  return (
    <main className="dashboard-shell">
      <p className="eyebrow">GROUP 6 / STUDENT PORTAL</p>
      <p className="panel-kicker">Dashboard</p>
      <h1>{user ? `Welcome, ${user.name}` : 'Loading...'}</h1>
      <p className="dashboard-copy">Your student account is active. This is your private dashboard.</p>
      <button type="button" className="submit-btn dashboard-button" onClick={onLogout}>Logout</button>
    </main>
  );
}

export default Dashboard;
