const { Attendance, Student } = require('../models');
const { getPagination } = require('../utils/pagination');

async function listAttendance(req, res) {
  const { limit, offset, page } = getPagination(req.query);
  const where = {};

  if (req.user.role === 'Student') {
    const student = await Student.findOne({ where: { user_id: req.user.id } });
    if (!student) return res.json({ data: [], meta: { page, limit, total: 0 } });
    where.student_id = student.id;
  }

  const { rows, count } = await Attendance.findAndCountAll({
    where,
    limit,
    offset,
    order: [['date', 'DESC']]
  });

  return res.json({ data: rows, meta: { page, limit, total: count } });
}

async function getAttendance(req, res) {
  const record = await Attendance.findByPk(req.params.id);
  if (!record) return res.status(404).json({ message: 'Attendance not found' });

  if (req.user.role === 'Student') {
    const student = await Student.findOne({ where: { user_id: req.user.id } });
    if (!student || record.student_id !== student.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  return res.json(record);
}

async function createAttendance(req, res) {
  const { student_id, date, status } = req.body;
  const record = await Attendance.create({ student_id, date, status });
  return res.status(201).json(record);
}

async function updateAttendance(req, res) {
  const record = await Attendance.findByPk(req.params.id);
  if (!record) return res.status(404).json({ message: 'Attendance not found' });

  const { date, status } = req.body;
  if (date) record.date = date;
  if (status) record.status = status;

  await record.save();
  return res.json(record);
}

async function deleteAttendance(req, res) {
  const record = await Attendance.findByPk(req.params.id);
  if (!record) return res.status(404).json({ message: 'Attendance not found' });
  await record.destroy();
  return res.status(204).send();
}

module.exports = { listAttendance, getAttendance, createAttendance, updateAttendance, deleteAttendance };
