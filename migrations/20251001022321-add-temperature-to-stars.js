"use strict";

module.exports = {
  async up(qi, Sequelize) {
    await qi.addColumn("stars", "temperature", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
  async down(qi) {
    await qi.removeColumn("stars", "temperature");
  },
};
