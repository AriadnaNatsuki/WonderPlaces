const User = require("../models/User.model");
const mongoose = require("mongoose");
const passport = require("passport");
const mailer = require("../config/mailer.config");
module.exports.register = (req, res, next) => {
  res.render("auth/register")
}

module.exports.alojamientos = (req, res, next) => {
  res.render("alojamientos")
}


module.exports.perfil = (req, res, next) => {
  res.render("perfil")
}


module.exports.doRegister = (req, res, next) => {
  // Comprobar que no existe un usuario con el mismo email

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        User.create(req.body)
        .then((newUser) => {
          console.log("===================");
          console.log(newUser);
          mailer.sendActivationMail(newUser.email, newUser.activationToken);
          res.redirect('/login')
        })
          .catch(e => {
            if (e instanceof mongoose.Error.ValidationError) {
              res.render("auth/register", { user: req.body, errors: e.errors })
            } else {
              next(e)
            }
          })
      } else {
        res.render("auth/register", { user: req.body, errors: { email: "There is already an account using this email" } })
      }
    })
    .catch(e => next(e))
}

module.exports.login = (req, res, next) => {
  res.render("auth/login");
}

module.exports.doLogin = (req, res, next) => {
  passport.authenticate('local-auth', (error, user, validations) => {
    if (error) {
      next(error);
    } else if (!user) {
      res.render("auth/login", { user: req.body, errorMessage: validations.error })
    } else {
      req.login(user, (loginErr) => {
        if (loginErr) {
          next(loginErr)
        } else {
          res.redirect('/')
        }
      })
    }
  })(req, res, next)
}

module.exports.activateAccount = (req, res, next) => {
  const token = req.params.token;

  const filter = { activationToken: token, active: false };
  const update = { active: true };

  let user = User.findOne(filter).then(userDesactivate => {
    console.log(userDesactivate);
    if (userDesactivate) {
      console.log("========================");

      userDesactivate.active = true;
      userDesactivate.save();
    }

    res.render("auth/login", {
      user: { email: user.email },
      message: "You have activated your account. Thanks for joining!"
    })
  }).catch(error => {
    console.log(error)
    res.redirect("/")

  });
  
  /*
  .then((user) => {
    if (user) {
      res.render("auth/login", {
        user: { email: user.email },
        message: "You have activated your account. Thanks for joining!"
      })
    } else {
      res.redirect("/")
    }
  })
  .catch(next)
   
   */
}