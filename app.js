// import start
const express = require("express");

const todoRoutes = require("./routes/todo.routes");
const mongodb = require("./mongodb/mongodb.connect");
// import end

mongodb.connect();

const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/todos", todoRoutes);

// direct req
app.get("/", (req, res) => {
  return res.json({
    hello: "World",
  });
});

module.exports = app;