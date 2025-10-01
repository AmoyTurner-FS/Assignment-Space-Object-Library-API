"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Planet extends Model {}
  Planet.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "Planet",
      tableName: "planets",
    }
  );
  return Planet;
};
