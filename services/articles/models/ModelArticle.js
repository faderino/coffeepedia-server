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
            throw error
        }
    }
    static async findArticleById(id) {
        try {
            const selectedArticle = await this.article().findOne({
                _id: ObjectId(id)
            })
            if (selectedArticle) {
                return selectedArticle
            } else {
                throw {name: 'Data not found'}
            }
        } catch (error) {
            throw error
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
            await this.article().insertOne({
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