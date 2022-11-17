const express = require("express");
const router = express.Router();
const {
  registerForm,
  loginUserForm,
  registerUser,
  logOutUser,
} = require("../controllers/user");
const User = require("../db/models/UserSchema");
var passport = require("passport");
var LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

router.get("/login", loginUserForm);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

router.get("/logout", logOutUser);

router.get("/register", registerForm);

router.post("/register", registerUser);

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

module.exports = router;
