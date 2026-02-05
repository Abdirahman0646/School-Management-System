import React, { useState } from 'react';

export default function PaymentForm({ onSubmit }) {
  const [form, setForm] = useState({ student_id: '', amount: '', date: '', status: 'Paid' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-3">
        <input className="form-control form-control-sm" name="student_id" placeholder="Student ID" value={form.student_id} onChange={handleChange} />
      </div>
      <div className="col-md-3">
        <input className="form-control form-control-sm" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
      </div>
      <div className="col-md-3">
        <input className="form-control form-control-sm" name="date" placeholder="YYYY-MM-DD" value={form.date} onChange={handleChange} />
      </div>
      <div className="col-md-3">
        <select className="form-select form-select-sm" name="status" value={form.status} onChange={handleChange}>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>
      <div className="col-12">
        <button className="btn btn-primary btn-sm" type="submit">Add Payment</button>
      </div>
    </form>
  );
}
