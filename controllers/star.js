const { Star, Galaxy, Planet } = require("../models");

exports.list = async (req, res) => {
  const {
    page = 1,
    pageSize = 10,
    sortBy = "id",
    order = "asc",
    name,
    galaxyId,
  } = req.query;
  const where = {};
  if (name) where.name = name;
  if (galaxyId) where.GalaxyId = Number(galaxyId);

  const offset = (Number(page) - 1) * Number(pageSize);
  const { rows, count } = await Star.findAndCountAll({
    where,
    include: [
      { model: Galaxy, as: "galaxy" },
      { model: Planet, as: "planets" },
    ],
    order: [[sortBy, order.toUpperCase()]],
    limit: Number(pageSize),
    offset,
  });

  res.set("X-Total-Count", String(count));
  res.json(rows);
};

exports.get = async (req, res) => {
  const item = await Star.findByPk(req.params.id, {
    include: ["galaxy", "planets"],
  });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
};

exports.create = async (req, res) => {
  const item = await Star.create(req.body);
  res.status(201).json(item);
};

exports.update = async (req, res) => {
  const item = await Star.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  await item.update(req.body);
  res.json(item);
};

exports.remove = async (req, res) => {
  const item = await Star.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  await item.destroy();
  res.status(204).end();
};
