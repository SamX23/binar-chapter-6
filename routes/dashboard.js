const express = require("express");
const app = express.Router();
const { User_game } = require("../models");
const bcrypt = require("bcrypt");

// READ
app.get("/dashboard", (req, res) => {
  const usererr = req.query.usererr;

  if (req.query.user == "admin") {
    User_game.findAll({
      order: [["id", "ASC"]],
    }).then((user) =>
      res
        .status(200)
        .render("dashboard", {
          title: "Dashboard Page",
          user,
          userexist: usererr,
        })
    );
  } else if (req.query.user != "admin") {
    res.redirect("/dashboard-user");
  }
});

// CREATE
app.post("/dashboard/add", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userData = {
    username: req.body.username,
    password: hashedPassword,
  };

  User_game.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      !user
        ? User_game.create(userData)
            .then(() => {
              res.status(201).redirect("/dashboard?user=admin");
            })
            .catch((err) => {
              res.status(422).send("Cannot create user:", err);
            })
        : res.redirect("/dashboard?user=admin&usererr=true");
    })
    .catch((err) => res.send("ERROR: " + err));
});

// UPDATE
app.post("/dashboard/edit/:id", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = {
    username: username,
    password: hashedPassword,
  };

  const updateData = async (data) =>
    await User_game.update(data, { where: { id: req.params.id } })
      .then(() => {
        res.status(201).redirect("/dashboard?user=admin");
      })
      .catch((err) => res.status(422).send("Cannot update user: ", err));

  const findUsername = async (username) =>
    await User_game.findOne({
      where: {
        username: username,
      },
    });

  User_game.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((id) => {
      if (username != "" && password != "") {
        findUsername(username).then((dbUser) => {
          if (!dbUser) {
            updateData(userData);
          }
          res.redirect("/dashboard?user=admin&usererr=true");
        });
      } else if (username != "" && password == "") {
        findUsername(username).then((dbUser) => {
          if (!dbUser) {
            updateData({ username: username });
          }
          res.redirect("/dashboard?user=admin&usererr=true");
        });
      } else if (username == "" && password != "") {
        updateData({ password: hashedPassword });
      }
    })
    .catch((err) => res.send("ERROR: " + err));
});

// DELETE
app.post("/dashboard/delete/:id", (req, res) =>
  User_game.destroy({ where: { id: req.params.id } })
    .then(() => res.status(201).redirect("/dashboard?user=admin"))
    .catch(() => res.status(422).send("Cannot delete the games id"))
);

// HANDLE REDIRECTION READ if any access this page
app.get("/dashboard/*", (req, res) =>
  User_game.findAll().then(() =>
    res.status(200).redirect("/dashboard?user=admin")
  )
);

module.exports = app;
