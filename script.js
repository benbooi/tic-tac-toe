// Star Wars themed Tic Tac Toe game
const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const starWarsQuotes = {
    x: [
        "I am one with the Force, the Force is with me.",
        "Do or do not. There is no try.",
        "The Force will be with you. Always.",
        "I find your lack of faith disturbing.",
        "These aren't the moves you're looking for."
    ],
    o: [
        "I've got a bad feeling about this.",
        "Stay on target... Stay on target!",
        "The Force is strong with this one.",
        "I am your father's move.",
        "The dark side of the Force is a pathway to many abilities some consider to be unnatural."
    ],
    win: [
        "The Force is strong with you, young Skywalker.",
        "You've taken your first step into a larger world.",
        "The Force will be with you. Always.",
        "You are strong and wise, and I am very proud of you."
    ],
    draw: [
        "A disturbance in the Force, I sense.",
        "The Force is balanced, as all things should be.",
        "This is getting out of hand. Now there are two of them!",
        "I have a bad feeling about this draw."
    ]
};

function getRandomQuote(type) {
    const quotes = starWarsQuotes[type];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== '' || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
        gameActive = false;
        status.textContent = getRandomQuote('win');
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        status.textContent = getRandomQuote('draw');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = getRandomQuote(currentPlayer.toLowerCase());
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = getRandomQuote('x');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

// Set initial quote when page loads
document.addEventListener('DOMContentLoaded', () => {
    status.textContent = getRandomQuote('x');
}); 