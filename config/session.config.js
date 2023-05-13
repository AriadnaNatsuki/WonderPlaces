const session = require("express-session");
//const MongoStore=require('connect-mongodb-session').default
const MongoStore = require("connect-mongo");
const { db }=require("./constants")


module.exports = (app) => {
    app.use(
        session({
          secret: process.env.SESSION_SECRET || "change me",
          resave: true,
          saveUninitialized: false,
          cookie: {
            sameSite: "lax",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 // 1 day
          },
            //store: new MongoStore({
                store: MongoStore.create({
                //ahora mismo MONGODB_URI esta en constants.js
                //¿Por qué db tiene que ser con b minuscula sino da error?
                mongoUrl: process.env.MONGODB_URI || db,
            })
        })
      )
    }
