/*
 * @file js/game.js
 * Main game logic for 2048 game
 * Imports utility functions, tile class, score class, and movement functions
 * Initializes game, handles tile spawning and user input
 */


import { getRandomInt } from "./utils.js";
import { Tile } from "./tile.js";
import { Score } from "./score.js";
import { moveLeft, moveRight, moveUp, moveDown } from "./movement.js";

export let tiles = [];

const gridSize = 4;
const tileSize = 90; // adjust spacing
let score;
let gameOver = false;

function init() {
    const gridContainer = document.querySelector(".grid-container");
    const restartBtn = document.getElementById("restart-btn");

    if (!gridContainer || !restartBtn) return;

    gridContainer.innerHTML = "";
    tiles = [];
    score = new Score();
    spawnTile(gridContainer);
    spawnTile(gridContainer);

    // attach restart
    // restart button listener is attached once in DOMContentLoaded
}

function getEmptyCells() {
    const empty = [];
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (!tiles.find(t => t.x === x && t.y === y)) {
                empty.push({ x, y });
            }
        }
    }
    return empty;
}

function spawnTile(gridContainer) {
    const empty = getEmptyCells();
        if (empty.length === 0) return;
    const { x, y } = empty[getRandomInt(empty.length)];
    const value = Math.random() > 0.9 ? 4 : 2;
    const tile = new Tile(value, x, y, tileSize);
    tiles.push(tile);
    gridContainer.appendChild(tile.element);
}

function showGameOver(gridContainer) {
    gameOver = true;
    const existing = document.querySelector('.game-over-overlay');
    if (existing) return;
    const overlay = document.createElement('div');
    overlay.className = 'game-over-overlay';
    overlay.innerHTML = `<div class="game-over-box"><h2>Game Over</h2><button id="game-over-restart">Restart</button></div>`;
    gridContainer.parentElement.appendChild(overlay);
    const btn = document.getElementById('game-over-restart');
    if (btn) btn.addEventListener('click', () => {
        // remove overlay and restart
        overlay.remove();
        gameOver = false;
        init();
    });
}

function showYouWin(gridContainer) {
    gameOver = false;
    const existing = document.querySelector('.you-win-overlay');
    if (existing) return;
    const overlay = document.createElement('div');
    overlay.className = 'you-win-overlay';
    overlay.innerHTML = `<div class="you-win-box"><h2>You Win!</h2><button id="you-win-restart">Restart</button></div>`;
    gridContainer.parentElement.appendChild(overlay);
    const btn = document.getElementById('you-win-restart');
    if (btn) btn.addEventListener('click', () => {
        // remove overlay and restart
        overlay.remove();
        gameOver = false;
        init();
    });
}


function checkGameOver(gridContainer) {
    const empty = getEmptyCells();
    if (empty.length === 0) {
        // no empty cells -> game over
        showGameOver(gridContainer);
        return true;
    }
    return false;
}

// Initialize when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
    init();

    const restartBtn = document.getElementById("restart-btn");
    if (restartBtn) restartBtn.addEventListener("click", () => init());

        window.addEventListener("keydown", e => {
            if (gameOver) return;
            const gridContainer = document.querySelector(".grid-container");
            let moved = false;
            switch (e.key) {
                case "ArrowLeft":
                    moved = moveLeft(tiles, gridSize, score);
                    break;
                case "ArrowRight":
                    moved = moveRight(tiles, gridSize, score);
                    break;
                case "ArrowUp":
                    moved = moveUp(tiles, gridSize, score);
                    break;
                case "ArrowDown":
                    moved = moveDown(tiles, gridSize, score);
                    break;
            }
            if (moved) {
                spawnTile(gridContainer);
                // check win when a tile is 2048 or more
                if (tiles.some(t => t.value >= 2048)) {
                    showYouWin(gridContainer);
                }
                // check for game over
                checkGameOver(gridContainer);
            }
        });
});