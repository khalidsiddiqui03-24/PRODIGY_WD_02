const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');
const statusText = document.getElementById('status');
const playerVsPlayerBtn = document.getElementById('playerVsPlayerBtn');
const playerVsAiBtn = document.getElementById('playerVsAiBtn');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isPlayerVsAi = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== null || checkWinner()) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} wins!`;
    } else if (gameState.every(cell => cell !== null)) {
        statusText.textContent = `It's a draw!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (isPlayerVsAi && currentPlayer === 'O') {
            setTimeout(aiMove, 500);
        }
    }
}

function aiMove() {
    let availableCells = gameState.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    let randomCellIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameState[randomCellIndex] = currentPlayer;
    cells[randomCellIndex].textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} wins!`;
    } else if (gameState.every(cell => cell !== null)) {
        statusText.textContent = `It's a draw!`;
    } else {
        currentPlayer = 'X';
    }
}

function checkWinner() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameState = Array(9).fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    statusText.textContent = '';
}

function startPlayerVsPlayer() {
    isPlayerVsAi = false;
    restartGame();
}

function startPlayerVsAi() {
    isPlayerVsAi = true;
    restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
playerVsPlayerBtn.addEventListener('click', startPlayerVsPlayer);
playerVsAiBtn.addEventListener('click', startPlayerVsAi);