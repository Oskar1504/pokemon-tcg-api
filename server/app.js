require("dotenv").config()
const express = require('express')

const Response = require("./helper/Response");
const MainAPiConnector = require("./helper/MainApiConnector");

const PokemonRouter = require('./router/pokemon');

const app = express()

app.use(express.json())

app.use(function (req, res, next) {
    console.log(req.originalUrl.split("?")[0])

    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers","Content-Type")
    res.header("'Content-Type', 'application/json'")
    next()
})

app.use('/', PokemonRouter);

app.get('/', async function (req, res) {
    res.json(Response.buildResponse("hey im alife"))
})


app.listen(process.env.PORT, function () {
    console.log(`${process.env.PROJECT_NAME} is running at http://localhost:${process.env.PORT}`)
    MainAPiConnector.addApplication(app, process.env)
})