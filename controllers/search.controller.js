const Place=require("../models/Place.model")
const mongoose = require("mongoose");

module.exports.search = (req, res, next) => {
    const city = req.params.city
    const place=places.find((s)=>s.city===city)
    res.render("alojamientos",place)
}

