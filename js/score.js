/**
 * @returns {Score}
 * Score class for 2048 game
 */
export class Score {
  constructor() {
    this.value = 0;
    this.scoreEl = document.getElementById("score");
  }

  add(points) {
    this.value += points;
    this.update();
  }

  reset() {
    this.value = 0;
    this.update();
  }

  update() {
    this.scoreEl.textContent = this.value;
  }
}
