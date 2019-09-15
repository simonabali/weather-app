//File meant to manage our APIs and server routes 
//Needs to be exported and connected to our server file

//Set-up the Router with Express
const express = require("express")
const router = express.Router() //creating the router OBJECTS
const request = require("request")
const mongoose = require('mongoose')
const CityModel = require("../models/cityModel")

// -----------------All your CRUD Routes: get, put, post, delete -----------------

//test route that the server works
// router.get('/test', function(req, res){
//     console.log("I am alive")
//     res.send("Alive")
// })

//route communicating with external API
router.get(`/city/:cityName`, function (req, res) {
    const cityName = req.params.cityName
    request(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${cityName}`, function (err, response, body) {
        let data = JSON.parse(body)
        let displayCityData = {
            'name': data.location.name,
            'updatedAt': data.current.observation_time,
            'temperature': data.current.temperature,
            'condition': data.current.weather_descriptions[0],
            'conditionPic': data.current.weather_icons[0]
        }
        res.send(displayCityData)
        //displayCityData.save()
    })
})

//Route communicating with DB
// This route should find all of the city data saved in your DB, and send it to the client
router.get("/cities", function (req, res) {
    CityModel.find({}, function (err, response) {
        res.send(response)
    })
})

//Route communicating with DB
// This route should take some data from the body, and save it as a new City to your DB
router.post("/city", async (req, res) => {
    let displayCityData = new CityModel(req.body)
    //let { name, updatedAt, temperature, condition, conditionPic } = req.body
    //let displayCityData = new CityModel({
    //     name,
    // updatedAt,
    // temperature,
    // condition,
    // conditionPic
    // })
    displayCityData.save()
    res.send()
})



//Route communicating with DB
// This route should take a cityName parameter
// This route should find the city's data in your DB and remove it from your DB
router.delete("/city/:cityName", async function (req, res) {
    let cityName = req.params.cityName
    //Option 1
    CityModel
        .deleteOne({ name: cityName })
        .exec(res.end())
})
//Option 2
// await CityModel.findOneAndDelete({ name: cityName })
// res.send("City has been deleted")})

//Exporting the router
module.exports = router