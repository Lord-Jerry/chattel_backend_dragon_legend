module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('tenants', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    propertyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: 'properties',
        key: 'id',
      },
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    mobile: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
    },
    last_payment_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      unique: false,
    },
    payment_expiry_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      unique: false,
    },
    num_years_paid_for: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW(),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW(),
    },
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('tenants'),
};
