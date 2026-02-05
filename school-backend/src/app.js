const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const studentsRoutes = require('./routes/students.routes');
const teachersRoutes = require('./routes/teachers.routes');
const gradesRoutes = require('./routes/grades.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const paymentsRoutes = require('./routes/payments.routes');
const { errorHandler } = require('./middleware/error.middleware');

require('./config/passport');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/grades', gradesRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payments', paymentsRoutes);

app.use(errorHandler);

module.exports = app;
