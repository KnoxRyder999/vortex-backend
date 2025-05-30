module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    product: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'services',
    timestamps: true // ✅ This is the default
  });
  return Service;
};
