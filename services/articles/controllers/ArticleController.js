const Article = require('../models/ModelArticle');

class ArticleController {
    static async findAllArticle(req, res, next) {
        try {
            const response = await Article.findAllArticle()
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async findArticleById(req, res, next) {
        try {
            const { id } = req.params
            const response = await Article.findArticleById(id)
            res.status(200).json(response)
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    }

    static async addArticle(req, res, next) {
        try {
            const {
                title,
                content,
                imageUrl,
                author,
                tag,
                createdAt
            } = req.body
            await Article.addArticle({
                title,
                content,
                imageUrl,
                author,
                tag: tag.split(','),
                createdAt
            })
            res.status(201).json({message: ['article added successfully']})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ArticleController