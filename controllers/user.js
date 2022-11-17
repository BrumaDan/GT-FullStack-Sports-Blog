const User = require("../db/models/UserSchema");
const bcrypt = require("bcrypt");

const loginUserForm = (req, res) =>
  req.isAuthenticated()
    ? res.send("User is already logged in")
    : res.render("../views/Pages/login.ejs", {
        authStatus: req.isAuthenticated(),
      });

const registerForm = (req, res) =>
  req.isAuthenticated()
    ? res.send("User is already logged in")
    : res.render("../views/Pages/register.ejs", { message: false });

const registerUser = async (req, res, next) => {
  var salt = 10;
  if (req.body.password != req.body.confirmPassword) {
    res.render("../views/Pages/register.ejs", {
      message: "The passwords does not match",
    });
  }
  bcrypt.hash(req.body.password, salt).then((hashedPassword) => {
    User.create({
      username: req.body.username,
      password: hashedPassword,
    })
      .then((user) =>
        req.login((user, err) => {
          if (err) {
            res.render("../views/Pages/register.ejs", {
              message: err.messages,
            });
            // return next(err);
          }
          res.redirect("/");
        })
      )
      .catch((error) => {
        console.log(error);
        if (error.code === 11000) {
          res.render("../views/Pages/register.ejs", {
            message: "Username is already in use",
          });
        }
        res.render("../views/Pages/register.ejs", { message: error });
      });
  });
};

const logOutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = {
  registerForm,
  loginUserForm,
  registerUser,
  logOutUser,
};
