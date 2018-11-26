var router = require('express').Router();
var Category = require('../models/category');

/**
 * Method : GET
 * url: '/add-category'
 * Descripton: 
 */

router.get('/add-category', (req, res, next) => {
    res.render('admin/add-category', { message : req.flash('Sucess')});
});

/**
 * Method : POST
 * url: '/add-category'
 * Descripton: 
 */

router.post('/add-category', (req, res, next) => {
    var category = new Category();
    category.name = req.body.name;

    category.save((err) => {
        if(err) return next(err);
        req.flash('Sucess', 'Successfully Added a category');
        return res.redirect('/add-category');
    });
});


module.exports = router;



