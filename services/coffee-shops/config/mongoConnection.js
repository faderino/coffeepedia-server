const { MongoClient, ServerApiVersion } = require('mongodb');

let uri = ''

if (process.env.NODE_ENV === 'production') {
  uri = process.env.MONGO_DB_URI
} else {
  // uri = 'mongodb://localhost:27017'
  uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.4.1'
}

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let db
async function connection() {
  try {
    await client.connect()
    db = client.db("coffeepedia");
  } catch (err) {
    console.log(err)
  }
}

function getDb() {
  return db
}

module.exports = {
  connection,
  getDb,
  client
}