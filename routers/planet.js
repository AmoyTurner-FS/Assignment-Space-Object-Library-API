const express = require("express");
const router = express.Router();
const planetCtrl = require("../controllers/planet.js");
const { upload } = require("../index.js");

router.get("/", planetCtrl.index);
router.post("/", upload.single("image"), planetCtrl.create);
router.get("/:id", planetCtrl.show);
router.put("/:id", upload.single("image"), planetCtrl.update);
router.delete("/:id", planetCtrl.remove);

module.exports = router;
