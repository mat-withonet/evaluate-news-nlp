// Server side code

const dotenv = require('dotenv');
dotenv.config();
var path = require('path') 
const mockAPIResponse = require('./mockAPI.js')
var aylien = require("aylien_textapi"); 
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
    });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');



/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 

const cors = require('cors');
app.use(cors());

app.use(express.static('dist')); 

// **************** Setup Server ******************
const port = 8080; // We set our port

const server = app.listen(port, listening); 

function listening() {
  console.log(`server running on local host: ${port}`);
}

// **************** Setup Express route ****************** 
app.post('/analysis', analysis);

function analysis (req, res) { 
  let data = req.body;
  console.log("/add (1): called with POST with", data);
  let formInput = data.userResponse;
  console.log("/add (2): analyzing input", formInput);

  // Using the aylien SDK
  textapi.sentiment({
    'text': formInput
  }, function(error, response) {  
      const postResponse = makeResponse(formInput, response);
      res.send(postResponse);
    if (error === null) {
      console.log("/add (5): alyien response", response);   
    }
  });
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
