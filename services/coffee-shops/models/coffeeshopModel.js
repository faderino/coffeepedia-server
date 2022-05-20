const { getDb } = require("../config/mongoConnection");

class Coffeeshop {
  static coffeeshop() {
    const database = getDb();
    return database.collection("coffeeshops");
  }

  static async addCoffeeshop(data) {
    try {
      const { place_id, name } = data;
      await this.coffeeshop().insertOne({
        place_id,
        name,
      });
    } catch (err) {
      throw err;
    }
  }

  static async findAll() {
    try {
      const response = await this.coffeeshop().find().toArray();
      console.log(response);
      return response;
    } catch (err) {
      throw err;
    }
  }

  static async findByPlaceId(place_id) {
    try {
      const response = await this.coffeeshop().findOne({
        place_id,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  static async delete(place_id) {
    try {
      const coffeeshop = await this.coffeeshop().deleteOne({
        place_id,
      });

      if (coffeeshop.deleteCount === 0) {
        throw { name: "not found", statusCode: 404 };
      }
    } catch (error) {
      throw err;
    }
  }
}

module.exports = Coffeeshop;
