const User = require("../UserSchema")

const loginUserForm =  (req, res) => 
res.render("../views/Pages/loginPage.ejs", {authStatus :req.isAuthenticated()});

const registerForm =  (req, res) =>
res.render("../views/Pages/registerPage.ejs", {authStatus :req.isAuthenticated()})

const registerUser = async (req, res, next) => {
  var salt = 10;
  bcrypt.hash(req.body.password, salt).then((hashedPassword) => {
    User.create({
      username: req.body.username,
      password: hashedPassword,
    })
      .then((user) =>
        req.login((user,err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        })
      )
      .catch((error) => {
        console.log(error);
        return next(error);
      });
  });
}

const logOutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

module.exports = {
  registerForm,
  loginUserForm,
  registerUser,
  logOutUser,
};
