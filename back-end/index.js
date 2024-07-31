const port = 4000;
const express = require("express"); // used to import the express.js module
const app = express(); // create an instance of our app using express.js
const mongoose = require("mongoose"); // import and initialize mongoose package
const jwt = require("jsonwebtoken"); // import and initialize the jsonwebtoken
const multer = require("multer"); // ditto multer
const path = require("path"); // stores backend directory's path for the express app to access
const cors = require("cors"); // import and initialize the cors package
const dotenv = require("dotenv").config({path : '../.env'}); // access .env file stored in parent directory

app.use(express.json()); // the response retrieved from express will automatically be passed through json
app.use(cors()); // react app will connect to express app through port 4000

// Database Connection with MongoDB
mongoose.connect(`${process.env.MONGODB_ACCESS_LINK}`); // provides access to database

// API Creation
app.get("/", (req, res) => { // respond with "Express App is Running" when a GET request is made to homepage
    res.send("Express App is Running"); // response will be printed on localhost:${port}/
});

app.listen(port, (error) => { // connect to, and listen for, visitors on port 4000
    if (!error) {    // if no error, print the port number to console
        console.log(`Server Running on port ${port}`);
    }
    else {  // otherwise if there is an error, print the error number to console
        console.log(`Error: ${error}`);
    }
});