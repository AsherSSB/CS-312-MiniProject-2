const express = require('express');
const fetchReviews = require('../lib/steamReviewFetcher');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home.ejs');
});

router.get('/review/:appid', async (req, res) => {
    const appid = req.params.appid;
    const appName = req.query.name;
    const reviews = await fetchReviews(appid);
    res.render('review.ejs', {review: reviews[0], name: appName});
});

module.exports = router;
