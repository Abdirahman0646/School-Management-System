const { Payment, Student } = require('../models');
const { getPagination } = require('../utils/pagination');

async function listPayments(req, res) {
  const { limit, offset, page } = getPagination(req.query);
  const where = {};

  if (req.user.role === 'Student') {
    const student = await Student.findOne({ where: { user_id: req.user.id } });
    if (!student) return res.json({ data: [], meta: { page, limit, total: 0 } });
    where.student_id = student.id;
  }

  const { rows, count } = await Payment.findAndCountAll({
    where,
    limit,
    offset,
    order: [['date', 'DESC']]
  });

  return res.json({ data: rows, meta: { page, limit, total: count } });
}

async function getPayment(req, res) {
  const payment = await Payment.findByPk(req.params.id);
  if (!payment) return res.status(404).json({ message: 'Payment not found' });

  if (req.user.role === 'Student') {
    const student = await Student.findOne({ where: { user_id: req.user.id } });
    if (!student || payment.student_id !== student.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  return res.json(payment);
}

async function createPayment(req, res) {
  const { student_id, amount, date, status } = req.body;
  const payment = await Payment.create({ student_id, amount, date, status });
  return res.status(201).json(payment);
}

async function updatePayment(req, res) {
  const payment = await Payment.findByPk(req.params.id);
  if (!payment) return res.status(404).json({ message: 'Payment not found' });

  const { amount, date, status } = req.body;
  if (amount !== undefined) payment.amount = amount;
  if (date) payment.date = date;
  if (status) payment.status = status;

  await payment.save();
  return res.json(payment);
}

async function deletePayment(req, res) {
  const payment = await Payment.findByPk(req.params.id);
  if (!payment) return res.status(404).json({ message: 'Payment not found' });
  await payment.destroy();
  return res.status(204).send();
}

module.exports = { listPayments, getPayment, createPayment, updatePayment, deletePayment };
