import React from 'react';

export default function Login() {
  const oauthUrl = process.env.REACT_APP_OAUTH_URL || 'http://localhost:5000/api/auth/google';

  return (
    <div className="login-screen">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <div className="hero-card">
              <div className="hero-badge">Secure • Role-based • Modern</div>
              <h1 className="hero-title">School Management System</h1>
              <p className="hero-subtitle">
                Streamline academics, attendance, and finance with one unified platform.
              </p>
              <div className="hero-stats">
                <div>
                  <div className="stat-value">1000+</div>
                  <div className="stat-label">Users Supported</div>
                </div>
                <div>
                  <div className="stat-value">4</div>
                  <div className="stat-label">Role Dashboards</div>
                </div>
                <div>
                  <div className="stat-value">24/7</div>
                  <div className="stat-label">Secure Access</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card login-card shadow-lg">
              <div className="card-body">
                <h3 className="mb-2">Welcome back</h3>
                <p className="text-muted">Sign in with Google to continue.</p>
                <a className="btn btn-primary btn-lg w-100" href={oauthUrl}>
                  Continue with Google
                </a>
                <div className="login-footer">
                  By continuing you agree to the school data policies.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
