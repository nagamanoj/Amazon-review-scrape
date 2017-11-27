const express = require('express');
var cheerio = require('cheerio');
// declare axios for making http requests
const axios = require('axios');
const router = express.Router();
var request = require('request');


var reviewTitle, reviewDate, reviewRating, reviewTitleText, reviewDateText, reviewRatingText;
var reviewTitleArr = [];
var reviewDateArr = [];
var reviewRatingArr = [];

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
    var url = [];

    var detailsArray = [];
    console.log(url);
    console.log("reviewTitleArr", reviewTitleArr);
    console.log("reviewDateArr", reviewDateArr);
    console.log("reviewRatingArr", reviewRatingArr);
    //console.log(req.body.url.name);
    for (var i = 1; i < 4; i++) {
        url.push(req.body.url.name + '/ref=cm_cr_arp_d_paging_btm_2?pageNumber=' + i);
        //url.push('https://www.amazon.com/SanDisk-Ultra-Class-Memory-SDSDUNC-032G-GN6IN/product-reviews/B0143RT8OY/ref=cm_cr_arp_d_paging_btm_2?pageNumber=' + i);

    }
    console.log(url);
    for (i in url) {
        request(url[i], function(error, response, html) {
            if (!error) {
                //use cheerio to use jquery to select DOM elements
                var $ = cheerio.load(html);

                $('.review-title').filter(function() {
                    reviewTitle = $(this);
                    reviewTitleText = reviewTitle.text();
                    reviewTitleArr.push(reviewTitleText);
                })
                $('.review-date').filter(function() {
                    reviewDate = $(this);
                    reviewDateText = reviewDate.text();
                    reviewDateArr.push(reviewDateText);
                })
                $('.review-rating').filter(function() {
                    reviewRating = $(this);
                    reviewRatingText = reviewRating.text();
                    reviewRatingArr.push(reviewRatingText);
                })
            }
        })
    }
    for (var i = 0; i < reviewDateArr.length; i++) {
        var details = {
            reviewTitle: reviewTitleArr[i],
            reviewDate: reviewDateArr[i],
            reviewRating: reviewRatingArr[i]
        };
        detailsArray.push(details);
    }

    //console.log("hello");
    console.log("=======================================================================================");
    //console.log(reviewDateText);
    //console.log(reviewDateText);
    //console.log(reviewRatingText);
    console.log(detailsArray);

    res.send(detailsArray);
});

// Get all posts
router.get('/posts', (req, res) => {
    // Get posts from the mock api
    // This should ideally be replaced with a service that connects to MongoDB

});

module.exports = router;