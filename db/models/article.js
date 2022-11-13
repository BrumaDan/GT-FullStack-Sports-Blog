const Article = require("../ArticleSchema");
const  fs = require('fs');
const path = require('path');
const getCategories = require("../models/category")


const findAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({})
    return articles
  } catch (err){
    console.error("There was an error recovering articles", error);
      res.render("../../views/Responses/500.ejs", error);
  }
}

const findOneArticle = async (req, res) => {
  // const article = await Article.findOne({ _id: req.query.id }).then(
  //   (response) => res.send(result)
  // );
  // res.send("One Article", article);
  const data = req.params.id;
  res.send(`Here is article with id: ${data}`);
};
const deleteArticle = async (req, res) => {
  // Article.deleteOne({ _id: req.query.id })
  // .then(res.send("Article was deleted successfully"))
  // .catch((error) => console.error("There was an error deleting", error));
  res.send(`Delete article with id: ${req.params.id}`);
};

const addArticleFrom = async (req, res) => {
  const availableCategories = await getCategories();  
  res.render("Pages/addArticleForm.ejs", { data: {}, message: " ", categories:  availableCategories,authStatus :req.isAuthenticated()});
};

const addArticle = async (req, res) => {
 
};

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
};
