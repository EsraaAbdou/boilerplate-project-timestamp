// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date?", (req, res) => {
  const dateString = req.params.date;
  const numbers = /^[0-9]+$/;
  let error = false;
  let timestamp, dateObj;

  if(!dateString) {
    dateObj = new Date();
    timestamp = dateObj.getTime();
  } else if (dateString.match(numbers)) {
    timestamp = parseInt(req.params.date);
    dateObj = new Date(parseInt(dateString));
  } else {
    dateObj = new Date(dateString);
    timestamp = dateObj.getTime();
    if(!timestamp){
      error = true;
      res.json({ error : "Invalid Date" });
    }
  }
  if(!error) {
    res.json({"unix": timestamp, "utc": dateObj.toUTCString()});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
// app.listen(3000);