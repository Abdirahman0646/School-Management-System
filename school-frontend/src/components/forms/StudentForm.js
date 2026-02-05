import React, { useState } from 'react';

export default function StudentForm({ onSubmit }) {
  const [form, setForm] = useState({ user_id: '', class: '', section: '', admission_no: '' });

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
        <input className="form-control form-control-sm" name="user_id" placeholder="User ID" value={form.user_id} onChange={handleChange} />
      </div>
      <div className="col-md-3">
        <input className="form-control form-control-sm" name="class" placeholder="Class" value={form.class} onChange={handleChange} />
      </div>
      <div className="col-md-3">
        <input className="form-control form-control-sm" name="section" placeholder="Section" value={form.section} onChange={handleChange} />
      </div>
      <div className="col-md-3">
        <input className="form-control form-control-sm" name="admission_no" placeholder="Admission No" value={form.admission_no} onChange={handleChange} />
      </div>
      <div className="col-12">
        <button className="btn btn-primary btn-sm" type="submit">Add Student</button>
      </div>
    </form>
  );
}
