const express = require("express");
const router = express.Router();
const {
  findAllArticles,
  findOneArticle,
  deleteArticle,
  addArticle,
  updateArticle,
  addArticleFrom,
} = require("../db/models/article");

router.get("/", (req, res) => res.render("../views/Pages/homePage.ejs", {user : req.user ? (req.user) : (false)}));
router.get("/blog", (req,res) => res.render("../views/Pages/index.ejs"))

router.get("/articles", findAllArticles);

router.get("/article/:id", findOneArticle);

router.post("/addArticle", addArticle);
router.get("/addArticle", addArticleFrom);

router.delete("/article/:id", deleteArticle);

router.patch("/article", updateArticle);

module.exports = router;
