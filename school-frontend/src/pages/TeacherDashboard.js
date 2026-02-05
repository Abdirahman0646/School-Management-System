import React, { useEffect, useState } from 'react';
import DataTable from '../components/Table';
import GradeForm from '../components/forms/GradeForm';
import api from '../services/api';

export default function TeacherDashboard() {
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);

  async function loadAll() {
    const [gradesRes, attendanceRes] = await Promise.all([
      api.get('/api/grades'),
      api.get('/api/attendance')
    ]);

    setGrades(gradesRes.data.data || gradesRes.data);
    setAttendance(attendanceRes.data.data || attendanceRes.data);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function addGrade(form) {
    await api.post('/api/grades', form);
    await loadAll();
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <div>
            <h2 className="page-title">Teacher Dashboard</h2>
            <p className="page-subtitle">Record grades and track attendance in one view.</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-outline-primary btn-sm">New Class Note</button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{grades.length}</div>
            <div className="stat-label">Grades Entered</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{attendance.length}</div>
            <div className="stat-label">Attendance Records</div>
          </div>
        </div>

        <div className="section-card">
          <div className="section-header">
            <h5>Grades</h5>
            <span className="section-pill">Assessment</span>
          </div>
          <div className="form-card">
            <GradeForm onSubmit={addGrade} />
          </div>
          <DataTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'student_id', label: 'Student ID' },
              { key: 'subject', label: 'Subject' },
              { key: 'term', label: 'Term' },
              { key: 'marks', label: 'Marks' }
            ]}
            data={grades}
          />
        </div>

        <div className="section-card">
          <div className="section-header">
            <h5>Attendance</h5>
            <span className="section-pill">Daily Log</span>
          </div>
          <DataTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'student_id', label: 'Student ID' },
              { key: 'date', label: 'Date' },
              { key: 'status', label: 'Status' }
            ]}
            data={attendance}
          />
        </div>
      </div>
    </div>
  );
}
