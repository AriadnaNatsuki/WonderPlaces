const passport = require("passport");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config()

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
//Inventamos el nombre de la estrategia: google-auth
//e instanciamos la estrategia con new GogleStrategy
passport.use('google-auth', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SESSION_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URI || '/authentication/google/callback'
  //Cuando no utilizamos parametros ponemos 1 guion bajo _ para el primero, 2 guiones bajos para el segundo __, asi no se queja de duplicado de parametro
  //done en passport es nuestro next (para usar el mismo convenio de llamarlo)
}, (_,__,profile, next)=>{
  //id que nos devuelve google, se almacenará en googleID
  //email que nos devuelve google
const googleID=profile.id;
const email= profile.emails[0]? profile.email[0].value : undefined
if(googleID&&email){
  //buscamos en nuestra DB si ya existe un usuario con el mismo email de google
  User.findOne({
    $or: [
      {email:email},
      {googleID:googleID}
    ]
  }).then((user)=>{
    if(!user){
    const newUser=new User({
      email:email,
      googleID: googleID,
      //Mongoose me genera una password para dicho usuario logeado por google
      password:mongoose.Types.ObjectId()
  })
  return newUser.save()
  .then((user)=>{
    next(null, newUser)
  })
  //.catch(next)
    }else{
    next(null,user)
    }
  })
  .catch(next)
}else{
  next(null, false, {errror: "Error connecting with Google Auth"})
}
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