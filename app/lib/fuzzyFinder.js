const Fuse = require('fuse.js');
const fs = require('fs').promises;

async function querySteamApps(query) {
    const steamAppList = JSON.parse(await fs.readFile('./steamapps.json', 'utf8'));
    const fuse = new Fuse(steamAppList, {
        keys: ['name'],
        threshold: 0.3
    });

    return fuse.search(query, {limit: 10});
}

module.exports = querySteamApps;
