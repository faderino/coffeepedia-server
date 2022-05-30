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

describe("Order Detail Test", () => {
  it("should return successfully created OrderDetails", async () => {
    const res = await request(app)
      .post("/orderDetails/1")
      .set("accesstoken", accesstoken)
      .send({
        OrderId: 1,
        quantity: 1,
        name: "Kopi",
        price: 25000,
        imageUrl: "www.google.com",
      })
      .expect(201);

    const response = res.body.response;
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`OrderDetail Created Success`);
    expect(response.id).toBe(1);
    expect(response.OrderId).toBe(1);
    expect(response.ItemId).toBe(1);
    expect(response.name).toBe("Kopi");
    expect(response.price).toBe("25000");
    expect(response.quantity).toBe(1);
    expect(response.imageUrl).toBe("www.google.com");
  });

  it("should tell if orders already made", async () => {
    const res = await request(app)
      .post("/orderDetails/1")
      .set("accesstoken", accesstoken)
      .send({
        OrderId: 1,
        quantity: 1,
        name: "Kopi",
        price: 25000,
        imageUrl: "www.google.com",
      })
      .expect(400);

    console.log(res.body);
    res.body;
    expect(res.body.message).toBe(
      `Item sudah ada dikerjanjang. perbaharui isi keranjang?`
    );
    expect(res.body.isOrdered).toBe(`true`);
  });

  it("should return error ISE created OrderDetails", async () => {
    const res = await request(app)
      .post("/orderDetails/1")
      .set("accesstoken", accesstoken)
      .expect(500);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`INTERNAL SERVER ERROR`);
  });

  it("should return decreased quantity order by one", async () => {
    const res = await request(app)
      .patch("/orderDetails/1")
      .set("accesstoken", accesstoken)
      .send({
        action: "decrement",
        quantity: 10,
      })
      .expect(200);

    console.log(res.body);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toEqual(expect.any(String));
  });

  it("should return updated quantity", async () => {
    const res = await request(app)
      .patch("/orderDetails/1")
      .set("accesstoken", accesstoken)
      .send({
        action: "increment",
        quantity: 10,
      })
      .expect(200);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toEqual(expect.any(String));
  });

  it("should return increased quantity order by one", async () => {
    const res = await request(app)
      .patch("/orderDetails/1")
      .set("accesstoken", accesstoken)
      .send({
        action: "true",
        quantity: 10,
      })
      .expect(200);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toEqual(expect.any(String));
  });

  it("should return not matched OrderDetail for Patch", async () => {
    const res = await request(app)
      .patch("/orderDetails/1000")
      .set("accesstoken", accesstoken)
      .send({
        action: "decrement",
        quantity: 10,
      })
      .expect(404);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`DATA NOT FOUND`);
  });

  it("should return not matched OrderDetail for Delete", async () => {
    const res = await request(app)
      .delete("/orderDetails/1000")
      .set("accesstoken", accesstoken)
      .expect(404);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`DATA NOT FOUND`);
  });

  it("should delete one OrderDetail", async () => {
    const res = await request(app)
      .delete("/orderDetails/1")
      .set("accesstoken", accesstoken)
      .expect(200);

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe(`Delete success`);
  });
});
