const express = require("express");
const app = express.Router();
const { User_game, User_game_biodata } = require("../models");

app.get("/dashboard-user", (req, res) => {
  const msg = req.query.msg;
  const username = req.query.user;
  User_game.findOne({
    where: {
      username: username,
    },
    order: [["id", "ASC"]],
  }).then((result) => {
    result
      ? User_game_biodata.findOne({
          where: {
            user_id: 1,
          },
        }).then((user) =>
          res.status(200).render("dashboard-user", {
            title: "Dashboard User",
            user,
            msg: msg,
            username: username,
          })
        )
      : res.status(200).redirect("/");
  });
});

module.exports = app;
