// Express require, server Set-up, & serve dist folder & node_modules
// Body parser require & setup
// Mongoose require & connection to your DB

//External module inports
const express = require ("express")
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')

//Internal module imports
const api = require('./server/routes/api')

//Connection to database
mongoose.connect('mongodb://localhost/citiesDB', { useNewUrlParser: true })

//Server set-up + serving Dist + Body parser
const server = express()
server.use(express.static(path.join(__dirname, 'dist')))
server.use(express.static(path.join(__dirname, 'node_modules')))

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

//Connecting to api (= our routes)
server.use('/', api)

//Store your Weather app API key in a variable
apiKey = "82b30eec76551c8675bcae601f20d686"

//Running the Server
const port = '3000';
server.listen(port, function () { console.log('Running on ' + port) })
