# 2048 Game

A web-based implementation of the popular 2048 sliding puzzle game.

## Description

This is a classic 2048 game where players slide numbered tiles on a 4x4 grid to combine them and reach the 2048 tile. The game features smooth animations, score tracking, and responsive design.

## How to Play

- Use arrow keys to move tiles: Up, Down, Left, Right
- Tiles with the same number merge when they collide
- Reach the 2048 tile to win
- Game continues after winning until no moves are possible

## Features

- Responsive design that works on desktop
- Smooth tile animations
- Score tracking
- Win and game over detection
- Restart functionality

## Technologies Used

- HTML5
- CSS3
- JavaScript

## Installation and Running

1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. Start playing!

No additional dependencies or build steps required.

## Project Structure

- `index.html` - Main HTML file
- `js/` - JavaScript modules
  - `game.js` - Main game logic
  - `tile.js` - Tile class
  - `score.js` - Score management
  - `movement.js` - Movement and merging logic
  - `utils.js` - Utility functions
- `styles/` - CSS styles
  - `styles.css` - Game styling