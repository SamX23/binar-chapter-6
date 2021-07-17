const express = require("express");
const app = express.Router();

// Home Page
app.get("/", (req, res, next) => {
  let data = req.query.user;
  res.render("index", {
    title: "Traditional Games",
    name: data,
  });
});

module.exports = app;
