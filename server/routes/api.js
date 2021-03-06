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

//Route communicating with external API, getting data and sending to client
router.get("/city/:cityName", function (req, res) {
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
    })
})

// Route communicating with DB, getting all of the data in your DB, and sending it to client
router.get("/cities", function (req, res) {
    CityModel.find({}, function (err, response) {
        res.send(response)
    })
})

//Route communicating with DB, saving a new ducument to DB
// This route should take some data from the body, and save it as a new City to your DB
router.post("/city", async (req, res) => {
    let displayCityData = new CityModel(req.body)
    displayCityData.save()
    res.send()
})

// Route communicating with DB, finding and deleting a document from DB
// This route should take a cityName parameter
router.delete("/city/:cityName", function (req, res) {
    let cityName = req.params.cityName
    CityModel.findOneAndDelete({ "name": cityName }, () => {
        res.send()
        console.log(`Removed ${cityName} from database with delete Route`)
    })
})

//Exporting the router
module.exports = router