const TodoModel = require("../models/todo.model");

exports.createTodo = async (req, res, next) => {
  try {
    const createdTodo = await TodoModel.create(req.body);
    res.status(201).json(createdTodo);
  } catch (error) {
    next(error);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const todo = await TodoModel.findById(req.params.todoId);
    if (!todo) {
      return res.status(404).send();
    }
    return res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.todoId,
      req.body,
      {
        new: true,
        userFindAndModify: false,
      }
    );
    if (!updatedTodo) {
      return res.status(404).send();
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};
