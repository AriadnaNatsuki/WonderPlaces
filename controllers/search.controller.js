const Place=require("../models/Place.model")
const mongoose = require("mongoose");

module.exports.search = (req, res, next) => {
    const city = req.params.city
    const place=places.find((s)=>s.city===city)
    res.render("alojamientos",place)
}
// module.exports.search = (req, res, next) => {
//     function
// }
// Place.find({city:req.params.city})
//     .then(place => {
//         res.re
//     }
// })