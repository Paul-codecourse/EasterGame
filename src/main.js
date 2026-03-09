// /src/main.js
import { Game } from "./core/Game.js";

const canvas = document.getElementById("gameCanvas");
const game = new Game(canvas);

document.addEventListener("click", () => {
    game.start();
}, { once: true });