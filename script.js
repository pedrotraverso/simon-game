// Obtener los elementos de los botones
const greenButton = document.getElementById('green-button');
const redButton = document.getElementById('red-button');
const blueButton = document.getElementById('blue-button');
const yellowButton = document.getElementById('yellow-button');

const colorButtons = ['green-button', 'red-button', 'blue-button', 'yellow-button'];

// Obtener el botón de inicio
const startButton = document.getElementById('start-button');

// Array para almacenar la secuencia del juego
let gameSequence = [];

// Array para almacenar la secuencia del jugador
let playerSequence = [];

// Variable para almacenar el nivel actual del juego
let level = 1;

// Variable para almacenar el puntaje de las luces
let lightScore = 0;

// Variable para almacenar el puntaje de la sequencia
let sequenceScore = 0;

const logo = document.getElementById('logo');

logo.style.filter = 'opacity(60%)';
greenButton.style.background = 'radial-gradient(circle, #2f2f2f 35%, #000000 100%)';
redButton.style.background = 'radial-gradient(circle, #2f2f2f 35%, #000000 100%)';
blueButton.style.background = 'radial-gradient(circle, #2f2f2f 35%, #000000 100%)';
yellowButton.style.background = 'radial-gradient(circle, #2f2f2f 35%, #000000 100%)';

startButton.addEventListener('click', powerGame);

//Función para prender el juego
function powerGame() {
    logo.style.filter = 'none';
    greenButton.style.background = 'radial-gradient(circle, rgb(0, 128, 0) 35%, #000000 100%)';
    redButton.style.background = 'radial-gradient(circle, rgb(192, 0, 0) 35%, #000000 100%)';
    blueButton.style.background = 'radial-gradient(circle, rgb(0, 0, 192) 35%, #000000 100%)';
    yellowButton.style.background = 'radial-gradient(circle, rgb(192, 192, 0) 35%, #000000 100%)';

    const powerOnIcon = document.getElementById('power-on-icon');
    const powerOffIcon = document.getElementById('power-off-icon');
    const playIcon = document.getElementById('play-icon');
    const restartIcon = document.getElementById('restart-icon');

    powerOnIcon.style.display = 'none';
    powerOffIcon.style.display = 'none';
    playIcon.style.display = 'inline';
    restartIcon.style.display = 'none';

    startButton.addEventListener('click', startGame);
}

let isGameActive = true;

// Función para iniciar el juego
function startGame() {
    // Obtén el valor del nombre ingresado por el jugador
    const playerName = document.getElementById('player-name').value;

    // Verifica que el nombre tenga al menos 3 letras
    if (playerName.length < 3) {
        alert('Please enter a name with at least 3 letters.');
        return;
    }

    const powerOnIcon = document.getElementById('power-on-icon');
    const powerOffIcon = document.getElementById('power-off-icon');
    const playIcon = document.getElementById('play-icon');
    const restartIcon = document.getElementById('restart-icon');

    powerOnIcon.style.display = 'inline';
    powerOffIcon.style.display = 'none';
    playIcon.style.display = 'none';
    restartIcon.style.display = 'none';

    isGameActive = true;

    generateSequence();
    playSequence();
    startTimer();

    startButton.addEventListener('click', exitGame);
}

function restartGame() {
    // Ventana modal
    var modal = document.getElementById("game-over");

    // Cuando el usuario, se abre la ventana
    modal.style.display = "none";
    gameSequence = [];
    playerSequence = [];
    level = 1;
    lightScore = 0;
    sequenceScore = 0;
    updateLightScore();
    updateSequenceScore();
    resetTimer();
    startGame();
}

function stopGame() {
    isGameActive = false;
}

// Función para generar una nueva secuencia de juego
function generateSequence() {
    for (let i = 0; i < level; i++) {
        const randomColor = Math.floor(Math.random() * colorButtons.length);
        gameSequence.push(randomColor);
    }
}

// Función para reproducir la secuencia de juego
// function playSequence() {
//     let i = 0;
//     const sequenceInterval = setInterval(() => {
//         const buttonIndex = gameSequence[i];
//         lightUpButton(buttonIndex);
//         i++;
//         if (i >= gameSequence.length) {
//             clearInterval(sequenceInterval);
//         }
//     }, 1000);
// }

