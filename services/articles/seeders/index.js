const seedArticles = require('./Dataarticles');
// const { connection, getDB } = require('../config/connection.js');


async function doSeedArticle() {
    const data = JSON.parse(seedArticles)
    console.log(data);
    console.log('masuk seed')
}

doSeedArticle()