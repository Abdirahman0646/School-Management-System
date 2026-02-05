import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './pages/Login';
import OAuthCallback from './pages/OAuthCallback';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AccountantDashboard from './pages/AccountantDashboard';
import PrivateRoute from './routes/PrivateRoute';

export default function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="app-main">
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute roles={['Admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <PrivateRoute roles={['Teacher']}>
              <TeacherDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student"
          element={
            <PrivateRoute roles={['Student']}>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/accountant"
          element={
            <PrivateRoute roles={['Accountant']}>
              <AccountantDashboard />
            </PrivateRoute>
          }
        />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
