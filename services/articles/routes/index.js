const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/ArticleController');

router.get('/articles', ArticleController.findAllArticle)
router.get('/article/:id', ArticleController.findArticleById)

module.exports = router



