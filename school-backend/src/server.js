require('dotenv').config();
const app = require('./app');
const { sequelize, Role } = require('./models'); 

const PORT = process.env.PORT || 5000;


async function seedRoles() {
  const roles = ['Student', 'Teacher', 'Accountant', 'Admin'];

  for (let roleName of roles) {
    const [role, created] = await Role.findOrCreate({
      where: { role_name: roleName }
    });
    if (created) console.log(`Role created: ${roleName}`);
  }
}

async function start() {
  try {
   
    await sequelize.authenticate();
    console.log('Database connected successfully!');

   
    await sequelize.sync();

    
    await seedRoles();

    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
