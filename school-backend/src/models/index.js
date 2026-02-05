const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Role = require('./role')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);
const Student = require('./student')(sequelize, DataTypes);
const Teacher = require('./teacher')(sequelize, DataTypes);
const Class = require('./class')(sequelize, DataTypes);
const Attendance = require('./attendance')(sequelize, DataTypes);
const Grade = require('./grade')(sequelize, DataTypes);
const Payment = require('./payment')(sequelize, DataTypes);

Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

User.hasOne(Student, { foreignKey: 'user_id' });
Student.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Teacher, { foreignKey: 'user_id' });
Teacher.belongsTo(User, { foreignKey: 'user_id' });

Class.hasMany(Student, { foreignKey: 'class', sourceKey: 'class_name' });
Student.belongsTo(Class, { foreignKey: 'class', targetKey: 'class_name' });

Student.hasMany(Attendance, { foreignKey: 'student_id' });
Attendance.belongsTo(Student, { foreignKey: 'student_id' });

Student.hasMany(Grade, { foreignKey: 'student_id' });
Grade.belongsTo(Student, { foreignKey: 'student_id' });

Student.hasMany(Payment, { foreignKey: 'student_id' });
Payment.belongsTo(Student, { foreignKey: 'student_id' });

module.exports = {
  sequelize,
  Role,
  User,
  Student,
  Teacher,
  Class,
  Attendance,
  Grade,
  Payment
};
