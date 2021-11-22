const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'VAZ5xUdxCXBLrzwU1hLLeTC4q8m4pCJGF6tSp3QW-j8';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function to set attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links and photos, add to the dom.
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosarray
    photosArray.forEach((photo) => {
        // Create <a></a> to link to unpslash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create img for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // Put image in side a, then put both inside imagecontainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from unsplash api

async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (e) {
        // Catch error
        console.log(e);
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// on load
getPhotos();
