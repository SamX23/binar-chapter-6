const express = require("express");
const app = express.Router();

// Games Page
app.get("/games", (req, res, next) =>
  res.render("games", {
    title: "Try Out The Games",
    name: "Player",
  })
);

module.exports = app;
