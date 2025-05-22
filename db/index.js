const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
const modelsPath = path.join(__dirname, 'models');

fs.readdirSync(modelsPath)
  .filter(file => file.endsWith('.model.js'))
  .forEach(file => {
    const model = require(path.join(modelsPath, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
