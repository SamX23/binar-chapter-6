const express = require("express");
const app = express.Router();
const { User } = require("../models");

// Home Page
app.get("/", (req, res) => {
  let user = req.query.user;

  User.findOne({
    where: {
      username: "admin",
    },
  })
    .then((res) =>
      res.render("index", {
        title: "Traditional Games",
        name: user,
      })
    )
    .catch(() =>
      User.create({
        username: "admin",
        password: "admin",
      }).then(() =>
        res.render("index", {
          title: "Traditional Games",
          name: user,
        })
      )
    );
});

module.exports = app;
