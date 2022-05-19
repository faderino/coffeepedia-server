const Article = require('../models/ModelArticle');

class ArticleController {
    static async findAllArticle(req, res, next) {
        try {
            console.log('masuk controller find all try')
            const response = await Article.findAllArticle()
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    }

    static async findArticleById(req, res, next) {
        try {
            console.log('masuk controller find by id try')
            const { id } = req.params
            console.log(id, '==controller')
            const response = await Article.findArticleById(id)
            res.status(200).json(response)
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = ArticleController