// // src/core/input.js
// export class Input {
//     constructor(game, player) {

//         document.addEventListener("keydown", e => {
//             if(e.key === "ArrowLeft") player.moveLeft();
//             if(e.key === "ArrowRight") player.moveRight();

//             // PAUSE TOGGLE
//             if(e.code === "Space") {
//                 if(game.state === "playing") game.state = "paused";
//                 else if(game.state === "paused") game.state = "playing";
//             }

//             // RESTART BUTTON
//             if((e.key === "r" || e.key === "R") && game.state === "gameover") {
//                 game.restart();
//             }

//             // MUSIC TOGGLE
//             if(e.key === "m" || e.key === "M") {
//                 if(game.musicPlaying) {
//                     game.sound.stopMusic();
//                     game.musicPlaying = false;
//                 } else {
//                     game.sound.playMusic();
//                     game.musicPlaying = true;
//                 }
//             }

//             // QUIT BUTTON
//             if(e.key === "q" || e.key === "Q") {
//                 console.log("Quitting game...");
//                 game.state = "quit";
//             }
//         });

//         // TOUCH
//         document.addEventListener("touchstart", e => {
//             const rect = game.canvas.getBoundingClientRect();
//             const x = e.touches[0].clientX - rect.left;
//             if(x < rect.width/2) player.moveLeft();
//             else player.moveRight();
//         });
//     }
// }

export class Input {

    constructor(game, player) {

        document.addEventListener("keydown", e => {

            if (e.key === "ArrowLeft") player.moveLeft();
            if (e.key === "ArrowRight") player.moveRight();

            // Pause toggle
            if (e.code === "Space") {
                game.state = game.state === "playing" ? "paused" : "playing";
            }

            // Restart
            if ((e.key === "r" || e.key === "R") && game.state === "gameover") {
                game.restart();
            }

            // Music toggle
            if (e.key === "m" || e.key === "M") {
                if (game.musicPlaying) {
                    game.sound.stopMusic();
                    game.musicPlaying = false;
                } else {
                    game.sound.playMusic();
                    game.musicPlaying = true;
                }
            }

            // Quit
            if (e.key === "q" || e.key === "Q") {
                console.log("Quitting game...");
                //game.state = "quit";
                game.state = "gameover";
              //  game.restart();
            }

        });

        // Touch controls
        document.addEventListener("touchstart", e => {
            const rect = game.canvas.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            if (x < rect.width / 2) {
                player.moveLeft();
            } else {
                player.moveRight();
            }
        });

    }

}