var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

var secret = require('./config/secret')
var User = require('./models/user');
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

var app = express();

mongoose.connect(secret.database, (err, db) => {
  if(err){
    console.log('Got some issue while connecting to database.', err);
  }else{
    console.log('Connected to Database'); 
  }
});

//Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey
}));
app.use(flash());

app.get('/*', function(req, res, next){
  if(typeof req.cookies['connect.sid'] !== 'undefined'){
    console.log(req.cookies['connect.sid']);
  }

  next(); // Calls the next middleware

});

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(mainRoutes);
app.use(userRoutes);

app.listen(secret.port, (err) => {
    if(err) throw err;
    console.log(`Server is running at ${secret.port}`);
});
