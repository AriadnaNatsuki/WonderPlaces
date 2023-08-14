//Script que metera las semillas (seeds) en nuestra BD
//Si lo ejecutamos nos rellene la BD solo
console.log("hello from seeds")
const mongoose = require('mongoose')
//Modelo de Movie para que me lo cree
const Place = require('../models/Place.model')
//const UserModel = require('../models/User.model')
//Nos traemos los datos del json
const places = require('../places.json')
// const http = axios.create({
//     baseURL: 'htpp://localhost:8000'
// })
//const users = require('../users.json')

require('../config/db.config')
mongoose.connection.once('connected', () => {
    //Cada vez que nos connectemos a la BD que borre lo anterior
    //de esta manera no se añadiran objetos por duplicado
    mongoose.connection.db.dropDatabase()
        .then(() => {
            console.log('Database cleared')
            //Recibe un array de lo que tiene que guardar con el formato modelo Movie
            return Place.Many(places)
        })
        .then((placesCreated) => console.log(`${placesCreated.length} have been created`))
        .catch(e => console.error('Error disconencting from DB', e))
        .finally(() => {
            mongoose.connection.close()
                .then(() => console.log('Finish seeds.js'))
                .catch(e => console.error(e))
                .finally(() => {
                    process.exit(0)
                })
        })
})