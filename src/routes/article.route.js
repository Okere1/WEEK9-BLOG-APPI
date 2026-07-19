const express = require("express");
const validate = require("../middlewares/validateSchema");

const {
  createArticleSchema,
  updateArticleSchema,
} = require("../validation/post.validation");

const {
  postArticle,
  getAllArticles,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  searchArticles,
} = require("../controllers/article.controller");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router(); 

router.use(requireAuth);

router.post("/articles", validate(createArticleSchema), postArticle);
router.get("/articles/search", searchArticles);
router.get("/articles", getAllArticles);
router.get("/articles/:id", getArticleById);
router.put("/articles/:id", validate(updateArticleSchema), updateArticleById);
router.delete("/articles/:id", deleteArticleById);

module.exports = router;
