const express = require("express");
const app = express.Router();
const { User } = require("../models");

// Login Page
app.get("/login", (req, res, next) =>
  res.render("login", { title: "Login Page" })
);

app.post("/login", (req, res, next) =>
  User.findOne({
    where: { username: req.body.username, password: req.body.password },
  }).then((user) => {
    res
      .status(200)
      .render("dashboard", { title: "Login Page", name: user.name });
  })
);

module.exports = app;
