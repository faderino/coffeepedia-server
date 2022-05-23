const { MongoClient, ServerApiVersion } = require("mongodb");

let uri = "";

if (process.env.NODE_ENV === "production") {
  uri = process.env.MONGO_DB_URI;
} else {
  uri = process.env.MONGO_DB_URI;
}

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

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
