import React, { useState } from 'react';

export default function TeacherForm({ onSubmit }) {
  const [form, setForm] = useState({ user_id: '', subject: '', department: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-4">
        <input className="form-control form-control-sm" name="user_id" placeholder="User ID" value={form.user_id} onChange={handleChange} />
      </div>
      <div className="col-md-4">
        <input className="form-control form-control-sm" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
      </div>
      <div className="col-md-4">
        <input className="form-control form-control-sm" name="department" placeholder="Department" value={form.department} onChange={handleChange} />
      </div>
      <div className="col-12">
        <button className="btn btn-primary btn-sm" type="submit">Add Teacher</button>
      </div>
    </form>
  );
}
