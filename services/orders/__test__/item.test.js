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
  it("should return all Items", async () => {
    const res = await request(app)
      .get("/items")
      .set("accesstoken", accesstoken)
      .expect(200);

    expect(res.body).toEqual(expect.any(Array));
    expect(res.body[0]).toEqual(expect.any(Object));
    expect(res.body[0].id).toEqual(expect.any(Number));
    expect(res.body[0].CategoryId).toEqual(expect.any(Number));
    expect(res.body[0].name).toEqual(expect.any(String));
    expect(res.body[0].description).toEqual(expect.any(String));
    expect(res.body[0].imageUrl).toEqual(expect.any(String));
    expect(res.body[0].price).toEqual(expect.any(Number));
  });

  it("should return one Item", async () => {
    const res = await request(app)
      .get("/items/1")
      .set("accesstoken", accesstoken)
      .expect(200);

    const response = res.body.Item;

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe("Found data with ID 1 Success");
    expect(response.id).toBe(1);
    expect(response.CategoryId).toEqual(expect.any(Number));
    expect(response.name).toEqual(expect.any(String));
    expect(response.description).toEqual(expect.any(String));
    expect(response.imageUrl).toEqual(expect.any(String));
    expect(response.price).toEqual(expect.any(Number));
  });

  it("should fail find one Items", async () => {
    const res = await request(app)
      .get("/items/1000")
      .set("accesstoken", accesstoken)
      .expect(404);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`DATA NOT FOUND`);
  });
});
