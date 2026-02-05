import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken } from '../services/auth';
import { useAuth } from '../hooks/useAuth';

export default function NavBar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem('sms_theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('sms_theme', theme);
  }, [theme]);

  function logout() {
    clearToken();
    setUser(null);
    navigate('/');
  }

  function toggleTheme() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-dot" />
          School System
        </Link>
        <div className="collapse navbar-collapse show">
          {user ? (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {user.role === 'Admin' && (
                  <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
                )}
                {user.role === 'Teacher' && (
                  <li className="nav-item"><Link className="nav-link" to="/teacher">Teacher</Link></li>
                )}
                {user.role === 'Student' && (
                  <li className="nav-item"><Link className="nav-link" to="/student">Student</Link></li>
                )}
                {user.role === 'Accountant' && (
                  <li className="nav-item"><Link className="nav-link" to="/accountant">Accountant</Link></li>
                )}
              </ul>
              <div className="d-flex align-items-center gap-2">
                <span className="navbar-text me-2">{user.name} ({user.role})</span>
                <button className="btn btn-outline-light btn-sm" onClick={toggleTheme}>
                  {theme === 'light' ? 'Dark mode' : 'Light mode'}
                </button>
                <button className="btn btn-outline-light btn-sm" onClick={logout}>Logout</button>
              </div>
            </>
          ) : (
            <div className="ms-auto d-flex align-items-center gap-2">
              <button className="btn btn-outline-light btn-sm" onClick={toggleTheme}>
                {theme === 'light' ? 'Dark mode' : 'Light mode'}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
