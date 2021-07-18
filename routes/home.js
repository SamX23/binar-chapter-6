const express = require("express");
const app = express.Router();
const { User } = require("../models");

// Home Page
app.get("/", (req, res) =>
  User.findOne({
    where: {
      username: "admin",
    },
  })
    .then((result) => {
      !result
        ? User.create({
            username: "admin",
            password: "admin",
          }).then((user) => {
            res.render("index", {
              title: "Traditional Games",
              name: req.query.user,
            });
          })
        : res.render("index", {
            title: "Traditional Games",
            name: req.query.user,
          });
    })
    .catch(() => res.send("ERROR: " + err))
);

module.exports = app;
