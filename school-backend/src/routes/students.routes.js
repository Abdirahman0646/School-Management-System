const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/rbac.middleware');
const { validate } = require('../middleware/validate.middleware');
const {
  listStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/students.controller');

const router = express.Router();

router.use(authenticate);

router.get('/', authorize(['Admin', 'Teacher', 'Student']), listStudents);
router.get('/:id', authorize(['Admin', 'Teacher', 'Student']), getStudent);

router.post(
  '/',
  authorize(['Admin']),
  [
    body('user_id').isInt(),
    body('class').notEmpty(),
    body('section').notEmpty(),
    body('admission_no').notEmpty()
  ],
  validate,
  createStudent
);

router.put(
  '/:id',
  authorize(['Admin']),
  [
    body('class').optional().notEmpty(),
    body('section').optional().notEmpty(),
    body('admission_no').optional().notEmpty()
  ],
  validate,
  updateStudent
);

router.delete('/:id', authorize(['Admin']), deleteStudent);

module.exports = router;
