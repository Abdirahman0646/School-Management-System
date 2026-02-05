module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define(
    'Teacher',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      subject: { type: DataTypes.STRING(100), allowNull: false },
      department: { type: DataTypes.STRING(100), allowNull: false }
    },
    {
      tableName: 'teachers',
      underscored: true,
      timestamps: false,
      indexes: [{ fields: ['user_id'] }]
    }
  );

  return Teacher;
};
