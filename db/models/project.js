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
            if(!Array.isArray(result.dataValues.skills))result.dataValues.skills = JSON.parse(result.dataValues.skills)
            if(!Array.isArray(result.dataValues.photos))result.dataValues.photos = JSON.parse(result.dataValues.photos)
          }
          if (Array.isArray(result)) {
            result.forEach(proj => {
              if (proj.dataValues) {
                if(!Array.isArray(proj.dataValues.skills))proj.dataValues.skills = JSON.parse(proj.dataValues.skills)
                if(!Array.isArray(proj.dataValues.photos))proj.dataValues.photos = JSON.parse(proj.dataValues.photos)
              }
            });
          }
        },
        }
    }
  );
  
  return Project;
};
