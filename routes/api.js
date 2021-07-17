const express = require("express");
const app = express();
const { User } = require("../models");

app.use(express.Router());

// CREATE /user
app.post("/v1/createuser", (req, res, next) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((user) => {
      res.status(201).redirect("/");
    })
    .catch((err) => res.status(422).send("Cannot create users"));
});

// READ /user
app.get("/v1/users", (req, res, next) => {
  User.findAll().then((user) => {
    user.length == 0
      ? res.status(200).send("No users yet!")
      : res.status(200).json(user);
  });
});

// READ /user/:id
app.get("/v1/users/:id", (req, res, next) => {
  User.findOne({ where: { id: req.params.id } }).then((user) => {
    user ? res.status(200).json(user) : res.status(200).send("ID not found");
  });
});

// Update /user/:id
app.put("/v1/users/:id", (req, res, next) => {
  User.update(
    {
      username: req.body.username,
      password: req.body.password,
      score: req.body.score,
    },
    { where: { id: req.params.id } }
  )
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => res.status(422).send("Cannot update the games"));
});

// Delete /user/:id
app.delete("/v1/users/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then((user) => {
      res.status(201).json({
        message: `Users id of ${req.params.id} has been deleted!`,
      });
    })
    .catch((err) => res.status(422).send("Cannot delete the games id"));
});

module.exports = app;
