const seedArticles = require('./articles.json');
const { getDB } = require('../config/connection.js');


async function doSeedArticle() {
    const db = getDB()
    await db.collection('articles').insertMany(seedArticles)
    console.log(seedArticles);
    console.log('masuk seed')
}

doSeedArticle()