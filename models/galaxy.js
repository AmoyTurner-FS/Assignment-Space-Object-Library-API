"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Galaxy extends Model {}
  Galaxy.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      size: { type: DataTypes.INTEGER },
      description: { type: DataTypes.TEXT },
      image: { type: DataTypes.STRING },
    },
    { sequelize, modelName: "Galaxy", tableName: "galaxies" }
  );
  return Galaxy;
};
