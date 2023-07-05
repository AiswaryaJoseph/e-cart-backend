// Automatically load .env file into our application
require('dotenv').config()

// import express
const express = require('express')

// import cors
const cors = require('cors')

// import connection.js
require('./db/connection')

//import routes
const router = require('./routes/router')

// Create an application using express
const server = express()

// define port number
const PORT = 5000

// use in server app
server.use(cors())
server.use(express.json())
server.use(router)

// run application
server.listen(PORT,()=>{
    console.log('Listening on port '+PORT);
})


// routes - localhost:5000 -/
server.get('/',(req,res)=>{
    res.status(200).json("E Commerce server starts...")
})
