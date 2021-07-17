const express = require("express");
const app = express.Router();

// Login Page
app.get("/login", (req, res, next) =>
  res.render("login", { title: "Login Page" })
);

module.exports = app;
