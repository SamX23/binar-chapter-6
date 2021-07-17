const express = require("express");
const app = express.Router();
const { User } = require("../models");

// READ dashboard page
app.get("/dashboard", (req, res, next) => {
  User.findAll().then((user) =>
    res.status(200).render("dashboard", { title: "Dashboard Page", user })
  );
});

// CREATE
// CREATE users by send post to dashboard/add
app.post("/dashboard/add", (req, res, next) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((user) => {
      res.status(201).redirect("/dashboard");
    })
    .catch((err) => {
      res.status(422).send("Cannot create user:", err);
    });
});

// UPDATE
// UPDATE users by send put to dashboard/edit/:id
app.post("/dashboard/edit/:id", (req, res, next) => {
  User.update(
    {
      username: req.body.username,
      password: req.body.password,
    },
    { where: { id: req.params.id } }
  )
    .then((user) => {
      res.status(201).redirect("/dashboard");
    })
    .catch((err) => res.status(422).send("Cannot update user: ", err));
});

// DELETE
app.post("/dashboard/delete/:id", (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then((user) => {
      res.status(201).redirect("/dashboard");
    })
    .catch((err) => res.status(422).send("Cannot delete the games id"));
});

// HANDLE REDIRECTION READ if any access this page
app.get("/dashboard/add", (req, res, next) => {
  User.findAll().then((user) => res.status(200).redirect("/dashboard"));
});

app.get("/dashboard/edit", (req, res, next) => {
  User.findAll().then((user) => res.status(200).redirect("/dashboard"));
});

app.get("/dashboard/delete", (req, res, next) => {
  User.findAll().then((user) => res.status(200).redirect("/dashboard"));
});

module.exports = app;
