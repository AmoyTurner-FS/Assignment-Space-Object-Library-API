"use strict";

module.exports = {
  async up(qi, Sequelize) {
    await qi.addColumn("stars", "type", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    });
  },
  async down(qi) {
    await qi.removeColumn("stars", "type");
  },
};
