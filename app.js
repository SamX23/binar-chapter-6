const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const path = require("path");
const routes = require("./routes/routes");
const api = require("./routes/api");
const app = express();

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: "true",
    secret: "secret",
  })
);

app.use(flash());

// Set Route
app.use(routes);
app.use(api);

module.exports = app;
