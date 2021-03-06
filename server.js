var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var database = require('./config/database');
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 1369;
var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.PORT || "127.0.0.1";

mongoose.connect(database.url);

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port, ip);
console.log("App listening on " + ip + ":" +port);
