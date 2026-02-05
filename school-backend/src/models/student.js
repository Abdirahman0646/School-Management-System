module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'Student',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      class: { type: DataTypes.STRING(50), allowNull: false },
      section: { type: DataTypes.STRING(10), allowNull: false },
      admission_no: { type: DataTypes.STRING(50), allowNull: false, unique: true }
    },
    {
      tableName: 'students',
      underscored: true,
      timestamps: false,
      indexes: [
        { fields: ['user_id'] },
        { fields: ['class'] },
        { fields: ['admission_no'] }
      ]
    }
  );

  return Student;
};
