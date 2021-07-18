const request = require("supertest");
const app = require("../server");

describe("Test the '/cheeses' path", () => {
  test("'/cheeses/add/' adds a cheese", async () => {
    const response = await request(app)
      .post("/cheeses/add")
      .send({ id: 1, name: "cheddar", pricePerKilo: 4.95 });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe(
      "cheddar was added to the list of cheeses!"
    );
  });

  test("can't add a cheese without all the proper fields", async () => {
    const response01 = await request(app)
      .post("/cheeses/add")
      .send({ cheese: { id: 2, name: "brie", price: 4.95 } });
    expect(response01.statusCode).toBe(400);
    const response02 = await request(app)
      .post("/cheeses/add")
      .send({ cheese: { name: "brie", pricePerKilo: 4.95 } });
    expect(response02.statusCode).toBe(400);
    const response03 = await request(app)
      .post("/cheeses/add")
      .send({ cheese: { id: 2, cheeseName: "brie", pricePerKilo: 4.95 } });
    expect(response03.statusCode).toBe(400);
  });

  test("'/cheeses' gets all the cheeses added to 'cheese/add' endpoint", async () => {
    const addCheddar = await request(app)
      .post("/cheeses/add")
      .send({ id: 1, name: "cheddar", pricePerKilo: 4.95 });
    expect(addCheddar.body.message).toBe(
      "a cheese with an id of 1 already exists"
    );
    expect(addCheddar.statusCode).toBe(409);
    const addBrie = await request(app)
      .post("/cheeses/add")
      .send({ id: 2, name: "brie", pricePerKilo: 5.49 });
    expect(addBrie.statusCode).toBe(201);
    expect(addBrie.body.message).toBe("brie was added to the list of cheeses!");
    const response = await request(app).get("/cheeses");
    expect(response.body).toEqual([
      { id: 1, name: "cheddar", pricePerKilo: 4.95 },
      { id: 2, name: "brie", pricePerKilo: 5.49 },
    ]);
  });
});
