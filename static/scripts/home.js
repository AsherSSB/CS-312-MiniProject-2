const searchBar = document.querySelector('#app-search');
const queryInterval = 4000; // timeout time of 1 second
let queryTimer; // for timeout on query search

searchBar.addEventListener('keyup', async (e) => {
	const query = searchBar.value;
	console.log('setting timer');
	clearTimeout(queryTimer);
	queryTimer = setTimeout(sendQuery, queryInterval, query);	
});

async function addOptions(data) {
	const oldDatalist = document.querySelector('#query-results');

	if (oldDatalist) {
		oldDatalist.remove();
	}

	const datalist = document.createElement('datalist');
	datalist.id = 'query-results';

	for (app of data) {
		console.log(app);
		const option = document.createElement('option');
		option.value = app.item.appid;
		option.textContent = app.item.name;
		datalist.appendChild(option);

		option.addEventListener('click', async (e) => {
			searchBar.value = app.item.name;
			console.log(`sending ${app.item.name}`);
		});
	}
	
	searchBar.parentElement.insertAdjacentHtml('beforeend', datalist);

	console.log(appList);
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
