import React, { useEffect, useState } from 'react';
import DataTable from '../components/Table';
import StudentForm from '../components/forms/StudentForm';
import TeacherForm from '../components/forms/TeacherForm';
import PaymentForm from '../components/forms/PaymentForm';
import api from '../services/api';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [payments, setPayments] = useState([]);

  async function loadAll() {
    const [usersRes, studentsRes, teachersRes, paymentsRes] = await Promise.all([
      api.get('/api/users'),
      api.get('/api/students'),
      api.get('/api/teachers'),
      api.get('/api/payments')
    ]);

    setUsers(usersRes.data.data || usersRes.data);
    setStudents(studentsRes.data.data || studentsRes.data);
    setTeachers(teachersRes.data.data || teachersRes.data);
    setPayments(paymentsRes.data.data || paymentsRes.data);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function addStudent(form) {
    await api.post('/api/students', form);
    await loadAll();
  }

  async function addTeacher(form) {
    await api.post('/api/teachers', form);
    await loadAll();
  }

  async function addPayment(form) {
    await api.post('/api/payments', form);
    await loadAll();
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <div>
            <h2 className="page-title">Admin Dashboard</h2>
            <p className="page-subtitle">Manage users, classes, staff, and payments.</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-outline-primary btn-sm">Export Report</button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{users.length}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{students.length}</div>
            <div className="stat-label">Students</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{teachers.length}</div>
            <div className="stat-label">Teachers</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{payments.length}</div>
            <div className="stat-label">Payments</div>
          </div>
        </div>

        <div className="section-card">
          <div className="section-header">
            <h5>Users</h5>
            <span className="section-pill">Directory</span>
          </div>
          <DataTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' }
            ]}
            data={users}
          />
        </div>

        <div className="section-card">
          <div className="section-header">
            <h5>Students</h5>
            <span className="section-pill">Admissions</span>
          </div>
          <div className="form-card">
            <StudentForm onSubmit={addStudent} />
          </div>
          <DataTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'user_id', label: 'User ID' },
              { key: 'class', label: 'Class' },
              { key: 'section', label: 'Section' },
              { key: 'admission_no', label: 'Admission No' }
            ]}
            data={students}
          />
        </div>

        <div className="section-card">
          <div className="section-header">
            <h5>Teachers</h5>
            <span className="section-pill">Faculty</span>
          </div>
          <div className="form-card">
            <TeacherForm onSubmit={addTeacher} />
          </div>
          <DataTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'user_id', label: 'User ID' },
              { key: 'subject', label: 'Subject' },
              { key: 'department', label: 'Department' }
            ]}
            data={teachers}
          />
        </div>

        <div className="section-card">
          <div className="section-header">
            <h5>Payments</h5>
            <span className="section-pill">Finance</span>
          </div>
          <div className="form-card">
            <PaymentForm onSubmit={addPayment} />
          </div>
          <DataTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'student_id', label: 'Student ID' },
              { key: 'amount', label: 'Amount' },
              { key: 'date', label: 'Date' },
              { key: 'status', label: 'Status' }
            ]}
            data={payments}
          />
        </div>
      </div>
    </div>
  );
}
