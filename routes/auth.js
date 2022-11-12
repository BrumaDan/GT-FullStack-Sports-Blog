const router = require("./article");
const {
  registerForm,
  loginUserForm,
  User,
} = require("../db/models/user");
var passport = require("passport");
var LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const user = await User.findOne({ username: username });
      if (user == null) {
        return cb(null, false, {
          message: "Incorrect username or password.",
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (result == false) {
              return cb(null, false, {
                message: "Incorrect username or password.",
              });
            } else {
              return cb(null, user);
            }
          })
          .catch((error) => {
            return cb(error);
          });
      }
    } catch {
      (err) => {
        return cb(err);
      };
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.get("/login", loginUserForm)

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/articles",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


router.get("/register", registerForm);

router.post("/register", async (req, res, next) => {
  var salt = 10;
  bcrypt.hash(req.body.password, salt).then((hashedPassword) => {
    User.create({
      username: req.body.username,
      password: hashedPassword,
    })
      .then((user) =>
        req.login(user, function (err) {
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
});


module.exports = router;
