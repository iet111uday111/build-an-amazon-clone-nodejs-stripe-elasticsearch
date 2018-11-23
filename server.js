var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

var User = require('./models/user');
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

var dbUrl = 'mongodb://localhost:27017/ecommerce';
var app = express();

mongoose.connect(dbUrl, (err, db) => {
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
  secret: 'Uday@!#$@!%*^'
}));
app.use(flash());

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(mainRoutes);
app.use(userRoutes);

app.listen(3000, (err) => {
    if(err) throw err;
    console.log('Server is running');
});
