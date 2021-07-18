const express = require("express");
const app = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

// Login Page
app.get("/login", (req, res, next) => {
  const msg = req.query.msg;
  res.render("login", { title: "Login Page", msg: msg });
});

app.get("/login/auth", (req, res, next) => {
  User.findOne({
    where: {
      username: req.query.username,
    },
  })
    .then(async (user) => {
      if (await bcrypt.compare(req.query.password, user.password)) {
        res.status(200).redirect("/?user=" + user.username);
        res.status(200).send(`Username found, password match!`);
      } else {
        res.status(400).redirect("/login?msg=passwordwrong");
      }
    })
    .catch((err) => {
      res.status(400).redirect("/login?msg=usernamewrong");
    });
});

module.exports = app;
