const Article = require("../ArticleSchema");
const fs = require("fs");
const path = require("path");
const getCategories = require("../models/category");

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

const updateArticle = async (req, res) => {
  // const data = req.body;
  // Article.updateOne({ ...data })
  //   .then(res.send("Article updated successfully"))
  //   .catch((error) =>
  //     console.error("There was an error updating the article", error)
  //   );
  res.send("Updated one article");
};

module.exports = {
  findAllArticles,
  findOneArticle,
  deleteArticle,
  addArticle,
  addArticleFrom,
  updateArticle,
  findArticleByUser,
};
