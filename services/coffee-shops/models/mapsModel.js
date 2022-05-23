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
}

module.exports = Model;
