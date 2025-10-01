const { Star } = require("../models");

function wantsJson(req) {
  const h = (
    (req.headers["content-type"] || "") +
    " " +
    (req.headers["accept"] || "")
  ).toLowerCase();
  return h.includes("application/json");
}

module.exports = {
  async index(req, res) {
    const stars = await Star.findAll({ order: [["id", "ASC"]] });
    if (wantsJson(req)) return res.status(200).json(stars);
    res.render("stars/index.twig", { title: "Stars", stars });
  },
  async show(req, res) {
    const star = await Star.findByPk(req.params.id);
    if (!star)
      return wantsJson(req)
        ? res.status(404).json({ error: "Not Found" })
        : res.status(404).render("404.twig");
    if (wantsJson(req)) return res.status(200).json(star);
    res.render("stars/show.twig", { star });
  },
  async edit(req, res) {
    const star = await Star.findByPk(req.params.id);
    if (!star) return res.status(404).render("404.twig");
    res.render("stars/edit.twig", { star });
  },
  async create(req, res) {
    const { name, type, temperature } = req.body;
    const image = req.file ? req.file.filename : null;
    const created = await Star.create({ name, type, temperature, image });
    if (wantsJson(req)) return res.status(201).json(created);
    res.redirect("/stars");
  },
  async update(req, res) {
    const star = await Star.findByPk(req.params.id);
    if (!star)
      return wantsJson(req)
        ? res.status(404).json({ error: "Not Found" })
        : res.status(404).render("404.twig");
    const { name, type, temperature } = req.body;
    const image = req.file ? req.file.filename : star.image;
    await star.update({ name, type, temperature, image });
    if (wantsJson(req)) return res.status(200).json(star);
    res.redirect("/stars");
  },
  async remove(req, res) {
    const star = await Star.findByPk(req.params.id);
    if (!star)
      return wantsJson(req)
        ? res.status(404).json({ error: "Not Found" })
        : res.status(404).render("404.twig");
    await star.destroy();
    if (wantsJson(req)) return res.status(204).send();
    res.redirect("/stars");
  },
};
