module.exports = (sequelize, DataTypes) => {
  const properties = sequelize.define('properties', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    property_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    num_apartment: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    num_bathroom: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rentage_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW(),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW(),
    },
  });
  // eslint-disable-next-line no-unused-vars
  properties.associate = function models(model) {
    // associations can be defined here
    properties.hasMany(model.tenants, { foriegnKey: 'propertyId', onDelete: 'cascade', hooks: true });
  };
  return properties;
};
