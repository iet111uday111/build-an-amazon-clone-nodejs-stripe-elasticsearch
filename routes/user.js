var router = require('express').Router();
var User = require('../models/user');

/**
 * Method: get
 * Url: '/signup'
 * Description: For creating a account in application
 */
router.get('/signup', (req, res, next)=> {
    res.render('accounts/signup', {
        errors: req.flash('errors')
    });
});

/**
 * Method: post
 * Url: '/signup'
 * Description: For creating a account in application
 */
router.post('/signup', (req, res, next) => {
    var user = new User();

    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    User.findOne({ email: req.body.email }, (err, exitingUser) => {
        if(exitingUser){
            // console.log(req.body.email + " is already exist");
            req.flash('errors', 'Account with that email address already exists');
            return res.redirect('/signup');  
        }else{
            user.save((err, user) => {
                if(err) return next(err);

                // res.json("New user has been created."); 
                res.redirect('/');
            });
        }
    });
});

module.exports = router;