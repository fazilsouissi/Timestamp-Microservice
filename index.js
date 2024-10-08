// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function (req, res) {
  // check if date is a number
  if (Number(req.params.date)) {
    // console.log(req.params.date)
    let dateFromUnix = new Date(Number(req.params.date)).toString().split(" ").splice(0, 5)
    dateFromUnix[0] += ","
    dateFromUnix[4] += " GMT"
    dateFromUnix = dateFromUnix.join(" ")
    console.log(dateFromUnix)
    res.send({
      "unix": req.params.date,
      "utc": dateFromUnix
    })
  }
  else if (req.params.date.split("-")[1]) {
    const unixTimestamp = new Date(req.params.date).getTime();
    let dateFromStandard = new Date(req.params.date).toString().split(" ").splice(0, 5)
    dateFromStandard[0] += ","
    dateFromStandard[4] += " GMT"
    dateFromStandard = dateFromStandard.join(" ")
    res.send({
      "unix": unixTimestamp,
      "utc": dateFromStandard
    })
  }
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
