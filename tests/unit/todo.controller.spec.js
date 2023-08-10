const httpMocks = require("node-mocks-http");

const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../models/todo.model");

const newTodo = require("../mock-data/new-todo.json");

TodoModel.create = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("TodoController.createTodo", () => {
  it("Should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });
  it("Should call TodoModel.create", () => {
    req.body = newTodo;
    TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });
});
