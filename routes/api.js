const express = require("express");
const app = express();
const {
  User_game,
  User_game_biodata,
  User_game_history,
} = require("../models");

// CREATE /user
app.post("/v1/users", (req, res) =>
  User_game.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((user) => res.status(201).json(user))
    .catch(() => res.status(422).send("Cannot create users"))
);

// READ /user
app.get("/v1/users", (req, res) =>
  User_game.findAll().then((user) =>
    user.length == 0
      ? res.status(200).send("No users yet!")
      : res.status(200).json(user)
  )
);

// READ /user/:id
app.get("/v1/users/:id", (req, res) =>
  User_game.findOne({ where: { id: req.params.id } }).then((user) =>
    user ? res.status(200).json(user) : res.status(200).send("ID not found")
  )
);

// Update /user/:id
app.put("/v1/users/edit/:id", (req, res) =>
  User_game.update(
    {
      username: req.body.username,
      password: req.body.password,
      score: req.body.score,
    },
    { where: { id: req.params.id } }
  )
    .then((user) => res.status(201).json(user))
    .catch(() => res.status(422).send("Cannot update the games"))
);

// Delete /user/:id
app.delete("/v1/users/delete/:id", (req, res) =>
  User_game.destroy({ where: { id: req.params.id } })
    .then(() =>
      res.status(201).json({
        message: `Users id of ${req.params.id} has been deleted!`,
      })
    )
    .catch(() => res.status(422).send("Cannot delete the games id"))
);

// READ /user/profile
app.get("/v1/profile", (req, res) =>
  User_game_biodata.findAll({
    include: [
      {
        model: User_game,
      },
    ],
  })
    .then((row) =>
      row.length == 0
        ? res.status(200).send("No users yet!")
        : res.status(200).json(row)
    )
    .catch((err) => res.status(500).send("Error : " + err))
);

// READ /user/profile/:id
app.get("/v1/profile/:id", (req, res) =>
  User_game_biodata.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: User_game,
      },
    ],
  }).then((user) =>
    user ? res.status(200).json(user) : res.status(200).send("ID not found")
  )
);

// READ /user/profile
app.get("/v1/history", (req, res) =>
  User_game_history.findAll({
    include: [
      {
        model: User_game,
      },
    ],
  })
    .then((row) =>
      row.length == 0
        ? res.status(200).send("No users yet!")
        : res.status(200).json(row)
    )
    .catch((err) => res.status(500).send("Error : " + err))
);

// READ /user/profile/:id
app.get("/v1/history/:id", (req, res) =>
  User_game_history.findOne({
    where: { user_id: req.params.id },
    include: [
      {
        model: User_game,
      },
    ],
  }).then((user) =>
    user ? res.status(200).json(user) : res.status(200).send("ID not found")
  )
);

module.exports = app;
