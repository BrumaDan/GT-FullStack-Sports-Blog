const express = require("express");
const router = express.Router();
const Article = require("../db/models/ArticleSchema");
const fs = require("fs");
const path = require("path");
var passport = require("passport");
const multer = require("multer");
const getCategories = require("../controllers/category");
const {
  findAllArticles,
  deleteArticle,
  addArticleFrom,
  updateArticleForm,
  findTableArticles,
  findArticleByCategory,
  findArticleByUser,
} = require("../controllers/article");

//config multer middleware for getting images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const articles = await findAllArticles();
  const user = req.isAuthenticated() ? req.user.username : "";
  res.render("../views/Pages/index.ejs", {
    user: user,
    authStatus: req.isAuthenticated(),
    articles: articles,
  });
});

router.get("/articles/category/:category", findArticleByCategory);

router.get("/articles/table/:username", findTableArticles);
router.get("/articles/user/:username", findArticleByUser);

router.get("/addArticle", addArticleFrom);

router.get("/delete/:id", deleteArticle);

router.get("/update/:id", updateArticleForm);

router.post("/addArticle", upload.single("filename"), async (req, res) => {
  const availableCategories = await getCategories();
  const image = {
    data: fs.readFileSync(__dirname + "/uploads/" + req.file.filename),
    contentType: req.file.mimetype,
  };
  const user = req.isAuthenticated() ? req.user.username : "";
  const data = { ...req.body };
  Article.create({
    name: data.name,
    description: data.description,
    category: data.category,
    date_added: Date.now(),
    added_by: user,
    comments: [],
    author: data.author,
    img: image,
    link: data.link,
    rating: [],
  })
    .then(() => {
      res.render("Pages/addArticleForm.ejs", {
        user: user,
        data: data,
        message: "Article added successfully",
        categories: availableCategories,
        authStatus: req.isAuthenticated(),
      });
    })
    .catch((error) => {
      console.error("There was an error adding the article", error);
      res.render("Pages/addArticleForm.ejs", {
        user: user,
        categories: availableCategories,
        data: data,
        message: error.message,
        authStatus: req.isAuthenticated(),
      });
    });
});

router.post("/update/:id", upload.single("filename"), async (req, res) => {
  try {
    await Article.findOneAndUpdate(filter, update);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
