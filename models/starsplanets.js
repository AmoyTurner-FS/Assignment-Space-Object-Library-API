"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class StarsPlanets extends Model {
    static associate() {}
  }
  StarsPlanets.init(
    {
      StarId: { type: DataTypes.INTEGER, allowNull: false },
      PlanetId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, modelName: "StarsPlanets", timestamps: false }
  );
  return StarsPlanets;
};
