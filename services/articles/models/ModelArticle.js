const { getDB } = require('../config/connection');
const { ObjectId } = require('mongodb');

class Article {

    static async findAllArticle() {
        console.log('masuk model find all')
    }
    static async findArticleById() {
        console.log('masuk model find by id')
    }

}

module.exports = Article