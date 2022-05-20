const { MongoClient, ServerApiVersion } = require('mongodb');

let uri = ''

if(process.env.NODE_ENV === 'production') {
  uri = 'mongodb+srv://kebaboyegaming2:Ayano140518@cluster0.kjyeq.mongodb.net/?retryWrites=true&w=majority'
} else {
  uri = 'mongodb://localhost:27017'
}

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let db
async function connection () {
  try {
    await client.connect()
    db = client.db("coffeepedia");
  } catch (err) {
    console.log(err)    
  }
}

function getDb () {
  return db
}

module.exports = {
  connection,
  getDb,
  client
}