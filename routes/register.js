const express = require("express");
const app = express.Router();

// Register Page
app.get("/register", (req, res, next) =>
  res.render("register", { title: "Register Page" })
);

module.exports = app;
