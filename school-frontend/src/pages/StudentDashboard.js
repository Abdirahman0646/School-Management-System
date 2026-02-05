import React, { useEffect, useState } from 'react';
import DataTable from '../components/Table';
import api from '../services/api';

export default function StudentDashboard() {
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    async function loadAll() {
      const [gradesRes, attendanceRes] = await Promise.all([
        api.get('/api/grades'),
        api.get('/api/attendance')
      ]);

      setGrades(gradesRes.data.data || gradesRes.data);
      setAttendance(attendanceRes.data.data || attendanceRes.data);
    }

    loadAll();
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <div>
            <h2 className="page-title">Student Dashboard</h2>
            <p className="page-subtitle">Your progress and attendance at a glance.</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{grades.length}</div>
            <div className="stat-label">Grades</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{attendance.length}</div>
            <div className="stat-label">Attendance Records</div>
          </div>
        </div>

        <div className="section-card">
          <div className="section-header">
            <h5>Your Grades</h5>
            <span className="section-pill">Term View</span>
          </div>
          <DataTable
            columns={[
              { key: 'subject', label: 'Subject' },
              { key: 'term', label: 'Term' },
              { key: 'marks', label: 'Marks' }
            ]}
            data={grades}
          />
        </div>

        <div className="section-card">
          <div className="section-header">
            <h5>Your Attendance</h5>
            <span className="section-pill">Summary</span>
          </div>
          <DataTable
            columns={[
              { key: 'date', label: 'Date' },
              { key: 'status', label: 'Status' }
            ]}
            data={attendance}
          />
        </div>

        <div className="section-card">
          <div className="section-header">
            <h5>Timetable</h5>
            <span className="section-pill">Weekly</span>
          </div>
          <ul className="list-group list-group-flush timetable-list">
            <li className="list-group-item">Mon: Math, Science, History</li>
            <li className="list-group-item">Tue: English, Math, Art</li>
            <li className="list-group-item">Wed: Science, PE, Math</li>
            <li className="list-group-item">Thu: History, English, Computer</li>
            <li className="list-group-item">Fri: Math, Science, Library</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
