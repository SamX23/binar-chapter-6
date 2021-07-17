const express = require("express");
const app = express.Router();
const { User } = require("../models");

// Admin Page
app.get("/dashboard", (req, res, next) => {
  User.findAll().then((user) =>
    res.status(200).render("dashboard", { title: "Dashboard Page", user })
  );
});

// Admin Page
app.post("/dashboard", (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  User.create({
    username: username,
    password: password,
  })
    .then((user) => {
      res.status(201).redirect("/dashboard");
    })
    .catch((err) => {
      res.status(422).send("Cannot create users:", err);
    });
});

// Admin Page
app.put("/dashboard", (req, res, next) => {});

// Admin Page
app.delete("/dashboard", (req, res, next) => {});

module.exports = app;
