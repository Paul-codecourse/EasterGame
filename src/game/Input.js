export class Input {
    constructor(player) {
        document.addEventListener("keydown", e => {
            if (e.key === "ArrowLeft") player.moveLeft();
            if (e.key === "ArrowRight") player.moveRight();
        });
    }
}