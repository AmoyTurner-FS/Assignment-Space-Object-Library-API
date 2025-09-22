"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    static associate(models) {
      Star.belongsTo(models.Galaxy, { foreignKey: "GalaxyId", as: "galaxy" });
      Star.belongsToMany(models.Planet, {
        through: models.StarsPlanets,
        foreignKey: "StarId",
        otherKey: "PlanetId",
        as: "planets",
      });
    }
  }
  Star.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      size: { type: DataTypes.INTEGER, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      GalaxyId: { type: DataTypes.INTEGER, allowNull: true },
    },
    { sequelize, modelName: "Star" }
  );
  return Star;
};
