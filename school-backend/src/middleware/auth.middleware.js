const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: payload.id }, include: Role });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = {
      id: user.id,
      role: user.Role ? user.Role.role_name : null,
      email: user.email
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = { authenticate };
