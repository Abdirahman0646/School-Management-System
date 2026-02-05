import React, { useState } from 'react';

export default function GradeForm({ onSubmit }) {
  const [form, setForm] = useState({ student_id: '', subject: '', term: '', marks: '' });

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
        <input className="form-control form-control-sm" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
      </div>
      <div className="col-md-3">
        <input className="form-control form-control-sm" name="term" placeholder="Term" value={form.term} onChange={handleChange} />
      </div>
      <div className="col-md-3">
        <input className="form-control form-control-sm" name="marks" placeholder="Marks" value={form.marks} onChange={handleChange} />
      </div>
      <div className="col-12">
        <button className="btn btn-primary btn-sm" type="submit">Add Grade</button>
      </div>
    </form>
  );
}
