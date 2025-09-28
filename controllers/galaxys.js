const { Galaxy } = require("../models");

function wantsJson(req) {
  const ct = req.headers["content-type"] || "";
  return ct.includes("application/json");
}

module.exports = {
  async index(req, res) {
    try {
      const galaxies = await Galaxy.findAll({ order: [["id", "ASC"]] });
      if (wantsJson(req)) return res.status(200).json(galaxies);
      return res
        .status(200)
        .render("galaxies/index.twig", { title: "Galaxies", galaxies });
    } catch (err) {
      if (wantsJson(req)) return res.status(500).json({ error: err.message });
      return res.status(500).render("error.twig", { message: err.message });
    }
  },

  async create(req, res) {
    try {
      const { name, description } = req.body;
      const image = req.file ? req.file.filename : null;
      const created = await Galaxy.create({ name, description, image });
      if (wantsJson(req)) return res.status(201).json(created);
      return res.redirect("/galaxies");
    } catch (err) {
      if (wantsJson(req)) return res.status(400).json({ error: err.message });
      return res.status(400).render("error.twig", { message: err.message });
    }
  },

  async show(req, res) {
    try {
      const galaxy = await Galaxy.findByPk(req.params.id);
      if (!galaxy) {
        if (wantsJson(req))
          return res.status(404).json({ error: "Galaxy not found" });
        return res.status(404).render("404.twig", { title: "Not Found" });
      }
      if (wantsJson(req)) return res.status(200).json(galaxy);
      return res
        .status(200)
        .render("galaxies/show.twig", { title: galaxy.name, galaxy });
    } catch (err) {
      if (wantsJson(req)) return res.status(500).json({ error: err.message });
      return res.status(500).render("error.twig", { message: err.message });
    }
  },

  async update(req, res) {
    try {
      const galaxy = await Galaxy.findByPk(req.params.id);
      if (!galaxy) {
        if (wantsJson(req))
          return res.status(404).json({ error: "Galaxy not found" });
        return res.status(404).render("404.twig", { title: "Not Found" });
      }
      const { name, description } = req.body;
      const image = req.file ? req.file.filename : galaxy.image;
      await galaxy.update({ name, description, image });
      if (wantsJson(req)) return res.status(200).json(galaxy);
      return res.redirect("/galaxies");
    } catch (err) {
      if (wantsJson(req)) return res.status(400).json({ error: err.message });
      return res.status(400).render("error.twig", { message: err.message });
    }
  },

  async remove(req, res) {
    try {
      const galaxy = await Galaxy.findByPk(req.params.id);
      if (!galaxy) {
        if (wantsJson(req))
          return res.status(404).json({ error: "Galaxy not found" });
        return res.status(404).render("404.twig", { title: "Not Found" });
      }
      await galaxy.destroy();
      if (wantsJson(req)) return res.status(204).send();
      return res.redirect("/galaxies");
    } catch (err) {
      if (wantsJson(req)) return res.status(500).json({ error: err.message });
      return res.status(500).render("error.twig", { message: err.message });
    }
  },
};
