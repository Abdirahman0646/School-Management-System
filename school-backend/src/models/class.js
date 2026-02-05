module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    'Class',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      class_name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      section: { type: DataTypes.STRING(10), allowNull: false }
    },
    {
      tableName: 'classes',
      underscored: true,
      timestamps: false,
      indexes: [{ fields: ['class_name'] }]
    }
  );

  return Class;
};
