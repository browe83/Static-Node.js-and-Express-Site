const express = require("express");
const app = express();
const data = require("./data.json");
const { projects } = data;

// view engine setup
app.set("view engine", "pug");

// Adds static middleware
app.use(express.static("public"));

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
  res.render("project", { project });
});

//starts server
app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});
