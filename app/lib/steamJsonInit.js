const fs = require('fs').promises;

async function initializeSteamJson() {
    let result = await checkFileExists('./steamapps.json');
    if (!result) {
        await createNewSteamJson();
    } 
}

async function createNewSteamJson() {
    const response = await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/');

    if(!response.ok) {
        console.error(`While fetching from steam api HTTP Error, Status: ${response.status}`);
    }

    const data = await response.json()
    const jsonString = JSON.stringify(data.applist.apps);

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
