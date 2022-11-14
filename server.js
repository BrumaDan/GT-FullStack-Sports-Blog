//add dependecies
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();
const passport = require("passport");
const Article = require("./db/ArticleSchema");
const  fs = require('fs');
const path = require('path');
const multer = require('multer');
const getCategories = require("./db/models/category")

//get routes 
const articleRoutes = require("./routes/article");
const authRoutes = require("./routes/auth");

//Create express instance
const app = express();

//middleware for parsing post methods body data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//set passport configurations
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));
app.use((req, res, next) => {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
});

//use static files
app.use(express.static(__dirname + '/public/static'));

//set routes
app.use("/", authRoutes);
app.use("/", articleRoutes);
app.get("/*", (req, res) => { 
res.render("Responses/404.ejs",{authStatus:req.isAuthenticated()})
});


//set ejs
app.set("view engine", "ejs");
app.set("views", "./views");


//set server and database
const port = 3000;


//start server and connect to database
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(console.log("Database connected"))
    .catch((error) =>
      console.error(`Database connection encountered an error : ${error.message}`)
    );
});