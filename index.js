const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "twig");
app.set("twig options", { allow_async: true, strict_variables: false });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, "uploads")),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });
module.exports.upload = upload;

const planetRouter = require("./routers/planet.js");
const starRouter = require("./routers/stars.js");
const galaxyRouter = require("./routers/galaxys.js");

app.use("/planets", planetRouter);
app.use("/stars", starRouter);
app.use("/galaxies", galaxyRouter);

app.get("/", (_req, res) => res.redirect("/planets"));

app.use((_req, res) => {
  if ((_req.headers["content-type"] || "").includes("application/json")) {
    return res.status(404).json({ error: "Not Found" });
  }
  res.status(404).render("404.twig", { title: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
