const { Student, User } = require('../models');
const { getPagination } = require('../utils/pagination');

async function listStudents(req, res) {
  const { limit, offset, page } = getPagination(req.query);

  const where = {};
  if (req.user.role === 'Student') {
    const student = await Student.findOne({ where: { user_id: req.user.id } });
    if (!student) return res.json({ data: [], meta: { page, limit, total: 0 } });
    where.id = student.id;
  }

  const { rows, count } = await Student.findAndCountAll({
    where,
    include: User,
    limit,
    offset,
    order: [['id', 'DESC']]
  });

  return res.json({ data: rows, meta: { page, limit, total: count } });
}

async function getStudent(req, res) {
  const student = await Student.findOne({ where: { id: req.params.id }, include: User });
  if (!student) return res.status(404).json({ message: 'Student not found' });

  if (req.user.role === 'Student' && student.user_id !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  return res.json(student);
}

async function createStudent(req, res) {
  const { user_id, class: className, section, admission_no } = req.body;
  const student = await Student.create({ user_id, class: className, section, admission_no });
  return res.status(201).json(student);
}

async function updateStudent(req, res) {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });

  const { class: className, section, admission_no } = req.body;
  if (className) student.class = className;
  if (section) student.section = section;
  if (admission_no) student.admission_no = admission_no;

  await student.save();
  return res.json(student);
}

async function deleteStudent(req, res) {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  await student.destroy();
  return res.status(204).send();
}

module.exports = { listStudents, getStudent, createStudent, updateStudent, deleteStudent };
