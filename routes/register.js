const express = require("express");
const app = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

// Register Page
app.get("/register", (req, res) =>
  res.render("register", { title: "Register Page", userExist: req.query.msg })
);

app.post("/register", async (req, res) => {
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
      !user
        ? User.create(userData)
            .then((user) => res.status(201).redirect("/?user=" + user.username))
            .catch((err) => res.status(422).send("Cannot create users:", err))
        : res.redirect("/register?msg=userexist");
    })
    .catch((err) => res.send("ERROR: " + err));
});

module.exports = app;
