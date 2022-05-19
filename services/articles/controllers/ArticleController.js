const Article = require('../models/ModelArticle');

class ArticleController {
    static async findAllArticle(req, res, next) {
        try {

            console.log('masuk controller find all')
        } catch (error) {

        }
    }

    static async findArticleById(req, res, next) {
        try {

            console.log('masuk controller find by id')
        } catch (error) {

        }
    }

}

module.exports = ArticleController