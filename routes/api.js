const express = require("express");
const app = express();
const { User } = require("../models");

app.use(express.Router());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// CREATE /user
app.post("/v1/createuser", (req, res, next) => {
  User.create({
    name: req.body.name,
    password: req.body.password,
  })
    .then((user) => {
      res.status(201).json(user).send("User Created");
    })
    .catch((err) => res.status(422).json("Cannot create games"));
});

// READ /user
app.get("/v1/usesr", (req, res, next) => {
  User.findAll().then((user) => {
    res.status(200).json(user);
  });
});

// READ /user/:id
app.get("/v1/users/:id", (req, res, next) => {
  User.findOne({ where: { id: req.params.id } }).then((game) => {
    if (game) {
      res.status(200).json(game);
    } else {
      res.status(200).send("ID not found");
    }
  });
});

// Update /user/:id
app.put("/v1/users/:id", (req, res, next) => {
  User.update(
    {
      name: req.body.name,
      password: req.body.password,
      score: req.body.score,
    },
    { where: { id: req.params.id } }
  )
    .then((game) => {
      res.status(201).json(game);
    })
    .catch((err) => res.status(422).json("Cannot update the games"));
});

// Delete /user/:id
app.delete("/games/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then((game) => {
      res.status(201).json({
        message: `Users id of ${req.params.id} has been deleted!`,
      });
    })
    .catch((err) => res.status(422).json("Cannot delete the games id"));
});

module.exports = app;
