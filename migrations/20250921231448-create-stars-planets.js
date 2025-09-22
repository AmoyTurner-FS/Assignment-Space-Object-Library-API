"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StarsPlanets", {
      StarId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Stars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      PlanetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Planets", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
    await queryInterface.addConstraint("StarsPlanets", {
      fields: ["StarId", "PlanetId"],
      type: "primary key",
      name: "pk_StarsPlanets",
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("StarsPlanets");
  },
};
