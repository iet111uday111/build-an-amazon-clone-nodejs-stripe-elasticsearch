var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
var passportConfig = require('../config/passport');


/**
 * Method : GET
 * url: '/login'
 * Descripton: 
 */

router.get('/login', (req, res) => {
    if (req.user) return res.redirect('/');

    res.render('accounts/login', { message: req.flash('loginMessage') });
});

/**
* Method : POST
* url: '/login'
* Descripton: 
 */

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

/**
 * Method: GET
 * Url: '/signup'
 * Description: For creating a account in application
 */
router.get('/signup', (req, res, next) => {
    res.render('accounts/signup', {
        errors: req.flash('errors')
    });
});

/**
 * Method: GET
 * url: '/profile'
 * Description: 
 */
router.get('/profile', (req, res, next) => {
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) return next(err);
        res.render('accounts/profile', { user: user });
    });
});

/**
 * Method: POST
 * Url: '/signup'
 * Description: For creating a account in application
 */
router.post('/signup', (req, res, next) => {
    var user = new User();

    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.profile.picture = user.gravatar();

    User.findOne({ email: req.body.email }, (err, exitingUser) => {
        if (exitingUser) {
            // console.log(req.body.email + " is already exist");
            req.flash('errors', 'Account with that email address already exists');
            return res.redirect('/signup');
        } else {
            user.save((err, user) => {
                if (err) return next(err);

                req.logIn(user, (err) => {
                    if (err) return next(err);
                    res.redirect('/profile');
                })
            });
        }
    });
});

/**
 * Method : GET
 * Url: '/logout'
 * Description: 
 */
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

/**
 * Method : GET
 * Url: '/edit-profile'
 * Description: 
 */
router.get('/edit-profile', (req, res, next) => {
    res.render('accounts/edit-profile', { message: req.flash('Sucess') });
});

/**
 * Method : POST
 * Url: '/edit-profile'
 * Description: 
 */
router.post('/edit-profile', (req, res, next) => {
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) return next(err);


        if (req.body.name) user.profile.name = req.body.name;

        if (req.body.address) user.address = req.body.address;

        user.save((err) => {
            if (err) return next(err);
            req.flash('Sucess', 'Successfully Edited your profile.');
            return res.redirect('/edit-profile')
        })
    });
});

module.exports = router;