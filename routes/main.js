var router = require('express').Router();
var Product = require('../models/product');

/**
 * Elastic Search [Create Mapping]
 * Creating bridge between Product database and ElasticSearch Repilca set
 */
Product.createMapping(function(err, mapping) {
    if (err) {
      console.log("error creating mapping");
      console.log(err);
    } else {
      console.log("Mapping created");
      console.log(mapping);
    }
  });

/**
 * Synchronilizing whole product data into elasticsearch replica set
 */
var stream = Product.synchronize();
var count = 0;

/**
 * Event Driven Methods
 */

 /**
  * Counting the resultant documents
  */
 stream.on('data', function() {
    count++;
  });

/**
 * Close Event
 */
stream.on('close', function() {
    console.log("Indexed " + count + " documents");
  });

/**
 * Error Event
 */
stream.on('error', function(err) {
    console.log(err);
  });

/**
 * Method : Post
 * url: '/search'
 * Descripton: 
 */
router.post('/search', function(req, res, next) {
    res.redirect('/search?q=' + req.body.q);
  });
  

/**
 * Method : GET
 * url: '/search'
 * Descripton: 
 */
router.get('/search', function(req, res, next) {
    if (req.query.q) {
      Product.search({
        query_string: { query: req.query.q}
      }, function(err, results) {
        if (err) return next(err);
        var data = results.hits.hits.map(function(hit) {
          return hit;
        });
        res.render('main/search-result', {
          query: req.query.q,
          data: data
        });
      });
    }
  });


/**
 * Method : GET
 * url: '/'
 * Descripton: 
 */
router.get('/', (req, res) => {
    res.render('main/home');
});

/**
 * Method : GET
 * url: '/about'
 * Descripton: 
 */
router.get('/about', (req, res) => {
    res.render('main/about');
});

/**
 * Method : GET
 * url: '/products/:id'
 * Descripton: 
 */

 router.get('/products/:id', (req, res, next) => {
     Product
        .find({ category: req.params.id })
        .populate('category')
        .exec((err, products) => {
            if(err) return next(err);
            res.render('main/category', {
                products: products
            });
        });
 });

/**
 * Method : GET
 * url: '/product/:id'
 * Descripton: 
 */
 router.get('/product/:id', function(req, res, next) {
    Product.findById({ _id: req.params.id }, function(err, product) {
      if (err) return next(err);
      res.render('main/product', {
        product: product
      });
    });
  });


module.exports = router;

