// Server side code
const dotenv = require('dotenv');
dotenv.config();

var path = require('path') 
const mockAPIResponse = require('./mockAPI.js')
var aylien = require("aylien_textapi"); 
const bodyParser = require('body-parser');
const express = require('express');

//Dotnev to contact the API
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
    });

const app = express();



//Middleware
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 

const cors = require('cors');
app.use(cors());

app.use(express.static('dist')); 

//Setup Server 
const port = 8080; // We set our port

const server = app.listen(port, listening); 

function listening() {
  console.log(`server running on local host: ${port}`);
}

//Setup Express route
app.post('/analysis', analysis);

function analysis (req, res) { 
  let data = req.body;
  let formInput = data.userResponse;

  // Using the aylien SDK
  textapi.sentiment({
    'text': formInput
  }, function(error, response) {  
      const postResponse = makeResponse(formInput, response);
      res.send(postResponse);
    if (error === null) {  
    }
  });
};

function makeResponse(formInput, alyienResponse){
  const response = {
    "input": formInput,
    "userPolarity": alyienResponse.polarity,
    "subjectivityConfidence": alyienResponse.subjectivity_confidence,
    "userSubjectivity": alyienResponse.subjectivity
  };
  return response;
};

exports.makeResponse = makeResponse;
