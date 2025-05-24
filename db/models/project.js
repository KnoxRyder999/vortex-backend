'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    // Define associations here if needed later
    static associate(models) {
      // e.g., Project.belongsTo(models.User);
    }
  }

  Project.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      client: {
        type: DataTypes.STRING
      },
      clientPublic: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      skills: {
        type: DataTypes.JSON,
        defaultValue: []
      },
      photos: {
        type: DataTypes.JSON,
        defaultValue: []
      },
      video: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Project',
      tableName: 'projects',
      timestamps: true
    }
  );

  return Project;
};
