const express = require('express');
const findApp = require('../lib/fuzzyFinder.js');

const router = express.Router()

router.get('/find/:query', async (req, res) => {
    const query = req.params.query; 
    const apps = await findApp(query);
    console.log(apps);

    res.send(apps);
});

module.exports = router;
