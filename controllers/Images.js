const { Image } = require("../models");

const isJson = (req) =>
  (req.get("Content-Type") || "").includes("application/json");

// LIST
const index = async (req, res) => {
  const images = await Image.findAll();
  if (isJson(req)) return res.json(images);
  return res.render("views/images/index", { images });
};

// SHOW
const show = async (req, res) => {
  const image = await Image.findByPk(req.params.id);
  if (!image) {
    if (isJson(req)) return res.status(404).json({ error: "Not found" });
    return res.status(404).render("views/images/show", { image: null });
  }
  if (isJson(req)) return res.json(image);
  return res.render("views/images/show", { image });
};

// NEW/EDIT FORM (HTML only)
const form = async (req, res) => {
  const image = req.params.id
    ? await Image.findByPk(req.params.id)
    : { id: null, title: "", variantId: "" };
  const variants = [];
  return res.render("views/images/_form.twig", { image, variants });
};

// CREATE
const create = async (req, res, next) => {
  const image = await Image.create(req.body);
  req.imageId = image.id;
  next(); // triggers upload middleware

  if (isJson(req)) return res.status(201).json(image);
  return res.redirect("/images/" + image.id);
};

// UPDATE
const update = async (req, res, next) => {
  await Image.update(req.body, { where: { id: req.params.id } });
  req.imageId = req.params.id;
  next(); // triggers upload middleware

  if (isJson(req)) {
    const updated = await Image.findByPk(req.params.id);
    return res.json(updated);
  }
  return res.redirect("/images/" + req.params.id);
};

// DELETE
const remove = async (req, res) => {
  await Image.destroy({ where: { id: req.params.id } });
  if (isJson(req)) return res.status(204).end();
  return res.redirect("/images");
};

module.exports = { index, show, form, create, update, remove };
