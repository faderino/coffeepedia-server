const request = require("supertest");
const app = require("../app");
const { createToken } = require("../helpers/jwt");
const { getCurrentTimestamp } = require("../helpers/Midtrans");
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

describe("Payment Test Test", () => {
  it("should return payment token", async () => {
    const res = await request(app)
      .post("/payments")
      .set("accesstoken", accesstoken)
      .send({
        email: "admin@gmail.com",
        totalPrice: 100000,
        OrderId: getCurrentTimestamp(),
      })
      .expect(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.redirect_url).toEqual(expect.any(String));
  });

  it("should return ISE", async () => {
    const res = await request(app)
      .post("/payments")
      .set("accesstoken", accesstoken)
      .expect(500);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe("INTERNAL SERVER ERROR");
  });
});
