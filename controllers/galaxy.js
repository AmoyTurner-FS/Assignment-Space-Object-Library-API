const { Galaxy, Star, Planet } = require("../models");

exports.list = async (req, res) => {
  const {
    page = 1,
    pageSize = 10,
    sortBy = "id",
    order = "asc",
    name,
    minSize,
    maxSize,
  } = req.query;
  const where = {};
  if (name) where.name = name;
  if (minSize) where.size = { ...(where.size || {}), gte: Number(minSize) };
  if (maxSize) where.size = { ...(where.size || {}), lte: Number(maxSize) };

  const offset = (Number(page) - 1) * Number(pageSize);
  const { rows, count } = await Galaxy.findAndCountAll({
    where,
    include: [
      { model: Star, as: "stars" },
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
  const item = await Galaxy.findByPk(req.params.id, {
    include: ["stars", "planets"],
  });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
};

exports.create = async (req, res) => {
  const item = await Galaxy.create(req.body);
  res.status(201).json(item);
};

exports.update = async (req, res) => {
  const item = await Galaxy.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  await item.update(req.body);
  res.json(item);
};

exports.remove = async (req, res) => {
  const item = await Galaxy.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  await item.destroy();
  res.status(204).end();
};
