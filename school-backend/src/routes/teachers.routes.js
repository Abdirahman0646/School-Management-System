const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/rbac.middleware');
const { validate } = require('../middleware/validate.middleware');
const {
  listTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher
} = require('../controllers/teachers.controller');

const router = express.Router();

router.use(authenticate, authorize(['Admin']));

router.get('/', listTeachers);
router.get('/:id', getTeacher);

router.post(
  '/',
  [
    body('user_id').isInt(),
    body('subject').notEmpty(),
    body('department').notEmpty()
  ],
  validate,
  createTeacher
);

router.put(
  '/:id',
  [
    body('subject').optional().notEmpty(),
    body('department').optional().notEmpty()
  ],
  validate,
  updateTeacher
);

router.delete('/:id', deleteTeacher);

module.exports = router;
