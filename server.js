var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

var secret = require('./config/secret')
var User = require('./models/user');
var Category = require('./models/category');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
var adminRoutes = require('./routes/admin');
var apiRoutes = require('./api/api'); 


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
  secret: secret.secretKey,
  store: new MongoStore({
    url: secret.database,
    autoReconnect: true
  })
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})

app.get('/*', function(req, res, next){
  if(typeof req.cookies['connect.sid'] !== 'undefined'){
    console.log(req.cookies['connect.sid']);
  }

  next(); // Calls the next middleware

});

app.use((req, res, next) => {
  Category.find({}, (err, categories) => {
    if(err) return next(err);
    res.locals.categories = categories;
    next();
  });
});

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(mainRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use('/api',apiRoutes);


app.listen(secret.port, (err) => {
    if(err) throw err;
    console.log(`Server is running at ${secret.port}`);
});
