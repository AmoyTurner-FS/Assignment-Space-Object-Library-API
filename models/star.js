"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Star extends Model {}
  Star.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      temperature: { type: DataTypes.INTEGER },
      image: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Star",
      tableName: "stars",
    }
  );
  return Star;
};
