module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define(
    'Grade',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      student_id: { type: DataTypes.INTEGER, allowNull: false },
      subject: { type: DataTypes.STRING(100), allowNull: false },
      term: { type: DataTypes.STRING(50), allowNull: false },
      marks: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      tableName: 'grades',
      underscored: true,
      timestamps: false,
      indexes: [{ fields: ['student_id'] }]
    }
  );

  return Grade;
};
