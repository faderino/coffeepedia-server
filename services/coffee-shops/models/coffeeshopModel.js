const { getDb } = require("../config/mongoConnection");
const { addValidator } = require("../helpers/validator");

class Coffeeshop {
  static coffeeshop() {
    const database = getDb();
    return database.collection("coffeeshops");
  }

  static async addCoffeeshop(data) {
    try {
      const invalid = addValidator(data);
      if (invalid) {
        throw invalid;
      }
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
      if (!response) {
        throw { name: "not found", statusCode: 404 };
      }
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
      if (coffeeshop.deletedCount === 0) {
        throw { name: "not found", statusCode: 404 };
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Coffeeshop;
