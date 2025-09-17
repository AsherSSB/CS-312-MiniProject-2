const express = require('express');
const Fuse = require('fuse.js');
const fs = require('fs');

const router = express.Router()

router.get('/api/find/:query', (req, res) => {
    fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP Error, Status: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        const jsonString = JSON.stringify(data.applist.apps);
        fs.writeFile('test.json', jsonString, (error) => {
            if (error) {
                console.log(`Error while writing games JSON file: ${error}`);
            }

            console.log('Games JSON initialized');
        });
        findFuzz(data.applist.apps)
    })
    .catch(error => {
        console.error(`Error while fetching steam games: ${error}`)
    });
});

// use fuse to fuzzy find the query in the list of steam apps
function findFuzz(appsList, query) {
    const fuse = new Fuse(appsList , {
        keys: ['name'],
        threshold: 0.3
    });
    const results = fuse.search(query, {limit: 10});
    results.map(result => console.log(result));
}

console.log('im here now');
