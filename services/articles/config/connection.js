const { MongoClient } = require('mongodb');

let uri = process.env.URI_MONGO
if (process.env.NODE_ENV === 'production') {
    uri = process.env.URI_MONGO
} else {
    uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.4.1'
}
const client = new MongoClient(uri);

let db;
async function connection() {
    try {
        await client.connect()
        db = client.db('FProject-Article')
    } catch (error) {
        console.log(error, "!!! ERROR CONNECTION.JS_SERVER-USER-CONFIG !!!");
    }
}

function getDB() {
    return db
}

module.exports = { connection, getDB, client }