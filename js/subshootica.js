// cube variable, is actually the submarine.
const cube = document.querySelector('.cube');
let isPickedUp = false;
let gameSpeed = 1;
let cutsceneIsPlaying = true;
// let speedMultiplier = 1;

cube.addEventListener('click', () => {
    isPickedUp = !isPickedUp;
    if (isPickedUp) {
        cube.style.animation = 'vibrate 4s infinite ease-in-out';
    } else {
        cube.style.animation = '';
    }
});

let titlescreenIsPlaying = true;

// load in titlescreen when page loads, before cutscene, press spacebar to continue
document.addEventListener('DOMContentLoaded', () => {
    const titlescreen = document.createElement('div');
    titlescreen.classList.add('titlescreen');
    document.body.appendChild(titlescreen);
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            document.body.removeChild(titlescreen);
            titlescreenIsPlaying = false;

            // load in cutscene when page loads
            if (!titlescreenIsPlaying) {
                const cutscene = document.createElement('div');
                cutscene.classList.add('cutscene');
                document.body.appendChild(cutscene);
                cutscene.style.animation = 'cutscene 10s linear';

                // Wait for the user to press the spacebar again to remove the cutscene
                document.addEventListener('keydown', (event) => {
                    if (event.code === 'Space') {
                        document.body.removeChild(cutscene);
                    }
                });
            }
        }
    });
});

document.addEventListener('mousemove', (event) => {
    if (isPickedUp) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        // hide cursor
        document.body.style.cursor = 'none';

        cube.style.left = mouseX + 'px';
        cube.style.top = mouseY + 'px';
    } else {
        // show cursor
        document.body.style.cursor = 'default';
    }
});

let canFire = true;

document.addEventListener('keydown', (event) => {
    if (isPickedUp && event.code === 'Space' && canFire) {
        canFire = false;
        // theres a lot of stupid code in here. it does seem to work.
        const torpedo = document.createElement('div');
        torpedo.classList.add('torpedo');
        document.body.appendChild(torpedo);
        const cubeRect = cube.getBoundingClientRect();
        const cubeCenterX = cubeRect.left + cubeRect.width / 2;
        const cubeCenterY = cubeRect.top + cubeRect.height / 2;
        const torpedoX = cubeCenterX;
        const torpedoY = cubeRect.bottom;
        torpedo.style.left = torpedoX + 'px';
        torpedo.style.top = torpedoY + 'px';
        const animationDuration = 2;
        const initialVelocity = 10;
        const acceleration = 2;
        const finalVelocity = initialVelocity + acceleration * animationDuration;
        torpedo.style.animation = `fire ${animationDuration}s linear`;
        // cubic bezier timing function to make the torpedo speed up
        torpedo.style.animationTimingFunction = `cubic-bezier(0, 0, 1, ${finalVelocity / initialVelocity})`;
        setTimeout(() => {
            document.body.removeChild(torpedo);
        }, animationDuration * 1000);

        setTimeout(() => {
            canFire = true;
        }, 200);
    }
});

setInterval(() => {
    const numDivs = 1;
    for (let i = 0; i < numDivs; i++) {
        const squid = document.createElement('div');
        squid.classList.add('squid');
        document.body.appendChild(squid);
        const squidHeight = squid.offsetHeight;
        const viewportHeight = window.innerHeight;
        const randomY = Math.floor(Math.random() * (viewportHeight - squidHeight));
        squid.style.top = randomY + 'px';
        const animationDuration = 20 / gameSpeed;
        squid.style.animationDuration = `${animationDuration}s`;
        setTimeout(() => {
            document.body.removeChild(squid);
        }, animationDuration * 1000);
    }
}, 2000);

setInterval(() => {
    const numDivs = 1;
    for (let i = 0; i < numDivs; i++) {
        const mine = document.createElement('div');
        mine.classList.add('mine');
        document.body.appendChild(mine);
        const mineHeight = mine.offsetHeight;
        const viewportHeight = window.innerHeight;
        const randomY = Math.floor(Math.random() * (viewportHeight - mineHeight));
        mine.style.top = randomY + 'px';
        const animationDuration = 50 / gameSpeed;
        mine.style.animationDuration = `${animationDuration}s`;
        setTimeout(() => {
            document.body.removeChild(mine);
        }, animationDuration * 1000);
    }
}, 2000);

document.addEventListener('DOMContentLoaded', () => {
let audio = new Audio('../audio/darkwater.mp3');
audio.loop = true;
audio.play();
}
);
// collqision detection
function detectCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(rect2.left > rect1.right || 
             rect2.right < rect1.left || 
             rect2.top > rect1.bottom ||
             rect2.bottom < rect1.top);
}

let score = 0; // score init
let lives = 3; // Initialize lives

setInterval(() => {
    const squids = document.querySelectorAll('.squid');
    squids.forEach(squid => {
        let squidRect = squid.getBoundingClientRect();
        if (squidRect.left <= 0) {
            lives--;
            document.getElementById('lives').textContent = `LIVES: ${lives}`; // Assuming you have a 'lives' element in your HTML

            // Optional: Remove the squid from the screen
            document.body.removeChild(squid);
        }
    });
}, 100);

setInterval(() => {
    const torpedoes = document.querySelectorAll('.torpedo');
    const squids = document.querySelectorAll('.squid');
    const mines = document.querySelectorAll('.mine');

    mines.forEach(mine => {
        torpedoes.forEach(torpedo => {
            if (detectCollision(torpedo, mine)) {
                // mine hit detection, only detects torpedoes
                if (!mine.hasBeenHit) {
                    score--;
                    document.getElementById('score').textContent = `SCORE: ${score}`;
                    mine.hasBeenHit = true;
                }

                mine.style.animationPlayState = 'paused';
                mine.style.backgroundImage = 'url(../images/explosion.png)';

                document.body.removeChild(torpedo);
                setTimeout(() => {
                    document.body.removeChild(mine);
                }, 500);
            }
        });
    });

    squids.forEach(squid => {
        torpedoes.forEach(torpedo => {
            if (detectCollision(torpedo, squid)) {
                // squid hit detection, same as mines
                if (!squid.hasBeenHit) {
                    score++;
                    document.getElementById('score').textContent = `SCORE: ${score}`;
                    squid.hasBeenHit = true;
                }
                squid.style.animationPlayState = 'paused';
                squid.style.backgroundImage = 'url(../images/explosion.png)';

                document.body.removeChild(torpedo);
                setTimeout(() => {
                    document.body.removeChild(squid);
                }, 500);
            }
        });
    });
}, 100);

// check if score is 10
let lastPowerupScore = 0;
let powerupInView = false;

setInterval(() => {
    if (score % 10 === 0 && score > lastPowerupScore) {
        lastPowerupScore = score;
        const powerup = document.createElement('div');
        powerup.classList.add('powerup');
        powerup.style.left = '100%';
        document.body.appendChild(powerup);
        powerup.style.animation = 'horizontal 10s linear infinite, vertical 1s ease-in-out infinite';
        setTimeout(() => {
            document.body.removeChild(powerup);
        }, 5000); 

        // Check for collision with cube
        setInterval(() => {
            const cubeRect = cube.getBoundingClientRect();
            const powerupRect = powerup.getBoundingClientRect();
            if (detectCollision(cube, powerup)) {
                document.body.removeChild(powerup);
                lives++;
                document.getElementById('lives').textContent = `LIVES: ${lives}`;
            }
        }, 100);
    }
}, 100);