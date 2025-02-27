// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/*Dependenccies*/
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initializing the main project folder
app.use(express.static('website'));

const port = 3000;

//Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
  console.log(`server is running on localhost: ${port}`);
  console.log(`running`);
}

//GET route that returns the projectData object
app.get('/all', sendData);

function sendData(req, res) {
  res.send(projectData);
}

// POST route
app.post('/addWeatherData', addData);

function addData(req, res) {
    console.log(req.body);
  projectData.date = req.body.date;
  projectData.temperature = req.body.temperature;
  projectData.user_content = req.body.user_content;
  res.end();
  console.log(projectData);
}

// Setup Server
