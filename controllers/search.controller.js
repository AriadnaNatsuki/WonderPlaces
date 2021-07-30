const Place=require("../models/Place.model")
const mongoose = require("mongoose");


module.exports.search = (req, res, next) => {
    Place.find({})
        .then(places => {
            console.log(places, "********")
            res.render("alojamientos", { places })
        })
        .catch(error => {
            console.log(error)
            
        })

}