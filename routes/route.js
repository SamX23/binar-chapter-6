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

// Register Page
router.get("/register", (req, res, next) =>
  res.render("register", { title: "Register Page" })
);

module.exports = router;
