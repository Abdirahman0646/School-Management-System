const bcrypt = require('bcrypt');
const { User, Role } = require('../models');
const { getPagination } = require('../utils/pagination');

async function listUsers(req, res) {
  const { limit, offset, page } = getPagination(req.query);
  const { rows, count } = await User.findAndCountAll({
    include: Role,
    limit,
    offset,
    order: [['id', 'DESC']]
  });

  return res.json({
    data: rows,
    meta: { page, limit, total: count }
  });
}

async function getUser(req, res) {
  const user = await User.findOne({ where: { id: req.params.id }, include: Role });
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json(user);
}

async function createUser(req, res) {
  const { name, email, password, role_id } = req.body;
  const password_hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password_hash, role_id });
  const result = await User.findOne({ where: { id: user.id }, include: Role });
  return res.status(201).json(result);
}

async function updateUser(req, res) {
  const { name, email, password, role_id } = req.body;
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (name) user.name = name;
  if (email) user.email = email;
  if (role_id) user.role_id = role_id;
  if (password) user.password_hash = await bcrypt.hash(password, 10);

  await user.save();
  const result = await User.findOne({ where: { id: user.id }, include: Role });
  return res.json(result);
}

async function deleteUser(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  await user.destroy();
  return res.status(204).send();
}

module.exports = { listUsers, getUser, createUser, updateUser, deleteUser };
