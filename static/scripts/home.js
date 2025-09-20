const searchBar = document.querySelector('#app-search');
const appOptions = document.querySelector('#app-options');
const queryInterval = 2000; // timeout time of 1 second
let queryTimer; // for timeout on query search

searchBar.addEventListener('keyup', async (e) => {
	const query = searchBar.value;
	console.log('setting timer');
	clearTimeout(queryTimer);
	queryTimer = setTimeout(sendQuery, queryInterval, query);	
});

async function addOptions(data) {
    appOptions.replaceChildren();
	for (const app of data) {
		const option = document.createElement('button');
		option.value = app.item.appid;
		option.textContent = app.item.name;
        option.classList.add('btn', 'btn-light', 'text-start');

		option.addEventListener('click', async (e) => {
            e.preventDefault();
			searchBar.value = app.item.name;
            const appName = encodeURIComponent(app.item.name);
            window.location.href = `/review/${app.item.appid}?name=${appName}`
		});

		appOptions.appendChild(option);
	}
}

async function sendQuery(query) {
	console.log('sending query');
	const response = await fetch(`/api/find/${query}`);

	if (!response.ok) {
		console.log(`Error fetching query ${response.status}`);
		return [];
	}

	addOptions(await response.json());
}
