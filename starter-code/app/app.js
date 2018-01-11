var express        = require('express');
var path           = require('path');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var app            = express();
var mongoose       = require('mongoose');
var passport       = require('passport');
var expressSession = require('express.session');
var cookieParser   = require("cookie-parser");
const ENV                = require('./app-env');
const googleClientKey    = ENV.GOOGLE_CLIENT_ID;
const googleClientSecret = ENV.GOOGLE_CLIENT_SECRET;

// Mongoose Setup
mongoose.connect('mongodb://localhost:27017/facebook-authentication-app');

// Middleware
app.use( cookieParser() );
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(app.router);

// Setting up the Passport Strategies
require("./config/passport")(passport)
const User = require('../models/user');
const passport = require('passport');
const googleClientKey = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));
// Add code here:

app.listen(3000);
