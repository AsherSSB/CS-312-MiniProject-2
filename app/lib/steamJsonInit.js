const fs = require('fs').promises;
require('dotenv').config();

async function initializeSteamJson() {
    let result = await checkFileExists('./steamapps.json');
    if (!result) {
        await createNewSteamJson();
    } 
}

async function createNewSteamJson() {
    const query = `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${process.env.STEAM_API_KEY}&include_games=true&include_dlc=false&include_software=false&include_videos=false&include_hardware=false&max_results=50000`;
    console.log('fetching');
    let response = await fetch(query);
    let games = [];

    if(!response.ok) {
        console.error(`While fetching from steam api HTTP Error, Status: ${response.status}`);
        // intentionally uncaught 
        // program should not run if no list can be created
        throw new Error('Unable to initialize steam games list'); 
    }
    
    let data = await response.json();
    games = games.concat(data.response.apps);

    while(data.response.have_more_results) {
        const followupQuery = query.concat(`&last_appid=${data.response.last_appid}`);
        console.log('fetching');
        response = await fetch(followupQuery);       
        data = await response.json();
        games = games.concat(data.response.apps);
    }

    console.log(games.length);
    const jsonString = JSON.stringify(games);

    await fs.writeFile('./steamapps.json', jsonString)
}

async function checkFileExists(filePath) {
    try {
        await fs.stat(filePath); // send to catch block
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = initializeSteamJson;
