const COLORS = ['red', 'green', 'blue', 'yellow'];
const LEVEL_DURATIONS = [0.5, 1, 1.5, 2, 2.5, 3];
const NUM_FLASHES = 12;
const beepSound = new Audio("media/beep.mp3");

let startBeepPlayed = false;
let endBeepPlayed = false;
let gameInterval;
let counter = 0;
let previousColor;
let countdown = 3;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('Service worker registered with scope: ', registration.scope);
        }, function(err) {
            console.error('Service worker registration failed: ', err);
        });
    });
}

function startGame(level) {
    countdown = 3;
    startBeepPlayed = false;
    endBeepPlayed = false;
    const videoContainer = document.getElementById('video-container');
    const gameContainer = document.getElementById('game-container');
    if (!videoContainer || !gameContainer) {
        console.error('Error: Elements video-container or game-container not found');
        return;
    }

    videoContainer.style.display = 'none';
    gameContainer.style.backgroundColor = 'transparent';
    gameContainer.style.display = 'block';
    clearInterval(gameInterval);
    // for (let i = 0; i < 3; i++){
    //     setTimeout (() => {
    //         gameContainer.innerHTML = `<div style="text-align:center;">` + i + `</div>`;
    //     },1000)
    // }
    // if (!startBeepPlayed) {
    //     beepSound.play(); // Play the start beep sound
    //     startBeepPlayed = true;
    // }

    // gameInterval = setInterval(() => {
    //     flashColors(level);
    // }, LEVEL_DURATIONS[level - 1] * 1000);

    // flashColors(level);

    // if (!endBeepPlayed) {
    //     beepSound.play(); // Play the end beep sound
    //     endBeepPlayed = true;
    // }
    const countdownInterval = setInterval(() => {
        if (countdown === 0) {
            clearInterval(countdownInterval);
            if (!startBeepPlayed) {
                beepSound.play(); // Play the start beep sound
                startBeepPlayed = true;
            }
            flashColors(level);
        } else {
            gameContainer.innerHTML = '<img src="media/' + countdown + '.png" alt="Image" height="300px" width="500px">';
            console.log(countdown);
            countdown--;
        }
    }, 1000);

    // stopGame();

}

function flashColors(level) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    if (!gameContainer) {
        console.error('Error: Element game-container not found');
        return;
    }
    // for (let i = 0; i < NUM_FLASHES - 1; i++) {

    gameInterval = setInterval(() => {
        // setTimeout(() => {
        let options = COLORS.filter(color => color !== previousColor);
        let color = options[Math.floor(Math.random() * options.length)];
        gameContainer.style.backgroundColor = color;
        console.log(counter + ": " + color);
        previousColor = color;
        // gameContainer.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        // }, LEVEL_DURATIONS[level - 1] * 1000);
        // console.log(counter);
        counter++;
        if (counter >= NUM_FLASHES) {
            clearInterval(gameInterval);
            stopGame(level);
            counter = 0;
        }
    }, LEVEL_DURATIONS[level - 1] * 1000);


    // setTimeout(() => {
    //     gameContainer.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    // }, LEVEL_DURATIONS[level - 1] * 1000);
    // console.log(counter);
    // counter++;
    // if (counter >= NUM_FLASHES){
    //     clearInterval(gameInterval);

    // }
    // }
    // setTimeout(() => {
    if (!gameContainer) {
        console.error('Error: Element game-container not found');
        return;
    }
    // gameContainer.style.backgroundColor = 'white';
    const videoContainer = document.getElementById('video-container');
    if (!videoContainer) {
        console.error('Error: Element video-container not found');
        return;
    }
    // clearInterval(gameInterval);
    // }, LEVEL_DURATIONS[level - 1] * 1000);

    // console.log("Start Beep/Text");

    // setTimeout(() => {
    //     console.log("End Beep/Text");
    //     if (!endBeepPlayed) {
    //         beepSound.play(); // Play the end beep sound
    //         endBeepPlayed = true;
    //     }
    // }, NUM_FLASHES * LEVEL_DURATIONS[level - 1] * 1000);

    // setTimeout(() => {
    //     const videoContainer = document.getElementById('video-container');
    //     if (!videoContainer) {
    //         console.error('Error: Element video-container not found');
    //         return;
    //     }
    //     gameContainer.style.display = 'none';
    //     videoContainer.style.display = 'block';
    //     videoContainer.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/xE_fQGaC4vI"></iframe>';
    // }, (NUM_FLASHES + 1) * LEVEL_DURATIONS[level - 1] * 1000);

}

function stopGame(level) {

    if (!endBeepPlayed) {
        beepSound.play(); // Play the start beep sound
        endBeepPlayed = true;
    }

    const videoContainer = document.getElementById('video-container');
    const gameContainer = document.getElementById('game-container');

    setTimeout(() => {

        // clearInterval(gameInterval);

        if (!videoContainer) {
            console.error('Error: Element video-container not found');
            return;
        }
        gameContainer.style.display = 'none';
        videoContainer.style.display = 'block';
        console.log('video display');
        videoContainer.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/xE_fQGaC4vI"></iframe>';
    }, LEVEL_DURATIONS[level - 1] * 1000);

    // clearInterval(gameInterval);

    if (!gameContainer) {
        console.error('Error: Element game-container not found');
        return;
    }
}