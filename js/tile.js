/**
 * @file js/tile.js
 * Tile class for 2048 game
 */
import { createElement } from "./utils.js";

export class Tile {
    constructor(value, x, y, size = 100) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.size = size; // cell size for positioning
        this.element = createElement("div", "tile", value);
        this.updatePosition();
    }

    updatePosition() {
        const offset = 10; // space between cells
        const posX = this.x * this.size + offset;
        const posY = this.y * this.size + offset;
        this.element.style.transform = `translate(${posX}px, ${posY}px)`;
    }

    setValue(value) {
        this.value = value;
        this.element.textContent = value;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.updatePosition();
    }
}
