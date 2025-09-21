require('dotenv').config();

async function getUsername(userid) {
    const query = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${userid}`;
    const result = await fetch(query);
    const data = await result.json();
    return data.response.players[0].personaname;
}

module.exports = getUsername;
