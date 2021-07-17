const express = require("express");
const app = express.Router();
const { User } = require("../models");

// Login Page
app.get("/login", (req, res, next) => {
  const wrong = req.query.msg;
  res.render("login", { title: "Login Page", wrong: wrong });
});

app.post("/login", (req, res, next) => {
  User.findOne({
    where: { username: req.body.username, password: req.body.password },
  })
    .then((user) => {
      // if (user) {
      //   res.status(200).redirect("/?user=" + user.name);
      // } else {
      //   console.log(user);
      //   res.redirect("/login?msg=wrongdata" + user);
      // }
    })
    .catch((err) => {
      res.send("ERROR: " + err);
    });
});

module.exports = app;
