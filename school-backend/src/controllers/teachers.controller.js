const { Teacher, User } = require('../models');
const { getPagination } = require('../utils/pagination');

async function listTeachers(req, res) {
  const { limit, offset, page } = getPagination(req.query);
  const { rows, count } = await Teacher.findAndCountAll({
    include: User,
    limit,
    offset,
    order: [['id', 'DESC']]
  });
  return res.json({ data: rows, meta: { page, limit, total: count } });
}

async function getTeacher(req, res) {
  const teacher = await Teacher.findOne({ where: { id: req.params.id }, include: User });
  if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
  return res.json(teacher);
}

async function createTeacher(req, res) {
  const { user_id, subject, department } = req.body;
  const teacher = await Teacher.create({ user_id, subject, department });
  return res.status(201).json(teacher);
}

async function updateTeacher(req, res) {
  const teacher = await Teacher.findByPk(req.params.id);
  if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

  const { subject, department } = req.body;
  if (subject) teacher.subject = subject;
  if (department) teacher.department = department;

  await teacher.save();
  return res.json(teacher);
}

async function deleteTeacher(req, res) {
  const teacher = await Teacher.findByPk(req.params.id);
  if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
  await teacher.destroy();
  return res.status(204).send();
}

module.exports = { listTeachers, getTeacher, createTeacher, updateTeacher, deleteTeacher };
