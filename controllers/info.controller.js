const Place=require("../models/Place.model")
const mongoose = require("mongoose");


module.exports.info = (req, res, next) => {
    
    const placeId = req.params.placeId;

    Place.findById(placeId)
    .then(place => {
        console.log(place);
        res.render("info", { place })
    }).catch(error => {
        console.log(error)
        
    })

}