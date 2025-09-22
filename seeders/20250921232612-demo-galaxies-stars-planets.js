"use strict";

module.exports = {
  async up(queryInterface) {
    const [galaxyId] = await queryInterface
      .bulkInsert(
        "Galaxies",
        [
          {
            name: "Milky Way",
            size: 100000,
            description: "Home galaxy",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { returning: ["id"] }
      )
      .then((rows) => [rows[0]?.id || 1]);

    const starRows = await queryInterface.bulkInsert(
      "Stars",
      [
        {
          name: "Sun",
          size: 1,
          description: "G-type",
          GalaxyId: galaxyId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Proxima",
          size: 1,
          description: "Red dwarf",
          GalaxyId: galaxyId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: ["id"] }
    );
    const starId1 = Array.isArray(starRows) ? starRows[0]?.id : 1;
    const starId2 = Array.isArray(starRows) ? starRows[1]?.id : 2;

    const planetRows = await queryInterface.bulkInsert(
      "Planets",
      [
        {
          name: "Earth",
          size: 1,
          description: "Life",
          GalaxyId: galaxyId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mars",
          size: 1,
          description: "Red",
          GalaxyId: galaxyId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: ["id"] }
    );
    const planetId1 = Array.isArray(planetRows) ? planetRows[0]?.id : 1;
    const planetId2 = Array.isArray(planetRows) ? planetRows[1]?.id : 2;

    await queryInterface.bulkInsert("StarsPlanets", [
      { StarId: starId1, PlanetId: planetId1 },
      { StarId: starId1, PlanetId: planetId2 },
      { StarId: starId2, PlanetId: planetId2 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("StarsPlanets", null, {});
    await queryInterface.bulkDelete("Planets", null, {});
    await queryInterface.bulkDelete("Stars", null, {});
    await queryInterface.bulkDelete("Galaxies", null, {});
  },
};
