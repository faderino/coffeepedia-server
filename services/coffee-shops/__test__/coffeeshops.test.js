const request = require("supertest");

const app = require("../app");
const { connection, client } = require("../config/mongoConnection");

beforeAll(async () => {
  process.env.NODE_ENV = 'test'
  await connection();
});

afterAll(() => {
  process.env.NODE_ENV = 'development'
  client.close()
})

const coffeeshopsInput = {
  place_id: "ChIJ8zEd4CRZei4Rf980HBCUdzg",
  name: "Kaktus Coffee Place",
};

describe("acceptance test for coffeeshops feature", () => {
  test("add coffeeshop feature", (done) => {
    request(app)
      .post("/coffeeshops/addCoffeeshop")
      .send(coffeeshopsInput)
      .end(function (err, res) {
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("message", expect.any(String));
        expect(res.body.message).toBe("place_id added successfully");
        done();
      });
  });

  test("find all coffeeshops feature", (done) => {
    request(app)
      .get("/coffeeshops/")
      .end(function (err, res) {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body[0]).toHaveProperty("place_id", expect.any(String));
        done();
      });
  });

  test("find coffeeshop by place_id feature", (done) => {
    request(app)
      .get(`/coffeeshops/${coffeeshopsInput.place_id}`)
      .end(function (err, res) {
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("place_id", coffeeshopsInput.place_id);
        expect(res.body).toHaveProperty("name", coffeeshopsInput.name);
        done();
      });
  });

  test("delete coffeeshop by place_id feature", (done) => {
    request(app)
      .delete(`/coffeeshops/delete/${coffeeshopsInput.place_id}`)
      .end(function (err, res) {
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty(
          "message",
          "coffeeshop deleted successfully"
        );
        done();
      });
  });
});

describe("error test for coffeeshops feature", () => {
  test("undefined place_id in add feature", (done) => {
    request(app)
      .post("/coffeeshops/addCoffeeshop")
      .send({ name: "Test Coffee" })
      .end(function (err, res) {
        expect(res.status).toBe(400);
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("error", expect.any(Object));
        expect(res.body.error).toHaveProperty(
          "message",
          "place_id is Required"
        );
        done();
      });
  });

  test("empty string place_id in add feature", (done) => {
    request(app)
      .post("/coffeeshops/addCoffeeshop")
      .send({ place_id: "", name: "Test Coffee" })
      .end(function (err, res) {
        expect(res.status).toBe(400);
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("error", expect.any(Object));
        expect(res.body.error).toHaveProperty(
          "message",
          "place_id is Required"
        );
        done();
      });
  });

  test("undefined name in add feature", (done) => {
    request(app)
      .post("/coffeeshops/addCoffeeshop")
      .send({ place_id: "ChIJ8zEd4CRZei4Rf980HBCUdzg" })
      .end(function (err, res) {
        expect(res.status).toBe(400);
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("error", expect.any(Object));
        expect(res.body.error).toHaveProperty("message", "name is Required");
        done();
      });
  });

  test("undefined name in add feature", (done) => {
    request(app)
      .post("/coffeeshops/addCoffeeshop")
      .send({ place_id: "ChIJ8zEd4CRZei4Rf980HBCUdzg", name: "" })
      .end(function (err, res) {
        expect(res.status).toBe(400);
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("error", expect.any(Object));
        expect(res.body.error).toHaveProperty("message", "name is Required");
        done();
      });
  });

  test("wrong place_id in find by place_id feature", (done) => {
    request(app)
      .get("/coffeeshops/test")
      .end(function (err, res) {
        expect(res.status).toBe(404);
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("error", expect.any(Object));
        expect(res.body.error).toHaveProperty("message", "Data not Found");
        done();
      });
  });

  test("wrong place_id in delete by place_id feature", (done) => {
    request(app)
      .delete("/coffeeshops/delete/test")
      .end(function (err, res) {
        expect(res.status).toBe(404);
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("error", expect.any(Object));
        expect(res.body.error).toHaveProperty("message", "Data not Found");
        done();
      });
  });
});
