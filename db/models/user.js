const mongoose = require("mongoose");
const UserSchema = require("../UserSchema");
const User = mongoose.model("User", UserSchema);


const loginUserForm =  (req, res) => 
res.render("../views/Pages/loginPage.ejs", {user : req.user ? (req.user) : (false)});

const registerForm =  (req, res) =>
res.render("../views/Pages/registerPage.ejs", {user : req.user ? (req.user) : (false)})


module.exports = {
  registerForm,
  loginUserForm,
  User,
};
