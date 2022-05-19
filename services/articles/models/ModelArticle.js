const { getDB } = require('../config/connection');
const { ObjectId } = require('mongodb');

class Article {
    static article() {
        const database = getDB()
        return database.collection('articles')
    }
    static async findAllArticle() {
        try {
            const allArticle = await this.article().find().toArray()
            return allArticle
        } catch (error) {
            console.log(error)
        }
    }
    static async findArticleById(id) {
        try {
            const selectedArticle = await this.article().findOne({
                _id: ObjectId(id)
            })
            return selectedArticle
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = Article