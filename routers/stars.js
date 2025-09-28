const express = require("express");
const router = express.Router();
const starCtrl = require("../controllers/stars.js");
const { upload } = require("../index.js");

router.get("/", starCtrl.index);
router.post("/", upload.single("image"), starCtrl.create);
router.get("/:id", starCtrl.show);
router.put("/:id", upload.single("image"), starCtrl.update);
router.delete("/:id", starCtrl.remove);

module.exports = router;
