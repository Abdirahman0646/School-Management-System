const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/rbac.middleware');
const { validate } = require('../middleware/validate.middleware');
const {
  listGrades,
  getGrade,
  createGrade,
  updateGrade,
  deleteGrade
} = require('../controllers/grades.controller');

const router = express.Router();

router.use(authenticate);

router.get('/', authorize(['Admin', 'Teacher', 'Student']), listGrades);
router.get('/:id', authorize(['Admin', 'Teacher', 'Student']), getGrade);

router.post(
  '/',
  authorize(['Admin', 'Teacher']),
  [
    body('student_id').isInt(),
    body('subject').notEmpty(),
    body('term').notEmpty(),
    body('marks').isInt()
  ],
  validate,
  createGrade
);

router.put(
  '/:id',
  authorize(['Admin', 'Teacher']),
  [
    body('subject').optional().notEmpty(),
    body('term').optional().notEmpty(),
    body('marks').optional().isInt()
  ],
  validate,
  updateGrade
);

router.delete('/:id', authorize(['Admin', 'Teacher']), deleteGrade);

module.exports = router;
