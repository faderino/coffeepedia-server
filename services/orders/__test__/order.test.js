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

describe("Order Test", () => {
  it("should return successfully created Order", async () => {
    const res = await request(app)
      .post("/orders/1aassssssss")
      .set("accesstoken", accesstoken)
      .expect(201);

    const response = res.body.response;
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`Cart Created Success`);
    expect(response.id).toBe(2);
    expect(response.UserId).toBe(1);
    expect(response.CoffeeShopId).toBe("1aassssssss");
    expect(response.status).toBe("unpaid");
  });

  it("should return successfully Found Cart", async () => {
    const res = await request(app)
      .post("/orders/1aassssssss")
      .set("accesstoken", accesstoken)
      .expect(200);

    const response = res.body.response;
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`Cart Found`);
    expect(response.id).toBe(2);
    expect(response.UserId).toBe(1);
    expect(response.CoffeeShopId).toBe("1aassssssss");
    expect(response.status).toBe("unpaid");
  });

  // it("should return internal server error created Order", async () => {
  //   const res = await request(app)
  //     .post("/orders")
  //     .set("accesstoken", accesstoken)
  //     .expect(404);
  // });

  it("should return all Orders", async () => {
    const res = await request(app)
      .get("/orders")
      .set("accesstoken", accesstoken)
      .expect(200);

    expect(res.body).toEqual(expect.any(Array));
    expect(res.body[0]).toEqual(expect.any(Object));
    expect(res.body[0].id).toEqual(expect.any(Number));
    expect(res.body[0].UserId).toEqual(expect.any(Number));
    expect(res.body[0].CoffeeShopId).toEqual(expect.any(String));
    expect(res.body[0].status).toEqual(
      expect.stringMatching(/unpaid|ready|sent|delivered/)
    );
    expect(res.body[0].createdAt).toEqual(expect.any(String));
    expect(res.body[0].updatedAt).toEqual(expect.any(String));
    expect(res.body[0].OrderDetails).toEqual(expect.any(Array));
  });

  // it("should fail return all Orders", async () => {
  //   const res = await request(app)
  //     .get("/orders")
  //     .set("accesstoken", accesstoken)
  //     .expect(500);
  // });

  it("should return one Orders", async () => {
    const res = await request(app)
      .get("/orders/1")
      .set("accesstoken", accesstoken)
      .expect(200);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.id).toBe(1);
    expect(res.body.UserId).toEqual(expect.any(Number));
    expect(res.body.CoffeeShopId).toEqual(expect.any(String));
    expect(res.body.status).toEqual(
      expect.stringMatching(/unpaid|ready|sent|delivered/)
    );
    expect(res.body.createdAt).toEqual(expect.any(String));
    expect(res.body.updatedAt).toEqual(expect.any(String));
  });

  it("should fail find one Orders", async () => {
    const res = await request(app)
      .get("/orders/1000")
      .set("accesstoken", accesstoken)
      .expect(404);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`DATA NOT FOUND`);
  });

  it("should update one Orders", async () => {
    const res = await request(app)
      .patch("/orders/1")
      .set("accesstoken", accesstoken)
      .send({ status: "delivered" })
      .expect(200);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`Order status updated to delivered`);
  });

  it("should fail update one Orders", async () => {
    const res = await request(app)
      .patch("/orders/1000")
      .set("accesstoken", accesstoken)
      .send({ status: "delivered" })
      .expect(404);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`DATA NOT FOUND`);
  });

  it("should fail delete one Orders", async () => {
    const res = await request(app)
      .delete("/orders/1000")
      .set("accesstoken", accesstoken)
      .expect(404);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`DATA NOT FOUND`);
  });

  it("should delete one Orders", async () => {
    const res = await request(app)
      .delete("/orders/1")
      .set("accesstoken", accesstoken)
      .expect(200);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`Order with id: 1 deleted`);
  });
});
