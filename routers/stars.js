const express = require("express");
const router = express.Router();
const starCtrl = require("../controllers/stars.js");
const { upload } = require("../index.js");

router.get("/", starCtrl.index);
router.get("/new", (req, res) =>
  res.render("stars/create.twig", { star: null })
);
router.get("/:id", starCtrl.show);
router.get("/:id/edit", starCtrl.edit);
router.post("/", upload.single("image"), starCtrl.create);
router.put("/:id", upload.single("image"), starCtrl.update);
router.delete("/:id", starCtrl.remove);

module.exports = router;
