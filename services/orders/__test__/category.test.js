const request = require("supertest");
const app = require("../app");
const { Category } = require("../models/index");

beforeAll(async () => {
  await Category.create({
    name: "Kopi",
  });
}, 30000);

afterAll(async () => {
  await Category.truncate({
    cascade: true,
    restartIdentity: true,
  });
}, 30000);

describe("Category Test", () => {
  it("should return all Categories", async () => {
    const res = await request(app).get("/categories").expect(200);

    expect(res.body).toEqual(expect.any(Array));
    expect(res.body[0]).toEqual(expect.any(Object));
    expect(res.body[0].id).toEqual(expect.any(Number));
    expect(res.body[0].name).toEqual(expect.any(String));
  });

  it("should return all Categories", async () => {
    const res = await request(app).get("/categories").expect(200);

    expect(res.body).toEqual(expect.any(Array));
    expect(res.body[0]).toEqual(expect.any(Object));
    expect(res.body[0].id).toEqual(expect.any(Number));
    expect(res.body[0].name).toEqual(expect.any(String));
  });
});
