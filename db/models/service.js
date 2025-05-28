module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'services',
    hooks: {
    },
  });
  return Service;
};
