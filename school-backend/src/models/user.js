module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      password_hash: { type: DataTypes.STRING(255), allowNull: false },
      role_id: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      tableName: 'users',
      underscored: true,
      timestamps: true,
      indexes: [
        { fields: ['email'] },
        { fields: ['role_id'] }
      ]
    }
  );

  return User;
};
