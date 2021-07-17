const express = require("express");
const app = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

// READ dashboard page
app.get("/dashboard", (req, res) => {
  const msg = req.query.msg;

  User.findAll({
    order: [["id", "ASC"]],
  }).then((user) =>
    res
      .status(200)
      .render("dashboard", { title: "Dashboard Page", user, exist: msg })
  );
});

// CREATE
// CREATE users by send post to dashboard/add
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
      if (!user) {
        User.create(userData)
          .then((user) => {
            res.status(201).redirect("/dashboard");
          })
          .catch((err) => {
            res.status(422).send("Cannot create user:", err);
          });
      } else {
        res.redirect("/dashboard?msg=userexist");
      }
    })
    .catch((err) => {
      res.send("ERROR: " + err);
    });
});

// UPDATE
// UPDATE users by send put to dashboard/edit/:id
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
      if (!user) {
        User.update(userData, { where: { id: req.params.id } })
          .then((user) => {
            res.status(201).redirect("/dashboard");
          })
          .catch((err) => res.status(422).send("Cannot update user: ", err));
      } else {
        res.redirect("/dashboard?msg=userupdateexist");
      }
    })
    .catch((err) => {
      res.send("ERROR: " + err);
    });
});

// DELETE
app.post("/dashboard/delete/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then((user) => {
      res.status(201).redirect("/dashboard");
    })
    .catch((err) => res.status(422).send("Cannot delete the games id"));
});

// HANDLE REDIRECTION READ if any access this page
app.get("/dashboard/*", (req, res) => {
  User.findAll().then((user) => res.status(200).redirect("/dashboard"));
});

module.exports = app;
