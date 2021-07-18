const express = require("express");
const app = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

// READ
app.get("/dashboard", (req, res) => {
  const msg = req.query.msg;

  if (req.query.user == "admin") {
    User.findAll({
      order: [["id", "ASC"]],
    }).then((user) =>
      res
        .status(200)
        .render("dashboard", { title: "Dashboard Page", user, exist: msg })
    );
  } else if (req.query.user != "admin") {
    res.redirect("/dashboard-user");
  }
});

// CREATE
app.post("/dashboard/add", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userData = {
    username: req.body.username,
    password: hashedPassword,
  };

  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      !user
        ? User.create(userData)
            .then(() => {
              res.status(201).redirect("/dashboard?user=admin");
            })
            .catch((err) => {
              res.status(422).send("Cannot create user:", err);
            })
        : res.redirect("/dashboard?user=admin&msg=userexist");
    })
    .catch((err) => res.send("ERROR: " + err));
});

// UPDATE
app.post("/dashboard/edit/:id", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userData = {
    username: req.body.username,
    password: hashedPassword,
  };

  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      !user
        ? User.update(userData, { where: { id: req.params.id } })
            .then(() => {
              res.status(201).redirect("/dashboard?user=admin");
            })
            .catch((err) => res.status(422).send("Cannot update user: ", err))
        : res.redirect("/dashboard?user=admin&msg=userupdateexist");
    })
    .catch((err) => res.send("ERROR: " + err));
});

// DELETE
app.post("/dashboard/delete/:id", (req, res) =>
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.status(201).redirect("/dashboard?user=admin"))
    .catch(() => res.status(422).send("Cannot delete the games id"))
);

// HANDLE REDIRECTION READ if any access this page
app.get("/dashboard/*", (req, res) =>
  User.findAll().then(() => res.status(200).redirect("/dashboard?user=admin"))
);

module.exports = app;
