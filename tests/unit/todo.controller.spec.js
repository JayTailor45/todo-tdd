const httpMocks = require("node-mocks-http");

const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../models/todo.model");

const newTodo = require('../mock-data/new-todo.json');

TodoModel.create = jest.fn();

describe("TodoController.createTodo", () => {
  it("Should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });
  it("Should call TodoModel.create", () => {
    let req, res, next;

    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;

    req.body = newTodo;

    TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });
});
