const express = require("express");

const {
  postArticle,
  getAllArticles,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  searchArticles,
} = require("../controllers/article.controller");

const router = express.Router();

router.post("/articles", postArticle);
router.get("/articles/search", searchArticles);
router.get("/articles", getAllArticles);
router.get("/articles/:id", getArticleById);
router.put("/articles/:id", updateArticleById);
router.delete("/articles/:id", deleteArticleById);

module.exports = router;
