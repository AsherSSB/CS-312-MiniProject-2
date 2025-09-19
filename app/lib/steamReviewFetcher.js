
async function getFunnyReviews(appid, reviews=[], cursor='*') {
	const reviewCount = 200 // reviews to fetch from top
	let queryResult = await fetchAppReviews(appid, cursor);

	while (queryResult.reviews && reviews.length < reviewCount) {
		reviews = reviews.concat(queryResult.reviews);
		cursor = queryResult.cursor;
		console.log(cursor);
		queryResult = await fetchAppReviews(appid, cursor);
	}
	
	reviews.sort((a, b) => b.votes_funny - a.votes_funny); // descending order
	return reviews;
}

async function fetchAppReviews(appid, cursor) {
	cursor = encodeURIComponent(cursor);
	const query = `https://store.steampowered.com/appreviews/${appid}?json=1&filter=funny&language=english&cursor=${cursor}&num_per_page=100`

	const data = await fetch(query);
	.then(res => {
		if (!res.ok) {
			throw new Error("unable to get app reviews");
		}
		return res.json();
	})
	.then(data => {
		return data;
	})
	.catch(error => {
		console.log(error);
		return [];
	});
	
	return data;
}
