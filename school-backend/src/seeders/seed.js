require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize, Role, User, Student, Teacher, Class, Payment, Grade, Attendance } = require('../models');

async function seed() {
  await sequelize.sync({ force: true });

  const roles = await Role.bulkCreate([
    { role_name: 'Admin' },
    { role_name: 'Teacher' },
    { role_name: 'Student' },
    { role_name: 'Accountant' }
  ]);

  const roleMap = roles.reduce((acc, r) => {
    acc[r.role_name] = r.id;
    return acc;
  }, {});

  const password_hash = await bcrypt.hash('Password123', 10);

  const admins = Array.from({ length: 10 }).map((_, i) => ({
    name: `Admin ${i + 1}`,
    email: `admin${i + 1}@school.local`,
    password_hash,
    role_id: roleMap.Admin
  }));

  const teachers = Array.from({ length: 10 }).map((_, i) => ({
    name: `Teacher ${i + 1}`,
    email: `teacher${i + 1}@school.local`,
    password_hash,
    role_id: roleMap.Teacher
  }));

  const students = Array.from({ length: 10 }).map((_, i) => ({
    name: `Student ${i + 1}`,
    email: `student${i + 1}@school.local`,
    password_hash,
    role_id: roleMap.Student
  }));

  const accountants = Array.from({ length: 10 }).map((_, i) => ({
    name: `Accountant ${i + 1}`,
    email: `accountant${i + 1}@school.local`,
    password_hash,
    role_id: roleMap.Accountant
  }));

  const userRecords = await User.bulkCreate([
    ...admins,
    ...teachers,
    ...students,
    ...accountants
  ]);

  await Class.bulkCreate([
    { class_name: 'Grade 1', section: 'A' },
    { class_name: 'Grade 2', section: 'B' },
    { class_name: 'Grade 3', section: 'C' }
  ]);

  const studentUsers = userRecords.filter(u => u.role_id === roleMap.Student);
  const teacherUsers = userRecords.filter(u => u.role_id === roleMap.Teacher);

  await Student.bulkCreate(
    studentUsers.map((u, i) => ({
      user_id: u.id,
      class: i % 3 === 0 ? 'Grade 1' : i % 3 === 1 ? 'Grade 2' : 'Grade 3',
      section: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C',
      admission_no: `ADM-${1000 + i}`
    }))
  );

  await Teacher.bulkCreate(
    teacherUsers.map((u, i) => ({
      user_id: u.id,
      subject: i % 2 === 0 ? 'Math' : 'Science',
      department: i % 2 === 0 ? 'STEM' : 'Science'
    }))
  );

  const allStudents = await Student.findAll();

  await Payment.bulkCreate(
    allStudents.map((s, i) => ({
      student_id: s.id,
      amount: 1500 + i * 10,
      date: '2026-02-01',
      status: i % 2 === 0 ? 'Paid' : 'Unpaid'
    }))
  );

  await Grade.bulkCreate(
    allStudents.map((s, i) => ({
      student_id: s.id,
      subject: 'Math',
      term: 'Term 1',
      marks: 70 + (i % 30)
    }))
  );

  await Attendance.bulkCreate(
    allStudents.map((s, i) => ({
      student_id: s.id,
      date: '2026-02-01',
      status: i % 3 === 0 ? 'Absent' : 'Present'
    }))
  );

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
