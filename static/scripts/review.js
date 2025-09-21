const nextButton = document.querySelector('#next-review-button');

nextButton.addEventListener('click', (e) => {
    console.log('clicked!');
    let url = new URL(window.location.href);
    let reviewIndex = parseInt(url.searchParams.get('review-index'));

    if(isNaN(reviewIndex)) {
        reviewIndex = 0;
    }

    console.log('current review index: ' + reviewIndex);
    reviewIndex += 1;

    url.searchParams.set('review-index', reviewIndex);
    console.log('redirecting...');
    window.location.href = url.toString();
});


