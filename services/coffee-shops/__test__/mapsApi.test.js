const request = require("supertest");
const axios = require("axios");
const Maps = require("../models/mapsModel");
const app = require("../app");

jest.mock("axios");

describe("acceptance test for mapsApi feature", () => {
  beforeAll(() => {
    const response = {
      data: {
        status: "OK",
        results: [
          {
            place_id: "ChIJ5ec-ZqNZei4RA3sWixI4LmQ",
            name: "Kene Coffee House",
            vicinity:
              "Jl. Kaliwaru No.84, Kaliwaru, Condongcatur, Kabupaten Sleman",
            photos: [
              {
                height: 715,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/114288037740944169887">joe ki</a>',
                ],
                photo_reference:
                  "Aap_uECV0oHBNzVTxzheKL84vC92RomhgvGhKCYumNwN-aPkcH2RHq0MuZNWNup2s5bU4CZ3iOu3YDyGSjYx3HELRsicv2cK9i_Er-zmMCsxKDuCCCV5fR5K3ioMOZONSmQwtIQYttPgOKhL9qEmFauZ9IegtHIjBtg2eu2CMMIJEhS6yCkA",
                width: 1024,
              },
            ],
            geometry: {
              location: {
                lat: -7.761909200000001,
                lng: 110.3967393,
              },
              viewport: {
                northeast: {
                  lat: -7.760636420107278,
                  lng: 110.3980832798927,
                },
                southwest: {
                  lat: -7.763336079892722,
                  lng: 110.3953836201073,
                },
              },
            },
            rating: 4.6,
            user_ratings_total: 765,
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
            icon_background_color: "#FF9E67",
            icon_mask_base_uri:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
            opening_hours: {
              open_now: false,
            },
          },
        ],
      },
    };
    axios.get.mockResolvedValue(response);
  });

  test("fetch nearby place from maps api", (done) => {
    request(app)
      .get(
        "/maps/nearbySearch?latitude=-7.757787936273116&longitude=110.40891080813468"
      )
      .end(function (err, res) {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body[0]).toHaveProperty("place_id", expect.any(String));
        expect(res.body[0]).toHaveProperty("name", expect.any(String));
        expect(res.body[0]).toHaveProperty("geometry", expect.any(Object));
        expect(res.body[0]).toHaveProperty("rating", expect.any(Number));
        done();
      });
  });
});

describe("error test for mapsApi feature", () => {
  beforeAll(() => {
    const response = {
      data: {
        status: "INVALID_REQUEST",
      },
    };
    axios.get.mockResolvedValue(response);
  });

  test("should get internal server error", (done) => {
    request(app)
      .get("/maps/nearbySearch?latitude=-7.757787936273116")
      .end(function (err, res) {
        expect(res.status).toBe(500);
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("error", expect.any(Object));
        expect(res.body.error).toHaveProperty("message", "Internal Server Error");
        done();
      });
  });
});
