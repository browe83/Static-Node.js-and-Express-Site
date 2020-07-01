const express = require("express");
const app = express();
const data = require("./data.json");
const { projects } = data;

// view engine setup
app.set("view engine", "pug");

// Adds static middleware
app.use("/static/", express.static("public"));

//Adds routes
app.get("/", function (req, res, next) {
  res.render("index", { projects });
});

app.get("/about", function (req, res, next) {
  res.render("about");
});

app.get("/projects/:id", function (req, res, next) {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);
  if (project) {
    res.render("project", { project });
  } else {
    next();
  }
});

// catch 404 and forward to error handler

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.error = err;
  res.status(err.status || 500);
  res.render("error");
});

// //starts server
app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});
