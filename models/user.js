const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(saltRounds, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (
  password,
  hashedPassword,
  callback
) {
  bcrypt.compare(password, hashedPassword, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};


mongoose.model("user", UserSchema);
