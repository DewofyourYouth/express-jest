const request = require("supertest");
const app = require("../server");

describe("Test the '/' path", () => {
  test("It should respond to the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
  test("It should have a body of 'App is running!", async () => {
    const response = await request(app).get("/");
    expect(response.body.message).toBe("App is running!");
  });
});

describe("Test the '/add/:a/:b' path", () => {
  test("It should respond to the GET method", async () => {
    const response = await request(app).get("/add/1/2/");
    expect(response.statusCode).toBe(200);
  });
  test("It should add two parameters", async () => {
    const response1 = await request(app).get("/add/1/2/");
    const response2 = await request(app).get("/add/3/12/");
    const response3 = await request(app).get("/add/8/2/");
    expect(response1.body.message).toBe(3);
    expect(response2.body.message).toBe(15);
    expect(response3.body.message).toBe(10);
  });
  test("It needs two parameters", async () => {
    const response = await request(app).get("/add/2/");
    expect(response.statusCode).toBe(404);
  });
});
