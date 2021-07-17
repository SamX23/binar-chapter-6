const express = require("express");
const app = express.Router();
const { User } = require("../models");

// Register Page
app.get("/register", (req, res) => {
  const exist = req.query.msg;
  res.render("register", { title: "Register Page", username: exist });
});

app.post("/register", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        User.create({
          username: req.body.username,
          password: req.body.password,
        })
          .then((user) => {
            res.status(201).redirect("/?user=" + user.username);
          })
          .catch((err) => {
            res.status(422).send("Cannot create users:", err);
          });
      } else {
        res.redirect("/register?msg=userexist");
      }
    })
    .catch((err) => {
      res.send("ERROR: " + err);
    });
});

module.exports = app;
