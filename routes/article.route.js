const express = require("express");

const {
  postArticle,
  getAllArticles,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  searchArticles,
} = require("../controllers/article.controller");
const requireAuth = require("../middlewares/reruireAuth");

const router = express.Router();

router.post("/articles", requireAuth, postArticle);
router.get("/articles/search", requireAuth, searchArticles);
router.get("/articles", requireAuth, getAllArticles);
router.get("/articles/:id", requireAuth, getArticleById);
router.put("/articles/:id", requireAuth, updateArticleById);
router.delete("/articles/:id", requireAuth, deleteArticleById);

module.exports = router;
