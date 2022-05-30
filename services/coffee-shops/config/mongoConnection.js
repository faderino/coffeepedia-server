const { MongoClient } = require("mongodb");

let uri = "";

if (process.env.NODE_ENV !== "test") {
  uri = process.env.MONGO_DB_URI;
} else {
  uri = process.env.MONGO_DB_URI;
}

const client = new MongoClient(uri);

let db;
async function connection() {
  try {
    await client.connect();
    db = client.db("coffeepedia");
  } catch (err) {
    console.log(err);
  }
}

function getDb() {
  return db;
}

module.exports = {
  connection,
  getDb,
  client,
};
