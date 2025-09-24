const homeButton = document.querySelector('#return-home-button');

homeButton.addEventListener('click', (e) => {
    console.log(window.location.hostname);
    window.location.href =  '/';
});
