const Place = require("../models/Place.model")
const mongoose = require("mongoose");

// module.exports.search = (req, res, next) => {
//     const city = req.params.city
//     const places=places.find((s)=>s.city===city)
//     res.render("alojamientos",places)
// }
// module.exports.search = (req, res, next) => {
//     function
// }

module.exports.info = (req, res, next) => {
    const { placeId } = req.params.id
    Place.find(placeId)
        .then(place => {
            console.log(places, "********")
            res.render("info", { place })
        })
        .catch(error => {
            console.log(error)

        })
}