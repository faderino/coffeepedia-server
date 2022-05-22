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
    static async addArticle(data) {
        try {
            const {
                title,
                content,
                imageUrl,
                author,
                tag,
                createdAt
            } = data
            const response = await this.article().insertOne({
                title,
                content,
                imageUrl,
                author,
                tag,
                createdAt
            })
        } catch (error) {
            throw error
        }
    }
}

module.exports = Article