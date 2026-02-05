module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    'Attendance',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      student_id: { type: DataTypes.INTEGER, allowNull: false },
      date: { type: DataTypes.DATEONLY, allowNull: false },
      status: { type: DataTypes.ENUM('Present', 'Absent'), allowNull: false }
    },
    {
      tableName: 'attendance',
      underscored: true,
      timestamps: false,
      indexes: [
        { fields: ['student_id'] },
        { unique: true, fields: ['student_id', 'date'] }
      ]
    }
  );

  return Attendance;
};
