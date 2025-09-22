"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Galaxy extends Model {
    static associate(models) {
      Galaxy.hasMany(models.Star, { foreignKey: "GalaxyId", as: "stars" });
      Galaxy.hasMany(models.Planet, { foreignKey: "GalaxyId", as: "planets" });
    }
  }
  Galaxy.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      size: { type: DataTypes.INTEGER, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize, modelName: "Galaxy" }
  );
  return Galaxy;
};
