const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/rbac.middleware');
const { validate } = require('../middleware/validate.middleware');
const {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');

const router = express.Router();

router.use(authenticate, authorize(['Admin']));

router.get('/', listUsers);
router.get('/:id', getUser);

router.post(
  '/',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('role_id').isInt()
  ],
  validate,
  createUser
);

router.put(
  '/:id',
  [
    body('email').optional().isEmail(),
    body('password').optional().isLength({ min: 6 }),
    body('role_id').optional().isInt()
  ],
  validate,
  updateUser
);

router.delete('/:id', deleteUser);

module.exports = router;
