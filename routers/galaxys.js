const express = require("express");
const router = express.Router();
const galaxyCtrl = require("../controllers/galaxys.js");
const { upload } = require("../index.js");

router.get("/", galaxyCtrl.index);
router.post("/", upload.single("image"), galaxyCtrl.create);
router.get("/:id", galaxyCtrl.show);
router.put("/:id", upload.single("image"), galaxyCtrl.update);
router.delete("/:id", galaxyCtrl.remove);

module.exports = router;
