import { ping } from "./connection.js";

const DURATION = 5000;

class HeatBeat {
  timer = -1;

  start() {
    this.timer = setTimeout(() => this._tick(), DURATION);
  }

  stop() {
    if (this.timer !== -1) {
      clearTimeout(this.timer);
    }
  }

  _tick() {
    ping()
    this.timer = setTimeout(() => this._tick(), DURATION);
  }
}

export default new HeatBeat();
