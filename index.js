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

  app.get("/api", (req, res) => {
    const date = new Date();
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    });
  });

  app.get("/api/:date?", function (req, res) {
    // if (new Date(Number(req.params.date))) {
    //   console.log(req.params.date)
    //   res.json({ actualDate : req.params.date });
    // }
    let dateInput = req.params.date;
    let dateObject = isNaN(dateInput) ? new Date(dateInput) : new Date(Number(dateInput));
    // if (req.params.date == "") {
    //   const date = new Date()
    //   res.json({
    //     "unix": date.getTime(),
    //     "utc": date.toUTCString()
    //   })
    // }
    if (!isNaN(dateObject.getTime())) {
      let dateFromUnix = dateObject.toGMTString();
      let unixDate = dateObject.getTime();
      res.json({
        "unix": unixDate,
        "utc": dateFromUnix
      });
    } else {
      // Handle invalid date
      res.json({
        "error": "Invalid Date"
      });
    }
  })

  // Listen on port set in environment variable or default to 3000
  var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
  });
