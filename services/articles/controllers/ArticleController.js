const Article = require('../models/ModelArticle');

class ArticleController {
    static async findAllArticle(req, res, next) {
        try {
            const response = await Article.findAllArticle()
            if (!response) {
                throw { name: "Data not found" }
            }
            console.log(response);
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async findArticleById(req, res, next) {
        try {
            const { id } = req.params
            const response = await Article.findArticleById(id)
            if (!response) {
                throw { name: "Data not found" }
            }
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ArticleController