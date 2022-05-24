const { MongoClient } = require("mongodb");

let uri = "";

if (process.env.NODE_ENV !== "test") {
  uri = process.env.URI_MONGO;
} else {
  uri = process.env.URI_MONGO;
}

const client = new MongoClient(uri);

let db;
async function connection() {
  try {
    await client.connect();
    db = client.db("coffeepedia");
  } catch (error) {
    console.log(error, "!!! ERROR CONNECTION.JS_SERVER-USER-CONFIG !!!");
  }
}

function getDB() {
  return db;
}

module.exports = { connection, getDB, client };
