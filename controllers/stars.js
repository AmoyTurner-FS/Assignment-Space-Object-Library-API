const { Star } = require("../models");

function wantsJson(req) {
  const ct = req.headers["content-type"] || "";
  return ct.includes("application/json");
}

module.exports = {
  async index(req, res) {
    try {
      const stars = await Star.findAll({ order: [["id", "ASC"]] });
      if (wantsJson(req)) return res.status(200).json(stars);
      return res
        .status(200)
        .render("stars/index.twig", { title: "Stars", stars });
    } catch (err) {
      if (wantsJson(req)) return res.status(500).json({ error: err.message });
      return res.status(500).render("error.twig", { message: err.message });
    }
  },

  async create(req, res) {
    try {
      const { name, type, temperature } = req.body;
      const image = req.file ? req.file.filename : null;
      const created = await Star.create({ name, type, temperature, image });
      if (wantsJson(req)) return res.status(201).json(created);
      return res.redirect("/stars");
    } catch (err) {
      if (wantsJson(req)) return res.status(400).json({ error: err.message });
      return res.status(400).render("error.twig", { message: err.message });
    }
  },

  async show(req, res) {
    try {
      const star = await Star.findByPk(req.params.id);
      if (!star) {
        if (wantsJson(req))
          return res.status(404).json({ error: "Star not found" });
        return res.status(404).render("404.twig", { title: "Not Found" });
      }
      if (wantsJson(req)) return res.status(200).json(star);
      return res
        .status(200)
        .render("stars/show.twig", { title: star.name, star });
    } catch (err) {
      if (wantsJson(req)) return res.status(500).json({ error: err.message });
      return res.status(500).render("error.twig", { message: err.message });
    }
  },

  async update(req, res) {
    try {
      const star = await Star.findByPk(req.params.id);
      if (!star) {
        if (wantsJson(req))
          return res.status(404).json({ error: "Star not found" });
        return res.status(404).render("404.twig", { title: "Not Found" });
      }
      const { name, type, temperature } = req.body;
      const image = req.file ? req.file.filename : star.image;
      await star.update({ name, type, temperature, image });
      if (wantsJson(req)) return res.status(200).json(star);
      return res.redirect("/stars");
    } catch (err) {
      if (wantsJson(req)) return res.status(400).json({ error: err.message });
      return res.status(400).render("error.twig", { message: err.message });
    }
  },

  async remove(req, res) {
    try {
      const star = await Star.findByPk(req.params.id);
      if (!star) {
        if (wantsJson(req))
          return res.status(404).json({ error: "Star not found" });
        return res.status(404).render("404.twig", { title: "Not Found" });
      }
      await star.destroy();
      if (wantsJson(req)) return res.status(204).send();
      return res.redirect("/stars");
    } catch (err) {
      if (wantsJson(req)) return res.status(500).json({ error: err.message });
      return res.status(500).render("error.twig", { message: err.message });
    }
  },
};
