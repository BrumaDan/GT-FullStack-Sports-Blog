const Article = require("../db/models/ArticleSchema");
const fs = require("fs");
const path = require("path");
const getCategories = require("../controllers/category");

const findAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    return articles;
  } catch (err) {
    console.error("There was an error recovering articles", error);
    res.render("../../views/Responses/500.ejs", error);
  }
};

const findOneArticle = async (req, res) => {
  // const article = await Article.findOne({ _id: req.query.id }).then(
  //   (response) => res.send(result)
  // );
  // res.send("One Article", article);
  const data = req.params.id;
  res.send(`Here is article with id: ${data}`);
};
const deleteArticle = async (req, res) => {
  Article.deleteOne({ _id: req.params.id })
    .then((response) => res.redirect("/"))
    .catch((error) => console.error("There was an error deleting", error));
};

const findArticleByUser = async (req, res) => {
  try {
    let user = req.params.username;
    const articles = await Article.find({ added_by: user });
    res.render("Pages/articleTable.ejs", {
      articles: articles,
      authStatus: req.isAuthenticated(),
      user: user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Something wen wrong!");
  }
};

const addArticleFrom = async (req, res) => {
  let user = "";
  req.isAuthenticated() ? (user = req.user.username) : (user = "");
  const availableCategories = await getCategories();
  res.render("Pages/addArticleForm.ejs", {
    user: user,
    data: {},
    message: " ",
    categories: availableCategories,
    authStatus: req.isAuthenticated(),
  });
};

const addArticle = async (req, res) => {};

const updateArticleForm = async (req, res) => {
  try {
    const availableCategories = await getCategories();
    const dbArticle = await Article.findOne({ _id: req.params.id });
    res.render("../views/Pages/updateArticleForm.ejs", {
      article: dbArticle,
      authStatus: req.isAuthenticated(),
      message: " ",
      user: req.user.username,
      categories: availableCategories,
    });
  } catch (error) {
    res.render("../views/Responses/500.ejs", {
      authStatus: req.isAuthenticated(),
      user: req.user.username,
    });
  }
};

module.exports = {
  findAllArticles,
  findOneArticle,
  deleteArticle,
  addArticle,
  addArticleFrom,
  findArticleByUser,
  updateArticleForm,
};
