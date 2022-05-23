const { MongoClient } = require('mongodb');

const uri = process.env.URI_MONGO

const client = new MongoClient(uri);

let db;
async function connection() {
    try {
        if (process.env.NODE_ENV !== 'production') {
            await client.connect()
            db = client.db('FProject-Article-Test')
        } else {
            await client.connect()
            db = client.db('FProject-Article')
        }
    } catch (error) {
        console.log(error, "!!! ERROR CONNECTION.JS_SERVER-USER-CONFIG !!!");
    }
}

function getDB() {
    return db
}

module.exports = { connection, getDB, client }