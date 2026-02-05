const { Grade, Student } = require('../models');
const { getPagination } = require('../utils/pagination');

async function listGrades(req, res) {
  const { limit, offset, page } = getPagination(req.query);
  const where = {};

  if (req.user.role === 'Student') {
    const student = await Student.findOne({ where: { user_id: req.user.id } });
    if (!student) return res.json({ data: [], meta: { page, limit, total: 0 } });
    where.student_id = student.id;
  }

  const { rows, count } = await Grade.findAndCountAll({
    where,
    limit,
    offset,
    order: [['id', 'DESC']]
  });

  return res.json({ data: rows, meta: { page, limit, total: count } });
}

async function getGrade(req, res) {
  const grade = await Grade.findByPk(req.params.id);
  if (!grade) return res.status(404).json({ message: 'Grade not found' });

  if (req.user.role === 'Student') {
    const student = await Student.findOne({ where: { user_id: req.user.id } });
    if (!student || grade.student_id !== student.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  return res.json(grade);
}

async function createGrade(req, res) {
  const { student_id, subject, term, marks } = req.body;
  const grade = await Grade.create({ student_id, subject, term, marks });
  return res.status(201).json(grade);
}

async function updateGrade(req, res) {
  const grade = await Grade.findByPk(req.params.id);
  if (!grade) return res.status(404).json({ message: 'Grade not found' });

  const { subject, term, marks } = req.body;
  if (subject) grade.subject = subject;
  if (term) grade.term = term;
  if (marks !== undefined) grade.marks = marks;

  await grade.save();
  return res.json(grade);
}

async function deleteGrade(req, res) {
  const grade = await Grade.findByPk(req.params.id);
  if (!grade) return res.status(404).json({ message: 'Grade not found' });
  await grade.destroy();
  return res.status(204).send();
}

module.exports = { listGrades, getGrade, createGrade, updateGrade, deleteGrade };
