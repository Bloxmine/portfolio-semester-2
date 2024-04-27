// Author: Hein Dijstelbloem
// Last modified: 2024-15-03
// Description: This file contains the JavaScript code for the first week page.
//              It creates divs that rotate, to make cool shapez


// these are called 'stars' but I've reused my code to turn them into glowy squares
// random number generator
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomColor() {
    const hue = Math.random() * 360;
    const saturation = 100; 
    const lightness = 50;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${getRandomNumber(0, 100)}%`;
    star.style.top = `${getRandomNumber(0, 50)}%`;
    star.style.backgroundColor = getRandomColor();
    return star;
}

function addStarsToSky(numStars) {
    const body = document.querySelector("[data-container]");
    // console.log(body)
    for (let i = 0; i < numStars; i++) {
        const star = createStar();
        body.appendChild(star); // append them to the body
    }
}

// twinkle little star
function animateStars() {
    const stars = document.getElementsByClassName('star');
    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.style.animationDelay = `${getRandomNumber(0, 5)}s`;
    }
}

addStarsToSky(25);
animateStars();
// this is the code for scrolling, might be better to set a fixed point for the squares to start fading out? now it's determined by the height of the page
window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    let stars = document.querySelectorAll('.star');
    let startOpacity = 1;
    let endOpacity = 0;
    let startScroll = 0;
    let endScroll = document.body.scrollHeight - window.innerHeight;
    let opacityValue = startOpacity + (endOpacity - startOpacity) * ((scrollPosition - startScroll) / (endScroll - startScroll));

    stars.forEach(star => {
        star.style.opacity = opacityValue;
    });
});
function toggleBoxes(boxId) {
    let box = document.getElementById(boxId);
    let boxes = document.getElementsByClassName(boxId);
    for (let i = 0; i < boxes.length; i++) {
        if (box.classList.contains('checked')) {
            boxes[i].classList.remove('unhighlight');
            boxes[i].classList.add('highlight');
        } else {
            boxes[i].classList.remove('highlight');
            boxes[i].classList.add('unhighlight');
        }
    }
    box.classList.toggle('checked');
}