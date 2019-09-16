//Require Mongoose & set-up schema
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//create a schema for the city
const CitySchema = new Schema({
    name: String,
    //updatedAt: Date,
    temperature: Number,
    condition: String,
    conditionPic: String,
    saved: Boolean //added it to save to database (otherwise saved to array only)
})

//Create the model for the city 
//We need both a model and schema for each collection
const CityModel = mongoose.model ("city", CitySchema)

//Exporting the model so that api.js can access it (needsto require it first)
module.exports = CityModel

