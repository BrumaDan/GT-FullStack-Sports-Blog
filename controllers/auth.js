var passport = require("passport");
var LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../db/models/UserSchema");

const authLogIn = passport.authenticate("local", {
  failureRedirect: "/login",
  failureMessage: true,
});

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

module.export = { authLogIn };
