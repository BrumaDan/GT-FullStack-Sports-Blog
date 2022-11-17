const express = require("express");
const router = express.Router();
const Article = require("../db/models/ArticleSchema");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const getCategories = require("../controllers/category");
const {
  findAllArticles,
  findOneArticle,
  deleteArticle,
  updateArticle,
  addArticleFrom,
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

router.post("/addArticle", upload.single("filename"), async (req, res) => {
  const availableCategories = await getCategories();
  const image = {
    data: fs.readFileSync(__dirname + "/uploads/" + req.file.filename),
    contentType: req.file.mimetype,
  };
  const data = { ...req.body };
  Article.create({
    name: data.name,
    description: data.description,
    category: data.category,
    date_added: Date.now(),
    added_by: req.user.username,
    comments: [],
    author: data.author,
    img: image,
    link: data.link,
    rating: [],
  })
    .then(() => {
      res.render("Pages/addArticleForm.ejs", {
        user: req.user.username,
        data: data,
        message: "Article added successfully",
        categories: availableCategories,
        authStatus: req.isAuthenticated(),
      });
    })
    .catch((error) => {
      console.error("There was an error adding the article", error);
      res.render("Pages/addArticleForm.ejs", {
        user: req.user.username,
        data: data,
        message: error.message,
        authStatus: req.isAuthenticated(),
      });
    });
});

router.get("/", async (req, res) => {
  const articles = await findAllArticles();
  let user = "";
  req.isAuthenticated() ? (user = req.user.username) : (user = "");
  res.render("../views/Pages/index.ejs", {
    user: user,
    authStatus: req.isAuthenticated(),
    articles: articles,
  });
});

router.get("/articles/:username", findArticleByUser);

router.get("/articles", findAllArticles);

router.get("/article/:id", findOneArticle);

router.get("/addArticle", addArticleFrom);

router.get("/delete/:id", deleteArticle);

router.patch("/article", updateArticle);

module.exports = router;
