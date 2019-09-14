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

router.get(`/city/:cityName`, function (req, res) {
    const cityName = req.params.cityName
    request(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${cityName}`, function (err, response, body) {
        let data = JSON.parse(body)
        console.log(data)
        let displayCityData = new CityModel({
            name: data.location.name,
            temperature: data.current.temperature,
        })
        res.send(displayCityData)
        displayCityData.save()
    })
})

// This route should find all of the city data saved in your DB, and send it to the client
router.get("/cities", function (req, res) {
    CityModel.find({}, function (err, response) {
        res.send(response)
    })
})

// This route should take some data from the body, and save it as a new City to your DB
router.post("/city", async (req, res) => {
    let { name, temperature } = req.body
    let displayCityData = new cityModel({
        name,
        temperature
    })
    displayCityData.save(function (err, result) {
        console.log(result)
    })
    res.send()
})

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