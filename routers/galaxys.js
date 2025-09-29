const express = require("express");
const router = express.Router();
const { upload } = require("../index.js");
const galaxyCtrl = require("../controllers/galaxys.js");

router.get("/", galaxyCtrl.index);
router.get("/new", (req, res) =>
  res.render("galaxies/create.twig", { galaxy: null })
);
router.get("/:id", galaxyCtrl.show);
router.get("/:id/edit", async (req, res) => {
  const { Galaxy } = require("../models");
  const g = await Galaxy.findByPk(req.params.id);
  res.render("galaxies/edit.twig", { galaxy: g });
});
router.post("/", upload.single("image"), galaxyCtrl.create);
router.put("/:id", upload.single("image"), galaxyCtrl.update);
router.delete("/:id", galaxyCtrl.remove);

module.exports = router;
