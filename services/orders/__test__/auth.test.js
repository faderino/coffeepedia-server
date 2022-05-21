const request = require("supertest");
const app = require("../app");
const { createToken } = require("../helpers/jwt");
const { Order, Category, User, Item } = require("../models/index");

let accesstoken;

const userData = {
  email: "admin@gmail.com",
  password: "admin",
  username: "admin",
  phoneNumber: "088888888888",
  address: "Bandung",
  balance: 0,
};

beforeAll(async () => {
  const user = await User.create(userData);

  const payload = {
    id: user.id,
    email: user.email,
  };

  accesstoken = createToken(payload);

  await Category.create({
    name: "Kopi",
  });
  await Item.create({
    CategoryId: 1,
    name: "Kopi",
    price: "25000",
    description: "Kopi dan Susu Bersatu",
    imageUrl: "www.google.com",
  });

  await Order.create({
    UserId: 1,
    CoffeeShopId: "Idnomor1darigoogle",
    status: "unpaid",
  });
}, 30000);

afterAll(async () => {
  await Order.truncate({
    cascade: true,
    restartIdentity: true,
  });

  await Item.truncate({
    cascade: true,
    restartIdentity: true,
  });
  await Category.truncate({
    cascade: true,
    restartIdentity: true,
  });
  await User.truncate({
    cascade: true,
    restartIdentity: true,
  });
}, 30000);

describe("Item Test", () => {
  it("should return invalid accesstoken error", async () => {
    const res = await request(app).get("/orders").expect(401);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`Unauthorized`);
  });

  it("should return invalid accesstoken error", async () => {
    const res = await request(app)
      .get("/orders")
      .send(
        "accesstoken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhZG1pbjEwMDAwQGdtYWlsLmNvbSIsImlhdCI6MTY1MzA5ODI2OX0.rIRu5m9CHIwRVED6UV6TBD-tQ5jvRRSUa6ZOcbFekL0"
      )
      .expect(401);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`Unauthorized`);
  });
});
