module.exports = (sequelize, DataTypes) => {
  const property = sequelize.define('property', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  property.associate = function models(model) {
    // associations can be defined here
    property.hasMany(model.tenants, { onDelete: 'cascade', hooks: true });
  };
  return property;
};
