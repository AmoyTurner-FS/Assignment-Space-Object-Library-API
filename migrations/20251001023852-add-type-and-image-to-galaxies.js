"use strict";

module.exports = {
  async up(q, Sequelize) {
    await q.addColumn("galaxies", "type", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await q.addColumn("galaxies", "image", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
  async down(q) {
    await q.removeColumn("galaxies", "type");
    await q.removeColumn("galaxies", "image");
  },
};
