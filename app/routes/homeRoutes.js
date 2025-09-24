const express = require('express');
const fs = require('fs').promises;
const fetchReviews = require('../lib/steamReviewFetcher');
const getUserName = require('../lib/getUserName');
const router = express.Router();

async function getAppName(appid) {
    const steamAppList = JSON.parse(await fs.readFile('./steamapps.json', 'utf8'));
    const foundApp = steamAppList.find((currentApp) => currentApp.appid == appid);
    return foundApp.name;
}

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
    req.session.reviewNumber = 0;
    res.render('home.ejs');
});

router.get('/review/:appid', async (req, res) => {
    const appid = req.params.appid;
    const appName = req.query.name;
    const reviewQuery = parseInt(req.query['review-index']);
    const reviewIndex = reviewQuery >= 0 ? reviewQuery : 0;

    const reviews = await fetchReviews(appid);

    if(reviews.length === 0) {
        console.log('redirecting');
        return res.redirect(`/review-not-found/${appName}`);
    }

    const review = reviews[reviewIndex];
    const author = await getUserName(review.author.steamid);

    review.review = steamToHtml(review.review);
    const timePlayed = Math.round(review.author.playtime_forever / 60);

    res.render('review.ejs', {
        review: review.review,
        name: appName,
        timePlayed: timePlayed,
        author: author
    });
});

router.get('/feeling-lucky', async (req, res) => {
    const appidList = JSON.parse(await fs.readFile('./topapps.json', 'utf8'));
    const randomIndex = Math.floor(Math.random() * appidList.length);
    const appid = appidList[randomIndex];
    const appName = await getAppName(appid);
    res.redirect(`/review/${appid}?name=${appName}&review-index=0`); 
});

router.get('/review-not-found/:appName', (req, res) => {
    res.render('review-not-found.ejs', {appName: req.params.appName});
});

module.exports = router;
