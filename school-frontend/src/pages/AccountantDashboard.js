import React, { useEffect, useState } from 'react';
import DataTable from '../components/Table';
import PaymentForm from '../components/forms/PaymentForm';
import api from '../services/api';

export default function AccountantDashboard() {
  const [payments, setPayments] = useState([]);

  async function loadAll() {
    const paymentsRes = await api.get('/api/payments');
    setPayments(paymentsRes.data.data || paymentsRes.data);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function addPayment(form) {
    await api.post('/api/payments', form);
    await loadAll();
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <div>
            <h2 className="page-title">Accountant Dashboard</h2>
            <p className="page-subtitle">Track fees, manage payments, and generate invoices.</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-outline-primary btn-sm">Export CSV</button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{payments.length}</div>
            <div className="stat-label">Total Payments</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {payments.filter(p => p.status === 'Paid').length}
            </div>
            <div className="stat-label">Paid</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {payments.filter(p => p.status === 'Unpaid').length}
            </div>
            <div className="stat-label">Unpaid</div>
          </div>
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
          <div className="mt-3">
            <button className="btn btn-primary">Generate Invoice</button>
          </div>
        </div>
      </div>
    </div>
  );
}
