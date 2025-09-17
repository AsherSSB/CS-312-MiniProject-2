const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const gameData = require('../../test.json'); // in home directory

    res.render('home.ejs', {apps: gameData});
});

module.exports = router;
