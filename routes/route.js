const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.use(
  express.urlencoded({
    extended: false,
  })
);

// Home Page
router.get("/", (req, res, next) => {
  const user = req.body;

  res.render("index", {
    title: "Traditional Games",
    name: user.username || "Player",
  });
});

router.post("/", (req, res, next) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((user) => {
      console.log(user);
      res.status(201).render("index", {
        title: "Traditional Games",
        name: user.username || "Player",
      });
    })
    .catch((err) => res.status(422).json("Cannot create games"));
});

// Games Page
router.get("/games", (req, res, next) => {
  const user = req.body;

  res.render("games", {
    title: "Try Out The Games",
    name: user.username || "Player",
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
