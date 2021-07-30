const passport = require("passport");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require("../models/User.model");

passport.serializeUser((user, next) => {
  next(null, user.id);
})

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then((user => next(null, user)))
    // .catch(e => next(e))
    .catch(next);
})

passport.use('local-auth', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, next) => {
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        next(null, false, { error: "Email or password are incorrect" })
      } else {
        return user.checkPassword(password)
          .then((match) => {
            if (match) {
              // comprobar si es active
              if (user.active) {
                next(null, user)
              } else {
                next(null, false, { error: "Check your email. You have activate your account" })
              }
            } else {
              next(null, false, { error: "Email or password are incorrect" })
            }
          })
      }
    })
    .catch(next)
}))

/*passport.use('google-auth', new GoogleStrategy({
  clientID: process.env.G_CLIENT_ID,
  clientSecret: process.env.G_CLIENT_SECRET,
  callbackURL: process.env.G_REDIRECT_URI || '/auth/google/callback',
}, (accessToken, refreshToken, profile, next) => {
  const googleID = profile.id
  const email = profile.emails[0] ? profile.emails[0].value : undefined;

  if (googleID && email) {
    User.findOne({ $or: [
      { email: email },
      { googleID: googleID }
    ]})
    .then(user => {
      if (!user) {
        const newUserInstance = new User({
          email,
          password: mongoose.Types.ObjectId(),
          googleID: googleID,
          active: true
        })

        return newUserInstance.save()
          .then(newUser => next(null, newUser))
      } else {
        next(null, user)
      }
    })
    .catch(next)
  } else {
    next(null, null, { error: 'Error connecting with Google OAuth' })
  }
}))
*/