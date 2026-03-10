// /src/main.js
import { Game } from "./core/Game.js";

const canvas = document.getElementById("gameCanvas");
const game = new Game(canvas);

game.start();

document.addEventListener("click", () => {
    game.state = "playing";
}, { once: true });