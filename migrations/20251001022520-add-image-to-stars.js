"use strict";

"use strict";

module.exports = {
  async up(q, Sequelize) {
    await q.addColumn("Stars", "image", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
  async down(q) {
    await q.removeColumn("Stars", "image");
  },
};
