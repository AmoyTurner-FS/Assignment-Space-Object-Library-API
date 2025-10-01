const { Planet } = require("../models");

function wantsJson(req) {
  const h =
    (req.headers["content-type"] || "") + " " + (req.headers["accept"] || "");
  return h.includes("application/json");
}

module.exports = {
  async index(req, res) {
    const planets = await Planet.findAll({ order: [["id", "ASC"]] });
    if (wantsJson(req)) return res.status(200).json(planets);
    res.render("planets/index.twig", { title: "Planets", planets });
  },

  async show(req, res) {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet)
      return wantsJson(req)
        ? res.status(404).json({ error: "Not Found" })
        : res.status(404).render("404.twig");
    if (wantsJson(req)) return res.status(200).json(planet);
    res.render("planets/show.twig", { planet });
  },

  async edit(req, res) {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet) return res.status(404).render("404.twig");
    res.render("planets/edit.twig", { planet });
  },

  async create(req, res) {
    const { name, type } = req.body;
    const image = req.file ? req.file.filename : null;
    const created = await Planet.create({ name, type, image });
    if (wantsJson(req)) return res.status(201).json(created);
    res.redirect("/planets");
  },

  async update(req, res) {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet)
      return wantsJson(req)
        ? res.status(404).json({ error: "Not Found" })
        : res.status(404).render("404.twig");
    const { name, type } = req.body;
    const image = req.file ? req.file.filename : planet.image;
    await planet.update({ name, type, image });
    if (wantsJson(req)) return res.status(200).json(planet);
    res.redirect("/planets");
  },

  async remove(req, res) {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet)
      return wantsJson(req)
        ? res.status(404).json({ error: "Not Found" })
        : res.status(404).render("404.twig");
    await planet.destroy();
    if (wantsJson(req)) return res.status(204).send();
    res.redirect("/planets");
  },
};
