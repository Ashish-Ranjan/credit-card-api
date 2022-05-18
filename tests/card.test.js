const request = require("supertest");
const app = require("../src/app");
const Card = require("../src/models/card");
const validCard = {
  name: "Test User 1",
  cardnumber: "8888888888888888",
  limit: 5000,
};

beforeEach(async () => {
  await Card.deleteMany();
  await new Card(validCard).save();
});

test("Should add a new card", async () => {
  const response = await request(app)
    .post("/addnewcard")
    .send({
      name: "Test User 2",
      cardnumber: "6304219447607087665",
      limit: 5000,
    })
    .expect(201);
  const card = await Card.findById(response.body._id);
  expect(card).not.toBeNull();
});

test("Should fail duplicate cardnumber in db", async () => {
    const response = await request(app)
      .post("/addnewcard")
      .send(validCard)
      .expect(400);
    const card = await Card.findById(response.body._id);
    expect(response.body._message).toBe("cardnumber already exists");
  });

test("Should not add a new card with length > 19", async () => {
  const response = await request(app)
    .post("/addnewcard")
    .send({
      name: "Test User 3",
      cardnumber: "63042194476070876656",
      limit: 3000,
    })
    .expect(400);
  expect(response.body._message).toBe("Card validation failed");
});

test("Should fail to add an invalid Card", async () => {
  const response = await request(app)
    .post("/addnewcard")
    .send({
      name: "Test User 4",
      cardnumber: "8888888888888889",
      limit: 3000,
    })
    .expect(400);
  expect(response.body._message).toBe("Card validation failed");
});

test("Should fail when cardnumber is not a string", async () => {
  const response = await request(app)
    .post("/addnewcard")
    .send({
      name: "Test User 4",
      cardnumber: 8888888888888888,
      limit: 3000,
    })
    .expect(400);
  expect(response.body._message).toBe("cardnumber must be a string");
});

test("Should fail when name is not a string", async () => {
  const response = await request(app)
    .post("/addnewcard")
    .send({
      name: 56465465465,
      cardnumber: "8888888888888888",
      limit: 3000,
    })
    .expect(400);
  expect(response.body._message).toBe("name must be a string");
});

test("Should fail when limit is not a number", async () => {
  const response = await request(app)
    .post("/addnewcard")
    .send({
      name: "Test User 5",
      cardnumber: "8888888888888888",
      limit: "no value",
    })
    .expect(400);
  expect(response.body._message).toBe("limit must be a number");
});

test("Should fail when name is required in payload", async () => {
  const response = await request(app)
    .post("/addnewcard")
    .send({
      cardnumber: "8888888888888888",
      limit: 5500,
    })
    .expect(400);
  expect(response.body._message).toBe("name must be a string");
});

test("Should fail when cardnumber is required in payload", async () => {
  const response = await request(app)
    .post("/addnewcard")
    .send({
      name: "Test User 6",
      limit: 3000,
    })
    .expect(400);
  expect(response.body._message).toBe("cardnumber must be a string");
});

test("Should fail when limit is required in payload", async () => {
  const response = await request(app)
    .post("/addnewcard")
    .send({
      name: "Test User 6",
      cardnumber: "8888888888888888",
    })
    .expect(400);
  expect(response.body._message).toBe("limit must be a number");
});

test("Should return all the cards", async () => {
  const response = await request(app).get("/getallcards").send().expect(200);
  expect(response.body).toHaveLength(1);
});

test("Should return 404 the cards", async () => {
    const response = await request(app).get("/getallcard").send().expect(404);
});
