const express = require("express");
const app = express.Router();

// Games Page
app.get("/games", (req, res, next) => {
  const user = req.body;

  res.render("games", {
    title: "Try Out The Games",
    name: user.username || "Player",
  });
});

module.exports = app;