// Función para reproducir la secuencia de juego
function playSequence() {
    let i = 0;
    const sequenceInterval = setInterval(() => {
        if (isGameActive) {
            const buttonIndex = gameSequence[i];
            lightUpButton(buttonIndex);
            i++;
            if (i >= gameSequence.length) {
                clearInterval(sequenceInterval);
            }
        }
    }, 1000);
}

// Función para manejar el clic en los botones del juego
function handleButtonClick(buttonIndex) {
    if (gameSequence.length > 0) {
        lightUpButton(buttonIndex);
        if (buttonIndex === gameSequence[playerSequence.length]) {
            playerSequence.push(buttonIndex);
            lightScore++;
            updateLightScore();
            if (playerSequence.length === gameSequence.length) {
                setTimeout(() => {
                    nextLevel();
                    updateSequenceScore();
                }, 1000);
            }
        } else {
            gameOver();
        }
    }
}

// Verificar si la secuencia del jugador coincide con la secuencia actual
function checkSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== gameSequence[i]) {
            return false;
        }
    }
    return true;
}

// Función para iluminar un botón
function lightUpButton(buttonIndex) {
    const buttons = [greenButton, redButton, blueButton, yellowButton];
    buttons[buttonIndex].classList.add('active');
    setTimeout(() => {
        buttons[buttonIndex].classList.remove('active');
    }, 500);
}

function exitGame() {
    gameSequence = [];
    playerSequence = [];
    level = 1;
    lightScore = 0;
    sequenceScore = 0;
    updateLightScore();
    updateSequenceScore();
    resetTimer();
    const powerOnIcon = document.getElementById('power-on-icon');
    const powerOffIcon = document.getElementById('power-off-icon');
    const playIcon = document.getElementById('play-icon');
    const restartIcon = document.getElementById('restart-icon');
    powerOnIcon.style.display = 'none';
    powerOffIcon.style.display = 'inline';
    playIcon.style.display = 'none';
    restartIcon.style.display = 'none';
    window.location.href = "index.html";
}

// Función para actualizar el puntaje de las luces acertadas en pantalla
function updateLightScore() {
    const lightScoreElement = document.getElementById('light-score');
    lightScoreElement.textContent = `Light Score: ${lightScore}`;
}

// Función para actualizar el puntaje de las sequencias acertadas en pantalla
function updateSequenceScore() {
    const sequenceScoreElement = document.getElementById('sequence-score');
    sequenceScoreElement.textContent = `Sequence Score: ${sequenceScore}`;
}

let timer;
let minutes = 0;
let seconds = 0;
let isRunning = false;

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000); // Cada 1000 ms (1 segundo)
    }
}

function stopTimer() {
    isRunning = false;
    clearInterval(timer);
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    document.getElementById('minutes').innerText = padNumber(minutes);
    document.getElementById('seconds').innerText = padNumber(seconds);
}

function padNumber(num) {
    return num.toString().padStart(2, '0');
}

function resetTimer() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    isRunning = false;
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
}

// Función para avanzar al siguiente nivel del juego
function nextLevel() {
    playerSequence = [];
    level++;
    generateSequence();
    playSequence();
    sequenceScore++;
    updateSequenceScore();
}

// Función para mostrar y ocultar el contenido
function toggleResults() {
    var resultsContainer = document.getElementById('results-container');
    var boardContainer = document.getElementById('board-container');
    
    if (resultsContainer.style.display === 'none' || resultsContainer.style.display === '') {
        resultsContainer.style.display = 'inline-flex';
        boardContainer.style.display = 'inline-flex';
        resultsContainer.style.gridColumnStart = 1;
        resultsContainer.style.gridColumnEnd = 2;
        resultsContainer.style.gridRowStart = 2;
        resultsContainer.style.gridRowEnd = 3;
        boardContainer.style.gridColumnStart = 2;
        boardContainer.style.gridColumnEnd = 3;
        boardContainer.style.gridRowStart = 2;
        boardContainer.style.gridRowEnd = 3;
    } else {
        resultsContainer.style.display = 'none';
        boardContainer.style.display = 'inline-flex';
        boardContainer.style.gridColumnStart = 1;
        boardContainer.style.gridColumnEnd = 3;
        boardContainer.style.gridRowStart = 2;
        boardContainer.style.gridRowEnd = 3;
    }
}

// Función para mostrar el modal
function gameOver() {
    // Detener el temporizador
    stopGame();
    stopTimer();

    // Ventana modal
    var modal = document.getElementById("game-over");

    // Cuando el usuario, se abre la ventana
    modal.style.display = "block";
}