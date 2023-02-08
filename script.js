const COLORS = ['red', 'green', 'blue', 'yellow'];
const LEVEL_DURATIONS = [0.5, 1, 1.5, 2, 2.5, 3];
const NUM_FLASHES = 12;
const beepSound = new Audio("media/beep.mp3");

const videoContainer = document.getElementById('start-page');
const gameContainer = document.getElementById('game-page');
const gameBox = document.getElementById('game-container');
const countdownContainer = document.getElementById('countdown');

let startBeepPlayed = false;
let endBeepPlayed = false;
let gameInterval;
let countdownInterval
let counter = 0;
let previousColor;
let countdown = 3;

/*if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('Service worker registered with scope: ', registration.scope);
        }, function(err) {
            console.error('Service worker registration failed: ', err);
        });
    });
}*/

function startGame(level) {
    countdown = 3;
    startBeepPlayed = false;
    endBeepPlayed = false;
    if (!videoContainer || !gameContainer) {
        console.error('Error: Elements video-container or game-container not found');
        return;
    }

    videoContainer.style.display = 'none';
    // gameContainer.style.backgroundColor = 'transparent';
    gameContainer.style.display = 'block';
    clearInterval(gameInterval);

    countdownInterval = setInterval(() => {
        if (countdown === 0) {
            clearInterval(countdownInterval);

            gameBox.innerHTML = '';
            gameBox.style.color = "white"
            if (!startBeepPlayed) {
                beepSound.play(); // Play the start beep sound
                startBeepPlayed = true;
            }
            flashColors(level);
        } else {

            gameBox.innerHTML = countdown;
            //console.log(countdown);
            countdown--;
        }
    }, 1000);

}

function flashColors(level) {

    if (!gameContainer) {
        console.error('Error: Element game-container not found');
        return;
    }
    if (!gameBox) {
        console.error('Error: Element BOX not found');
        return;
    }
    gameInterval = setInterval(() => {
        let options = COLORS.filter(color => color !== previousColor);
        let color = options[Math.floor(Math.random() * options.length)];
        gameBox.style.backgroundColor = color;
        //console.log(counter + ": " + color);
        previousColor = color;

        counter++;
        if (counter > NUM_FLASHES) {
            clearInterval(gameInterval);
            stopGame(level);

        }
    }, LEVEL_DURATIONS[level - 1] * 1000);

    if (!gameContainer) {
        console.error('Error: Element game-container not found');
        return;
    }

    if (!videoContainer) {
        console.error('Error: Element video-container not found');
        return;
    }
}

function stopGame(level) {
    clearInterval(gameInterval);
    clearInterval(countdownInterval);

    if (counter > NUM_FLASHES) {
        gameBox.style.backgroundColor = 'transparent';
        gameBox.innerHTML = `Congratulations!`;
        gameBox.style.color = 'white';
        //console.log("congratulations!");
        counter = 0;
        setTimeout(() => {
            gameContainer.style.display = 'none';
            gameBox.style.backgroundColor = 'transparent';
            counter = 0;
            gameBox.innerHTML = '';
            videoContainer.style.display = 'block';
            //console.log('video display');
        }, 2000);
    } else {
        gameContainer.style.display = 'none';
        gameBox.style.backgroundColor = 'transparent';
        counter = 0;
        gameBox.innerHTML = '';
        videoContainer.style.display = 'block';
        //console.log('video display');
    }
    if (!endBeepPlayed) {
        beepSound.play(); // Play the start beep sound
        endBeepPlayed = true;
    }

    if (!videoContainer) {
        console.error('Error: Element video-container not found');
        return;
    }

    if (!gameContainer) {
        console.error('Error: Element game-container not found');
        return;
    }
}