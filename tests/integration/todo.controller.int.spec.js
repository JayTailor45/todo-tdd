const request = require("supertest");

const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";
let firstTodo, newTodoId;

describe(endpointUrl, () => {
  it("POST " + endpointUrl, async () => {
    const response = await request(app).post(endpointUrl).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
    newTodoId = response.body._id;
  });
  it(
    "should return error 500 on malformed data with POST " + endpointUrl,
    async () => {
      const response = await request(app).post(endpointUrl).send({
        title: "Missing done property",
      });
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: "Todo validation failed: done: Path `done` is required.",
      });
    }
  );

  it("GET " + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl).send();
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    firstTodo = response.body[0];
  });

  it("GET by id " + endpointUrl + "/:todoId", async () => {
    const response = await request(app)
      .get(endpointUrl + firstTodo._id)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBe(firstTodo.done);
  });
  it("GET by id does not exist", async () => {
    const response = await request(app)
      .get(endpointUrl + "6ad9d619bd30328cb819d345")
      .send();
    expect(response.statusCode).toBe(404);
  });

  it("PUT by id " + endpointUrl + ":/todoId", async () => {
    const testData = { title: "Integration Test for PUT request", done: true };
    const response = await request(app)
      .put(endpointUrl + newTodoId)
      .send(testData);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(testData.title);
    expect(response.body.done).toBe(testData.done);
  });
});
