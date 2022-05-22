const request = require("supertest");
const app = require("../app");
const { Category, Item } = require("../models/index");

beforeAll(async () => {
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
  await Item.truncate({
    cascade: true,
    restartIdentity: true,
  });
  await Category.truncate({
    cascade: true,
    restartIdentity: true,
  });
}, 30000);

describe("Item Test", () => {
  it("should return all Items", async () => {
    const res = await request(app).get("/items").expect(200);

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
    const res = await request(app).get("/items/1").expect(200);

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
    const res = await request(app).get("/items/1000").expect(404);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`DATA NOT FOUND`);
  });
});
