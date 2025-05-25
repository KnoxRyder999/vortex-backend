'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    // Define associations here if needed later
    static associate(models) {
      // e.g., Project.belongsTo(models.proj);
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
      timestamps: true,
      hooks: {
        afterFind: (result, options) => {
          if (!result) return;
          if (result.dataValues) {
            result.dataValues.skills = JSON.parse(result.dataValues.skills)
            result.dataValues.photos = JSON.parse(result.dataValues.photos)
          }
          if (Array.isArray(result)) {
            result.forEach(proj => {
              if (proj.dataValues) {
                proj.dataValues.skills = JSON.parse(proj.dataValues.skills)
                proj.dataValues.photos = JSON.parse(proj.dataValues.photos)
              }
            });
          }
        },
        }
    }
  );
  
  return Project;
};
