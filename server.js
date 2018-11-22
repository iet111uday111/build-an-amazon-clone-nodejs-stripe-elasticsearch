var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');

var User = require('./models/user');

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
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.post('/create-user', (req, res, next) => {
  var user = new User();
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;
  user.save((err) => {
      if(err) return next(err);
      res.json('Successfully created a new user');
  });
  console.log(user)
});

app.get('/', (req, res) => {
  res.render('main/home');
});

app.get('/about', (req, res) => {
  res.render('main/about');
});

app.listen(3000, (err) => {
    if(err) throw err;
    console.log('Server is running');
});
