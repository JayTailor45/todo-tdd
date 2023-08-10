const TodoModel = require("../models/todo.model");

exports.createTodo = async (req, res, next) => {
  const createdTodo = await TodoModel.create(req.body);
  res.status(201).json(createdTodo);
};
