const axios = require("axios");
const apiKey = process.env.MAPS_API;

class Model {
  static async nearbySearch(location) {
    try {
      const { latitude, longitude } = location;
      const radius = 500;
      const type = "cafe";
      const keyword = "coffee shop";
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=${radius}&type=${type}&keyword=${keyword}&key=${apiKey}`
      );
      if (response.data.status === "OK") {
        const data = response.data.results.map((result) => {
          return {
            place_id: result.place_id,
            name: result.name,
            vicinity: result.vicinity,
            photos: result.photos,
            geometry: result.geometry,
            rating: result.rating,
            user_ratings_total: result.user_ratings_total,
            icon: result.icon,
            icon_background_color: result.icon_background_color,
            icon_mask_base_uri: result.icon_mask_base_uri,
            opening_hours: result.opening_hours,
            price: result.price,
          };
        });
        return data;
      } else {
        throw { name: "internal server error" };
      }
    } catch (err) {
      throw err;
    }
  }

  static async placeDetail(place_id) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}`
      );
      if (response.data.status === "OK") {
        const photos = response.data.result.photos.map((photo) => {
          return `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photo.photo_reference}&maxwidth=620&key=`;
        });
        const data = response.data.result;
        return {
          place_id: data.place_id,
          name: data.name,
          rating: data.rating,
          user_ratings_total: data.user_ratings_total,
          opening_hours: data.opening_hours,
          price_level: data.price_level,
          vicinity: data.vicinity,
          photos,
        };
      } else {
        throw { name: "internal server error" };
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

module.exports = Model;
