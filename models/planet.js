"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Planet extends Model {
    static associate(models) {
      Planet.belongsTo(models.Galaxy, { foreignKey: "GalaxyId", as: "galaxy" });
      Planet.belongsToMany(models.Star, {
        through: models.StarsPlanets,
        foreignKey: "PlanetId",
        otherKey: "StarId",
        as: "stars",
      });
    }
  }
  Planet.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      size: { type: DataTypes.INTEGER, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      GalaxyId: { type: DataTypes.INTEGER, allowNull: true },
    },
    { sequelize, modelName: "Planet" }
  );
  return Planet;
};
