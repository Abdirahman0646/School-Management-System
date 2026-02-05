const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

function signToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
}

async function oauthSuccess(req, res) {
  const token = signToken(req.user);
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const redirectUrl = `${frontendUrl}/oauth/callback?token=${token}`;
  return res.redirect(redirectUrl);
}

async function me(req, res) {
  const user = await User.findOne({ where: { id: req.user.id }, include: Role });
  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.Role ? user.Role.role_name : null
  });
}

module.exports = { oauthSuccess, me };
