const passport = require("passport");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const User = mongoose.model("user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user) {
      done(null, user);
    }
  } catch (error) {
    done(error);
  }
});

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // check if user exists in MongoDB
        const currentUser = await User.findOne({ email: email });
        if (!currentUser) {
          return done(null, false, "Invalid Email or Password");
        }
        currentUser.schema.methods.comparePassword(
          password,
          currentUser.password,
          (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, currentUser);
            }
            return done(null, false, "Invalid credentials...");
          }
        );
      } catch (error) {
        done(error);
      }
    }
  )
);

function signup({ email, password, req }) {
  const user = new User({ email, password });
  if (!email || !password) {
    throw new Error("You must enter user email and password");
  }
  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new Error("Email in already existing");
      }
      return user.save();
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        req.raw.login(user, (err) => {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      });
    });
  }
  
  function login({ email, password, req }) {
    return new Promise((resolve, reject) => {
      passport.authenticate("local", (err, user) => {
        if (!user) {
          reject(err);
        }
        req.raw.login(user, () => resolve(user));
      })({ body: { email, password } });
    });
  }

module.exports = { signup, login };
