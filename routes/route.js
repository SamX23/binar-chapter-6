const express = require("express");
const router = express.Router();

// Home Page
router.get("/", (req, res, next) => {
  const user = req.query;

  res.render("index", {
    title: "Traditional Games",
    name: user.name || "Player",
  });
});

router.post("/", (req, res, next) => {
  const user = req.query;

  res.render("index", {
    title: "Traditional Games",
    name: user.name || "Player",
  });
});

// Games Page
router.get("/games", (req, res, next) => {
  const user = req.query || "Player";

  res.render("games", {
    title: "Try Out The Games",
    name: user.name || "Player",
  });
});

// Login Page
router.get("/login", (req, res, next) =>
  res.render("login", { title: "Login Page" })
);

router.post("/login", (req, res, next) => {
  res.status(200);
});

// Admin Page
router.get("/admin", (req, res, next) =>
  res.render("admin", { title: "Admin Page" })
);

module.exports = router;
