import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setToken } from '../services/auth';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function OAuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    async function handleCallback() {
      const token = params.get('token');
      if (!token) {
        navigate('/');
        return;
      }

      setToken(token);
      const { data } = await api.get('/api/auth/me');
      setUser(data);

      if (data.role === 'Admin') navigate('/admin');
      else if (data.role === 'Teacher') navigate('/teacher');
      else if (data.role === 'Accountant') navigate('/accountant');
      else navigate('/student');
    }

    handleCallback().catch(() => navigate('/'));
  }, [params, navigate, setUser]);

  return (
    <div className="container mt-5">
      <div className="card card-soft p-4 text-center">
        <h4 className="mb-2">Signing you in</h4>
        <p className="text-muted mb-0">Please wait while we verify your account.</p>
      </div>
    </div>
  );
}
