# School Management System

A full‑stack, role‑based school management system built with **Node.js (Express + Sequelize + MySQL)** and **React + Bootstrap**. It supports Admin, Teacher, Student, and Accountant roles with Google OAuth 2.0 authentication.

## Features
- Google OAuth 2.0 login
- Role‑based access control (Admin, Teacher, Student, Accountant)
- CRUD APIs for Users, Students, Teachers, Grades, Attendance, Payments
- Pagination for large datasets
- Modern React UI with role dashboards
- Light/Dark mode toggle
- Seed data for local testing

## Project Structure
```
C:\School System\
  school-backend\
  school-frontend\
```

## Backend (Node.js + Express)
**Location:** `school-backend/`

### Tech
- Express
- Sequelize ORM
- MySQL
- Passport Google OAuth 2.0
- JWT auth
- bcrypt

### Setup
1. Install dependencies:
   ```bash
   cd school-backend
   npm install
   ```
2. Create a `.env` file from `.env.example`:
   ```bash
   copy .env.example .env
   ```
3. Update `.env` with your MySQL credentials and Google OAuth keys.

### Run
```bash
npm run dev
```

### Seed (optional)
This recreates tables and inserts sample users and data:
```bash
npm run seed
```

### API Base URL
```
http://localhost:5000
```

### OAuth Callback
Make sure your Google Console OAuth redirect matches:
```
http://localhost:5000/api/auth/google/callback
```

## Frontend (React + Bootstrap)
**Location:** `school-frontend/`

### Setup
1. Install dependencies:
   ```bash
   cd school-frontend
   npm install
   ```
2. Create a `.env` file from `.env.example`:
   ```bash
   copy .env.example .env
   ```

### Run
```bash
npm start
```

### Frontend URL
```
http://localhost:3000
```

## Roles & Access
- **Admin:** Full system access, manages users, teachers, students, payments
- **Teacher:** Manages grades and attendance
- **Student:** Views grades and attendance
- **Accountant:** Manages payments and invoices

## Notes
- OAuth users are auto‑created if they don’t exist and default to the Student role.
- Auth state is stored in a shared context to keep navbar and dashboards in sync.

## Scripts
**Backend**
- `npm run dev` – start API server with nodemon
- `npm run seed` – seed database

**Frontend**
- `npm start` – run React dev server


## License
MIT (or replace with your preferred license)
