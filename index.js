'use strict';
// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Client DB: openned"); 
});
// mongoose.connect('mongodb://admin:meteor1992@ds064718.mlab.com:64718/church-app', function(){
//   console.log("Client DB: connected"); 
// });
mongoose.connect('mongodb://admin:admin@ds021751.mlab.com:21751/planetakino', function(){
   console.log("Client DB: connected"); 
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});





router.route('/users')
    .get(function(req, res) {
        NewsItemPreview.find(function(err, newsItemPreviews) {
            if (err)
                res.send(err);

            res.json(newsItemPreviews);
        });
    });





app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


// =============================================================================

var NewsItemPreview = require('./app/models/user');
