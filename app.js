const express = require("express");
const path = require("path");
const route = require("./routes/route");
const api = require("./routes/api");
const app = express();

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Set Route
app.use(route);
app.use(api);

module.exports = app;
