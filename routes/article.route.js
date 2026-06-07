const express = require("express");
const {
  postArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require("../controllers/article.controller");

const router = express.Router();

router.post("/articles", postArticle);
router.get("/articles", getAllArticles);
router.get("/articles/:id", getArticleById);
router.put("/articles/:id", updateArticle);
router.delete("/articles/:id", deleteArticle);

module.exports = router;
