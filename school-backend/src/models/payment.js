module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    'Payment',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      student_id: { type: DataTypes.INTEGER, allowNull: false },
      amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      date: { type: DataTypes.DATEONLY, allowNull: false },
      status: { type: DataTypes.ENUM('Paid', 'Unpaid'), allowNull: false }
    },
    {
      tableName: 'payments',
      underscored: true,
      timestamps: false,
      indexes: [{ fields: ['student_id'] }]
    }
  );

  return Payment;
};
