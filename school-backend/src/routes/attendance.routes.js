const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/rbac.middleware');
const { validate } = require('../middleware/validate.middleware');
const {
  listAttendance,
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance
} = require('../controllers/attendance.controller');

const router = express.Router();

router.use(authenticate);

router.get('/', authorize(['Admin', 'Teacher', 'Student']), listAttendance);
router.get('/:id', authorize(['Admin', 'Teacher', 'Student']), getAttendance);

router.post(
  '/',
  authorize(['Admin', 'Teacher']),
  [
    body('student_id').isInt(),
    body('date').notEmpty(),
    body('status').isIn(['Present', 'Absent'])
  ],
  validate,
  createAttendance
);

router.put(
  '/:id',
  authorize(['Admin', 'Teacher']),
  [
    body('date').optional().notEmpty(),
    body('status').optional().isIn(['Present', 'Absent'])
  ],
  validate,
  updateAttendance
);

router.delete('/:id', authorize(['Admin', 'Teacher']), deleteAttendance);

module.exports = router;
