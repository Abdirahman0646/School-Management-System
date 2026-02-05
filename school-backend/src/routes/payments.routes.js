const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/rbac.middleware');
const { validate } = require('../middleware/validate.middleware');
const {
  listPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment
} = require('../controllers/payments.controller');

const router = express.Router();

router.use(authenticate);

router.get('/', authorize(['Admin', 'Accountant', 'Student']), listPayments);
router.get('/:id', authorize(['Admin', 'Accountant', 'Student']), getPayment);

router.post(
  '/',
  authorize(['Admin', 'Accountant']),
  [
    body('student_id').isInt(),
    body('amount').isFloat({ min: 0 }),
    body('date').notEmpty(),
    body('status').isIn(['Paid', 'Unpaid'])
  ],
  validate,
  createPayment
);

router.put(
  '/:id',
  authorize(['Admin', 'Accountant']),
  [
    body('amount').optional().isFloat({ min: 0 }),
    body('date').optional().notEmpty(),
    body('status').optional().isIn(['Paid', 'Unpaid'])
  ],
  validate,
  updatePayment
);

router.delete('/:id', authorize(['Admin', 'Accountant']), deletePayment);

module.exports = router;
