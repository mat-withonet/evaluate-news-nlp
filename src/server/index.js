// Server side code
const dotenv = require('dotenv');
dotenv.config();
//dotenv.config({path: '../../.env' });
var path = require('path') // Extract the filename from a file path
const mockAPIResponse = require('./mockAPI.js')
var aylien = require("aylien_textapi"); // Require the Aylien npm package:

// Set aylien API credentials
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
    });

// Require Express (which we've already installed on the command line) to run server and routes
const express = require('express');

// Create an instance of our app, with express
const app = express();

// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware so that we can parse our data
app.use(bodyParser.urlencoded({ extended: false })); // Here we use the 'use' method to tell bodyParser exactly how we want our data to be parsed
app.use(bodyParser.json()); // We're going to mostly want JSON

// Cors for cross origin allowance
const cors = require('cors'); // Require Cors (which we've already installed on the command line) which let's the browser and server talk to each other withour any security interruptions
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist')); // We use our 'use' method and this time, we're pointing our app to the folder that we want it to look at

// **************** Setup Server ******************
// Map URL's to functions
const port = 8080; // We set our port

const server = app.listen(port, listening); // Call the listen method and pass it our callback function

function listening() {
  console.log(`server running on local host: ${port}`);
}

// **************** Setup Express route ****************** 
// POST method routes - adds data to aylienData object
app.post('/analysis', analysis);

function analysis (req, res) { 
  let data = req.body;
  console.log("/add (1): called with POST with", data);
  let formInput = data.userResponse; // Input from the user in the form on the page
  console.log("/add (2): analyzing input", formInput);

  // Using the aylien SDK to use their API with user input
  console.log("/add (3): starting alyien request");
  textapi.sentiment({
    'text': formInput
  }, function(error, response) {  
      console.log("/add (4): alyien analysis completed");
      const postResponse = makeResponse(formInput, response);
      console.log("/add (6): sending", postResponse)
      res.send(postResponse);
    if (error === null) {
      console.log("/add (5): alyien response", response);   
    }
  });
 
 console.log("/add (7): done\n");
};

function makeResponse(formInput, alyienResponse){
  const response = {
    "input": formInput,
    "userPolarity": alyienResponse.polarity,
    "userSubjectivity": alyienResponse.subjectivity
  };
  return response;
};

exports.makeResponse = makeResponse;
