const Joi = require("joi");
const Article = require("../models/article.model");

const articleSchema = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().min(20).required(),
  autor: Joi.string().optional().default("Guest"),
});

const postArticle = async (req, res, next) => {
  try {
    const { error, value } = articleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newArticle = new Article(value);
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    next(error);
  }
};

const getAllArticles = async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Articles retrieved successfully",
      data: articles,
    });
  } catch (error) {
    next(error);
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    if (!article) {
      return res
        .status(404)
        .json({ message: `Article with ID ${id} not found` });
    }
    res
      .status(200)
      .json({ message: "Article retrieved successfully", data: article });
  } catch (error) {
    next(error);
  }
};

const updateArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const articleUpdateSchema = Joi.object({
      title: Joi.string().min(5).optional(),
      content: Joi.string().min(20).optional(),
      autor: Joi.string().optional().default("Guest"),
    });

    const { error, value } = articleUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updatedArticle = await Article.findByIdAndUpdate(id, value, {
      new: true,
      runValidators: true,
    });
    if (!updatedArticle) {
      return res
        .status(404)
        .json({ message: `Article with ID ${id} not found` });
    }
    res
      .status(200)
      .json({ message: "Article updated successfully", data: updatedArticle });
  } catch (error) {
    next(error);
  }
};

const deleteArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) {
      return res
        .status(404)
        .json({ message: `Article with ID ${id} not found` });
    }
    res
      .status(200)
      .json({ message: `Article with ID ${id} deleted successfully` });
  } catch (error) {
    next(error);
  }
};

const searchArticles = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        message: "Search keyword is required",
      });
    }

    const articles = await Article.find({
      $text: {
        $search: q,
      },
    }).sort({
      score: {
        $meta: "textScore",
      },
    });

    res.status(200).json({
      message: "Articles found successfully",
      count: articles.length,
      data: articles,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postArticle,
  getAllArticles,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  searchArticles,
};
