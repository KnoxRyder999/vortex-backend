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
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      client: DataTypes.STRING,
      clientPublic: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'General'
      },
      skills: {
        type: DataTypes.JSON,
        defaultValue: []
      },
      photos: {
        type: DataTypes.JSON,
        defaultValue: []
      },
      video: DataTypes.STRING
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
