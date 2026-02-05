module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      role_name: { type: DataTypes.STRING(50), allowNull: false, unique: true }
    },
    {
      tableName: 'roles',
      timestamps: false
    }
  );

  return Role;
};
