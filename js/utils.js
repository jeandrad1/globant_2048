/**
 * @param {number} max 
 * @returns {number}
 * Utility functions for 2048 game
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function createElement(type, className, text = "") {
  const el = document.createElement(type);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}
