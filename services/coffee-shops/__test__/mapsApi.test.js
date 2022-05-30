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

describe("acceptance test for place detail feature", () => {
  beforeAll(() => {
    const response = {
      data: {
        status: "OK",
        result: {
          place_id: "ChIJV0vZTKrxaS4Rajx957afEeg",
          name: "Djournal House",
          rating: 4.5,
          user_ratings_total: 665,
          opening_hours: {
            open_now: false,
            periods: [
              {
                close: {
                  day: 0,
                  time: "2200",
                },
                open: {
                  day: 0,
                  time: "0900",
                },
              },
              {
                close: {
                  day: 1,
                  time: "2200",
                },
                open: {
                  day: 1,
                  time: "0900",
                },
              },
              {
                close: {
                  day: 2,
                  time: "2200",
                },
                open: {
                  day: 2,
                  time: "0900",
                },
              },
              {
                close: {
                  day: 3,
                  time: "2200",
                },
                open: {
                  day: 3,
                  time: "0900",
                },
              },
              {
                close: {
                  day: 4,
                  time: "2200",
                },
                open: {
                  day: 4,
                  time: "0900",
                },
              },
              {
                close: {
                  day: 5,
                  time: "2200",
                },
                open: {
                  day: 5,
                  time: "0900",
                },
              },
              {
                close: {
                  day: 6,
                  time: "2200",
                },
                open: {
                  day: 6,
                  time: "0900",
                },
              },
            ],
            weekday_text: [
              "Monday: 9:00 AM – 10:00 PM",
              "Tuesday: 9:00 AM – 10:00 PM",
              "Wednesday: 9:00 AM – 10:00 PM",
              "Thursday: 9:00 AM – 10:00 PM",
              "Friday: 9:00 AM – 10:00 PM",
              "Saturday: 9:00 AM – 10:00 PM",
              "Sunday: 9:00 AM – 10:00 PM",
            ],
          },
          price_level: 2,
          vicinity: "5, Jalan Gunawarman No.11A, RT.6/RW.6, Selong",
          photos: [
            "https://maps.googleapis.com/maps/api/place/photo?photo_reference=Aap_uEAix4x_5Pnz3-HtalJA6tjYhEJJHz4Ju3vk4_w9kD_F4usRoLNpsxrxKWOEBHhgIItDzt3G0zXMmDnbIfDYH62qU07O72Am59Lpdrd7cnxEut9asTrZgTPz_oK2vDIZk9OuybToWd4w65MMc-w-tRsU0LkGwUnfuNk4i_0CsgK4yE8I&maxwidth=620&key=",
            "https://maps.googleapis.com/maps/api/place/photo?photo_reference=Aap_uEC_rPy4LWnbrCSfIsYN5xxT9KPqfPFgCvGGXVwpBV0YPR4qgz7JqLVYdhiaBUhZowdQkRVvRSt8GNYnA_e_Dpk4Dq0MIsOyUvSnZiwFddximNNihA9VpG1R91OFtlSzSOn7r2jfQOERGWgU4E9urYhnfRlW9swuotDe5294pIAHq7DA&maxwidth=620&key=",
            "https://maps.googleapis.com/maps/api/place/photo?photo_reference=Aap_uEAXRCtUrrXq7W-0TzU8XZsO8eZUxhmvweF_zX7u1BuHx_qEfLUiAYbo9gSD754Um-CoGIRmNwWh7Q-Q4Z3q0fDsiMbXxnfCbL_-FY_G7BDEz-XdLCQkyRInGh7H5vbVF8auo0tyRRwQPeH_C_KfSxbTwrZJIGEkELQ-3qKca38H3UmF&maxwidth=620&key=",
            "https://maps.googleapis.com/maps/api/place/photo?photo_reference=Aap_uEDcY-bPDvhN9SQI2NoaE2fgC3o3Tf495x56wQeVoR0EWr68Fv2Ufvja9oezDtvHF3L7lXZXKwRX-nc85w9UdiypQJ_5OiZWSDDfwnIrSBlDXmOquNLPM0aDjpbvjYHoGwqHUpD95WKUxsFWBAjUSLp3Z6TZiizbSEVHxue8fy9rj1Wg&maxwidth=620&key=",
            "https://maps.googleapis.com/maps/api/place/photo?photo_reference=Aap_uEDAPt6qx62lnFoX9LLMAZwBasl6jKvIkhx0vBHcMDFUIwQFlkrE9uHKkWRvwR3yB6oeUIYXQHHwLWRKm7ZriEEygkI3FOkJH2LxbD996D8quqd6GzJ17U_sK4smvBO8RIW7HA5yK86UVBAFe9BbXmfUWzv4d37JlWUxULK3yb8ivCH4&maxwidth=620&key=",
            "https://maps.googleapis.com/maps/api/place/photo?photo_reference=Aap_uED2O0bvkIXlbUROLmsSVCg5udbPWBJr6k0lwMqfM7GF8DuTj1heaJ4m0Vl_6nHwuxMAI2u-fYbhklUinirE8R30VOEaehs0XsNnLKa17KRw032LNKiN7QOhqc5GUaFR9IxxWCD-DWHUS7cMRCMqtIqSTyhFwYnXZ8k4SK4hmKzLZ6OF&maxwidth=620&key=",
            "https://maps.googleapis.com/maps/api/place/photo?photo_reference=Aap_uECVt9osl9dFpsNeizvnr1TIB40PuxoV8VbFDAJazdvAPFN0yNQs9XwDh4OgDMws0znKEJewva-4ScGpYmqWPREfjyTfFcJd32gHNS83e6ckBKWVYH9pD05ZlcUqIHva4pbVBJkYukKYvbi9_O-PkJXMJkSEkA9ialBRQtb5ORjjaqYH&maxwidth=620&key=",
            "https://maps.googleapis.com/maps/api/place/photo?photo_reference=Aap_uEAU-oD9-pt5yOZJ7L4MdjkLvkBaTVO7CshlejMbfKA-LsO_njx1gfUVXiRGGZMjJB57pWsRuD5fsJ60SD8QHD5qxEAA6X35CFBf0nas7QK9iyZ7Be-BpGjhDrtQxmvlBCotd99mXsoahTLW1Zoe5mwOjZ4di2fUh4sCmYp3EqBE1cFZ&maxwidth=620&key=",
            "https://maps.googleapis.com/maps/api/place/photo?photo_reference=Aap_uEB-Ms-GxwHfe_d0RIspChWHhF786KNowD2SEy7-Duh55FX_ubU6zlgzI2nNHJcHwVuCtcFtvpnrHwUrLayD89njXRsNIBqxILQXIA38rA0wLyCaUmj6tVva-cr2jJDrvURono_Q7Nra5ZftoCpXUe3rgE_HcSzOQC7tqzPaboSaEcIw&maxwidth=620&key=",
            "https://maps.googleapis.com/maps/api/place/photo?photo_reference=Aap_uEAfc_IR2ZXaKFg3VG4uU_5Gm0wkjqrGH1Z7OdLtbgIyJhiE0_DqRQ1ZDQcwzjU9rqxs6eIP3OnsvcQPNT-8Nh-QumD-LyO32FiTtXFgMjqA3AQx1ZYMZheQyTbBz4j5OMwHyktU-4Pz3fzVNrCCjKcTBeiWJdD3kNRJ0kxIu-Gntv8C&maxwidth=620&key=",
          ],
        },
      },
    };
    axios.get.mockResolvedValue(response);
  });

  test("fetch place detail from place detail feature", (done) => {
    request(app)
      .get("/maps/placeDetail?place_id=ChIJV0vZTKrxaS4Rajx957afEeg")
      .end(function (err, res) {
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("place_id", expect.any(String));
        expect(res.body).toHaveProperty("name", expect.any(String));
        expect(res.body).toHaveProperty("photos", expect.any(Object));
        expect(res.body).toHaveProperty("rating", expect.any(Number));
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
        expect(res.body.error).toHaveProperty(
          "message",
          "Internal Server Error"
        );
        done();
      });
  });
});

describe("error test for place detail feature", () => {
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
      .get("/maps/placeDetail?place_id=ChIJV0vZTKrxaS4Rajx957afEeg")
      .end(function (err, res) {
        expect(res.status).toBe(500);
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("error", expect.any(Object));
        expect(res.body.error).toHaveProperty(
          "message",
          "Internal Server Error"
        );
        done();
      });
  });
});
