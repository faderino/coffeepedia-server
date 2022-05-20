const request = require("supertest");
const app = require("../app");
const { Order, Category, User, Item, OrderDetail } = require("../models/index");
const access_token = "ada";

beforeAll(async (done) => {
  await OrderDetail.truncate({
    cascade: true,
    restartIdentity: true,
  });

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

  await User.create({
    email: "admin@gmail.com",
    password: "admin",
    username: "admin",
    phoneNumber: "088888888888",
    address: "Bandung",
    balance: 0,
  });
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
});

describe("Order Test", () => {
  it("should return successfully created Order", async () => {
    const res = await request(app)
      .post("http://localhost:4003/orders/1aasss")
      .set("access_token", access_token)
      .expect(201);

    console.log(res.body);
    expect(res.body).toEqual(expect.any(Object));
    // expect(res.body.data.id).toBe(1);
  });

  // it("should return bookmarked item for current customer", async () => {
  //   const res = await request(app)
  //     .get("/customer/bookmark")
  //     .set("access_token", customerToken)
  //     .expect(200);

  //   expect(res.body.data).toEqual(expect.any(Array));
  //   expect(res.body.data.length).toBeGreaterThan(0);
  // });

  // it("should return error due to attempting to input a non existed item to bookmark", async () => {
  //   const res = await request(app)
  //     .post("/customer/bookmark/100")
  //     .set("access_token", customerToken)
  //     .expect(404);

  //   expect(res.body.message).toEqual("Data not found");
  // });

  // it("should return error due to unauthenicated client", async () => {
  //   const res = await request(app).get("/customer/bookmark").expect(401);

  //   expect(res.body.message).toEqual("Please login first!");
  // });

  // it("should return error due to unauthenticated role of logged in user", async () => {
  //   const res = await request(app)
  //     .get("/customer/bookmark")
  //     .set("access_token", adminToken)
  //     .expect(401);

  //   expect(res.body.message).toEqual("You are not a customer!");
  // });
});
