const express = require('express');
var cheerio = require('cheerio');
const router = express.Router();

var Promise = require('bluebird');
var Request = Promise.promisifyAll(require('request'));

var _ = require('lodash');
 
router.all("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, X-Requested-With');
    next();
});

//set object to be populated by scraped DOM elements
/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

router.post('/scrape', (req, res) => {
    //set the scraper url
    var url_array = [];
    for (var i = 1; i < 4; i++) {
        url_array.push(req.body.url.name + '/ref=cm_cr_arp_d_paging_btm_2?pageNumber=' + i);
    }
    console.log(url_array);

    var promises = [];

    _.forEach(url_array, function (url) {

        var options = {
            method: 'GET',
            url: url
        };

        var promise = Request.getAsync(options)
            .then(function (data) {
                var body = data.body;
                var $ = cheerio.load(body);

                var reviews_array = [];
                $('.review').filter(function (index, element) {
                    var data = $(this);

                    var json = {
                        reviewTitle: data.find('.review-title').text(),
                        reviewDate: data.find('.review-date').text().replace("on ", ""),
                        reviewRating: data.find('.review-rating').text()
                        //review: data.find('.review-data').text()
                    };

                    //pushing the json object into array.
                    reviews_array.push(json);
                });

                return reviews_array;
            });

        promises.push(promise);
    });

    return Promise.all(promises)
        .then(function (results) {
            var data = _.flatten(results);
            console.log('Returning scraped data: ' + data.length);
            return res.status(200).send(data);
        })
        .catch(function (error) {
            console.error('Error in scraping: ' + error);
            return res.status(500).send({error: error.toString()});
        });
});

// Get all posts
router.get('/posts', (req, res) => {
    // Get posts from the mock api
    // This should ideally be replaced with a service that connects to MongoDB

});

module.exports = router;