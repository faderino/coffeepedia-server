const request = require("supertest");
const app = require("../app");
const { User } = require("../models/index");

const userData = {
  email: "admin@gmail.com",
  password: "admin",
  username: "admin",
  phoneNumber: "088888888888",
  address: "Bandung",
  balance: 0,
};

afterAll(async () => {
  await User.truncate({
    cascade: true,
    restartIdentity: true,
  });
}, 30000);

describe("User Test", () => {
  it("should return successfully created new User", async () => {
    const res = await request(app).post("/register").send(userData).expect(201);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.id).toBe(1);
    expect(res.body.username).toBe("admin");
    expect(res.body.password).toEqual(expect.any(String));
    expect(res.body.phoneNumber).toBe("088888888888");
    expect(res.body.address).toBe("Bandung");
    expect(res.body.balance).toBe(0);
    expect(res.body.createdAt).toEqual(expect.any(String));
    expect(res.body.createdAt).toEqual(expect.any(String));
  });

  it("should return server error when created new User", async () => {
    const res = await request(app).post("/register").send().expect(400);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toEqual(expect.any(Array) || expect.any(String));
  });

  it("should return accesstoken when logged in", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "admin@gmail.com", password: "admin" })
      .expect(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.id).toBe(1);
    expect(res.body.username).toBe("admin");
    expect(res.body.balance).toBe(0);
    expect(res.body.accesstoken).toEqual(expect.any(String));
  });

  it("should return error when invalid email", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "admisssn@gmail.com", password: "admin" })
      .expect(401);
    console.log(res.body);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe("Email or Password invalid");
  });

  it("should return error when invalid password", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "admin@gmail.com", password: "asdadmin" })
      .expect(401);
    console.log(res.body);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toBe("Email or Password invalid");
  });
});
