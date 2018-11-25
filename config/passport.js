var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
/**
 * Serialize and deserialize
 */

passport.serializeUser((user, done ) =>{
    done(null, user._id)
});

passport.deserializeUser((id, done ) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

/**
 * Where does user.id go after passport.serializeUser has been called?
The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function.

serializeUser determines which data of the user object should be stored in the session. The result of the serializeUser method is attached to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide the user id as the key) req.session.passport.user = {id: 'xyz'}

We are calling passport.deserializeUser right after it where does it fit in the workflow?
The first argument of deserializeUser corresponds to the key of the user object that was given to the done function (see 1.). So your whole object is retrieved with help of that key. That key here is the user id (key can be any key of the user object i.e. name,email etc). In deserializeUser that key is matched with the in memory array / database or any data resource.

The fetched object is attached to the request object as req.user

Visual Flow

passport.serializeUser(function(user, done) {
    done(null, user.id);
});              │
                 │ 
                 │
                 └─────────────────┬──→ saved to session
                                   │    req.session.passport.user = {id: '..'}
                                   │
                                   ↓           
passport.deserializeUser(function(id, done) {
                   ┌───────────────┘
                   │
                   ↓ 
    User.findById(id, function(err, user) {
        done(err, user);
    });            └──────────────→ user object attaches to the request as req.user   
});
 */


 /**
  * Middleware
  */

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email}, (err, user) =>{
        if(err) return done(err);

        if(!user){
            return done(null, false, req.flash('loginMessage', 'No User has been found'));
        }

        if(!user.comparePassword(password)){
            return done(null, false, req.flash('loginMessage', 'Oops, wrong password pal'));
        }

        return done(null, user);
    });
}));

/**
 * Custom Function to Validate
 */

exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/login');
}