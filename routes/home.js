const express = require("express");
const app = express.Router();
const { User } = require("../models");

// Home Page
app.get("/", (req, res, next) => {
  res.render("index", {
    title: "Traditional Games",
    name: "",
  });
});

app.post("/", (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let errors = false;

  User.create({
    username: username,
    password: password,
  })
    .then((user) => {
      res.status(201).render("index", {
        title: "Traditional Games",
        name: user.username,
      });
    })
    .catch((err) => {
      errors = true;
      res.status(422).flash("Cannot create users:", err);
    });
});

module.exports = app;
