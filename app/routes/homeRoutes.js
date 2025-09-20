const express = require('express');
const fetchReviews = require('../lib/steamReviewFetcher');
const router = express.Router();

// steam has its own mini markup language that needs to be converted to html
function steamToHtml(text) {
  text = text.replace(/\[b](.*?)\[\/b]/g, '<b>$1</b>');
  text = text.replace(/\[i](.*?)\[\/i]/g, '<i>$1</i>');
  text = text.replace(/\[u](.*?)\[\/u]/g, '<u>$1</u>');
  text = text.replace(/\[strike](.*?)\[\/strike]/g, '<strike>$1</strike>');

  text = text.replace(/\[h1](.*?)\[\/h1]/g, '<h3>$1</h3>');
  text = text.replace(/\[h2](.*?)\[\/h2]/g, '<h4>$1</h4>');
  text = text.replace(/\[h3](.*?)\[\/h3]/g, '<h5>$1</h5>');

  text = text.replace(/\[url=(.*?)](.*?)\[\/url]/g, '<a href="$1">$2</a>');

  text = text.replace(/\[spoiler](.*?)\[\/spoiler]/g, '<span class="spoiler">$1</span>');

  text = text.replace(/\[hr][/hr]/g, '<hr>');

  text = text.replace(/(\r\n|\r|\n)/g, '<br>');

  return text;
}

router.get('/', (req, res) => {
    res.render('home.ejs');
});

router.get('/review/:appid', async (req, res) => {
    const appid = req.params.appid;
    const appName = req.query.name;
    const reviews = await fetchReviews(appid);
    console.log(reviews.slice().reverse());
    reviews[0].review = steamToHtml(reviews[0].review);
    res.render('review.ejs', {review: reviews[0], name: appName});
});

module.exports = router;
