// // // src/core/input.js
// // export class Input {
// //     constructor(game, player) {

// //         document.addEventListener("keydown", e => {
// //             if(e.key === "ArrowLeft") player.moveLeft();
// //             if(e.key === "ArrowRight") player.moveRight();

// //             // PAUSE TOGGLE
// //             if(e.code === "Space") {
// //                 if(game.state === "playing") game.state = "paused";
// //                 else if(game.state === "paused") game.state = "playing";
// //             }

// //             // RESTART BUTTON
// //             if((e.key === "r" || e.key === "R") && game.state === "gameover") {
// //                 game.restart();
// //             }

// //             // MUSIC TOGGLE
// //             if(e.key === "m" || e.key === "M") {
// //                 if(game.musicPlaying) {
// //                     game.sound.stopMusic();
// //                     game.musicPlaying = false;
// //                 } else {
// //                     game.sound.playMusic();
// //                     game.musicPlaying = true;
// //                 }
// //             }

// //             // QUIT BUTTON
// //             if(e.key === "q" || e.key === "Q") {
// //                 console.log("Quitting game...");
// //                 game.state = "quit";
// //             }
// //         });

// //         // TOUCH
// //         document.addEventListener("touchstart", e => {
// //             const rect = game.canvas.getBoundingClientRect();
// //             const x = e.touches[0].clientX - rect.left;
// //             if(x < rect.width/2) player.moveLeft();
// //             else player.moveRight();
// //         });
// //     }
// // }

// // export class Input {

// //     constructor(game, player) {

// //         document.addEventListener("keydown", e => {

// //             if (e.key === "ArrowLeft") player.moveLeft();
// //             if (e.key === "ArrowRight") player.moveRight();

// //             // Pause toggle
// //             if (e.code === "Space") {
// //                 game.state = game.state === "playing" ? "paused" : "playing";
// //             }

// //             // Restart
// //             if ((e.key === "r" || e.key === "R") && game.state === "gameover") {
// //                 game.restart();
// //             }

// //             // Music toggle
// //             if (e.key === "m" || e.key === "M") {
// //                 game.musicEnabled = !game.musicEnabled;

// //                 if (game.musicEnabled) {
// //                     game.sound.playMusic();
// //                 } else {
// //                     game.sound.stopMusic();
// //                 }
// //             }
// //             //SOund effects toggle
// //             if (e.key === "s" || e.key === "S") {
// //                 game.sfxEnabled = !game.sfxEnabled;
// //             }

// //             // Quit
// //             if (e.key === "q" || e.key === "Q") {
// //                 console.log("Quitting game...");
// //                 //game.state = "quit";
// //                 game.state = "gameover";
// //               //  game.restart();
// //             }

// //         });

// //         function handleUIButton(action, game) {
// //             switch (action) {

// //                 case "sfx":
// //                     game.sfxEnabled = !game.sfxEnabled;
// //                     break;

// //                 case "music":
// //                     game.musicEnabled = !game.musicEnabled;

// //                     if (game.musicEnabled) {
// //                         game.sound.playMusic();
// //                         game.musicPlaying = true;
// //                     } else {
// //                         game.sound.stopMusic();
// //                         game.musicPlaying = false;
// //                     }
// //                     break;

// //                 case "restart":
// //                     game.restart();
// //                     break;

// //                 case "quit":
// //                     game.state = "menu";
// //                     break;
// //             }
// //         }
    
// //         // // Touch controls
// //         // document.addEventListener("touchstart", handler, { passive: true }), e => {
// //         //     const rect = game.canvas.getBoundingClientRect();
// //         //     const x = e.touches[0].clientX - rect.left;
// //         //     if (x < rect.width / 2) {
// //         //         player.moveLeft();
// //         //     } else {
// //         //         player.moveRight();
// //         //     }
// //         // });

// //         // document.addEventListener("touchstart", (e) => {
// //         //     const rect = game.canvas.getBoundingClientRect();
// //         //     const x = e.touches[0].clientX - rect.left;

// //         //     if (x < rect.width / 2) {
// //         //         player.moveLeft();
// //         //     } else {
// //         //         player.moveRight();
// //         //     }
// //         // }, { passive: true });

// //         document.addEventListener("touchstart", (e) => {
// //             const rect = game.canvas.getBoundingClientRect();
// //             const touch = e.touches[0];

// //             const scaleX = game.canvas.width / rect.width;
// //             const scaleY = game.canvas.height / rect.height;

// //             const x = (touch.clientX - rect.left) * scaleX;
// //             const y = (touch.clientY - rect.top) * scaleY;

// //             // Check UI buttons FIRST
// //             for (const btn of game.uiButtons) {
// //                 if (
// //                     x >= btn.x &&
// //                     x <= btn.x + btn.w &&
// //                     y >= btn.y &&
// //                     y <= btn.y + btn.h
// //                 ) {
// //                     handleUIButton(btn.action, game);
// //                     return;
// //                 }
// //             }

// //             // Otherwise: gameplay input
// //             if (x < game.canvas.width / 2) {
// //                 player.moveLeft();
// //             } else {
// //                 player.moveRight();
// //             }

// //         }, { passive: true });

// //     }
    
// // }

// export class Input {

//     constructor(game, player) {

//         // 🔹 KEYBOARD INPUT
//         document.addEventListener("keydown", e => {

//             if (e.key === "ArrowLeft") player.moveLeft();
//             if (e.key === "ArrowRight") player.moveRight();

//             // Pause toggle (SAFE)
//             if (e.code === "Space") {
//                 if (game.state === "playing") game.state = "paused";
//                 else if (game.state === "paused") game.state = "playing";
//             }

//             // Restart
//             if ((e.key === "r" || e.key === "R") && game.state === "gameover") {
//                 game.restart();
//             }

//             // Music toggle
//             if (e.key === "m" || e.key === "M") {
//                 game.musicEnabled = !game.musicEnabled;

//                 if (game.musicEnabled) {
//                     game.sound.playMusic();
//                     game.musicPlaying = true;
//                 } else {
//                     game.sound.stopMusic();
//                     game.musicPlaying = false;
//                 }
//             }

//             // SFX toggle
//             if (e.key === "s" || e.key === "S") {
//                 game.sfxEnabled = !game.sfxEnabled;
//             }

//             // Quit
//             if (e.key === "q" || e.key === "Q") {
//                 game.state = "menu";
//             }

//         });

//         // 🔹 BUTTON HANDLER (FIXED SCOPE)
//         const handleUIButton = (action) => {

//             switch (action) {

//                 case "sfx":
//                     game.sfxEnabled = !game.sfxEnabled;
//                     break;

//                 case "music":
//                     game.musicEnabled = !game.musicEnabled;

//                     if (game.musicEnabled) {
//                         game.sound.playMusic();
//                         game.musicPlaying = true;
//                     } else {
//                         game.sound.stopMusic();
//                         game.musicPlaying = false;
//                     }
//                     break;

//                 case "restart":
//                     game.restart();
//                     break;

//                 case "quit":
//                     game.state = "menu";
//                     break;

//                 case "pause":
//                     if (game.state === "playing") game.state = "paused";
//                     else if (game.state === "paused") game.state = "playing";
//                     break;
//             }
//         };
//         //click input
//         document.addEventListener("click", (e) => {

//             const rect = game.canvas.getBoundingClientRect();

//             const scaleX = game.canvas.width / rect.width;
//             const scaleY = game.canvas.height / rect.height;

//             const x = (e.clientX - rect.left) * scaleX;
//             const y = (e.clientY - rect.top) * scaleY;

//             for (const btn of game.uiButtons) {
//                 if (
//                     x >= btn.x &&
//                     x <= btn.x + btn.w &&
//                     y >= btn.y &&
//                     y <= btn.y + btn.h
//                 ) {
//                     handleUIButton(btn.action);
//                     return;
//                 }
//             }

//         }, false);

//         // 🔹 TOUCH INPUT
//         document.addEventListener("touchstart", (e) => {

//             const rect = game.canvas.getBoundingClientRect();
//             const touch = e.touches[0];

//             const scaleX = game.canvas.width / rect.width;
//             const scaleY = game.canvas.height / rect.height;

//             const x = (touch.clientX - rect.left) * scaleX;
//             const y = (touch.clientY - rect.top) * scaleY;

//             // ✅ UI BUTTONS FIRST
//             for (const btn of game.uiButtons) {
//                 if (
//                     x >= btn.x &&
//                     x <= btn.x + btn.w &&
//                     y >= btn.y &&
//                     y <= btn.y + btn.h
//                 ) {
//                     handleUIButton(btn.action);
//                     return;
//                 }
//             }

//             // 🎮 GAME INPUT
//             if (game.state !== "playing") return;

//             if (x < game.canvas.width / 2) {
//                 player.moveLeft();
//             } else {
//                 player.moveRight();
//             }

//         }, { passive: true });
//     }
// }
export class Input {
    constructor(game, player) {
        // ─── KEYBOARD INPUT ───────────────────────
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
                game.musicEnabled = !game.musicEnabled;
                if (game.musicEnabled) {
                    game.sound.playMusic();
                    game.musicPlaying = true;
                } else {
                    game.sound.stopMusic();
                    game.musicPlaying = false;
                }
            }

            // SFX toggle
            if (e.key === "s" || e.key === "S") game.sfxEnabled = !game.sfxEnabled;

            // Quit
            if (e.key === "q" || e.key === "Q") game.state = "menu";
        });

        // ─── BUTTON HANDLER ───────────────────────
        const handleUIButton = action => {
            switch (action) {
                case "sfx": game.sfxEnabled = !game.sfxEnabled; break;
                case "music":
                    game.musicEnabled = !game.musicEnabled;
                    if (game.musicEnabled) { game.sound.playMusic(); game.musicPlaying = true; }
                    else { game.sound.stopMusic(); game.musicPlaying = false; }
                    break;
                case "restart": game.restart(); break;
                case "quit": game.state = "menu"; break;
                case "pause":
                    game.state = game.state === "playing" ? "paused" : "playing";
                    break;
            }
        };

        // ─── CLICK INPUT ──────────────────────────
        document.addEventListener("click", e => {
            const rect = game.canvas.getBoundingClientRect();
            const scaleX = game.canvas.width / rect.width;
            const scaleY = game.canvas.height / rect.height;

            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;

            for (const btn of game.uiButtons) {
                if (x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h) {
                    handleUIButton(btn.action);
                    return;
                }
            }
        }, false);

        // ─── TOUCH INPUT ──────────────────────────
        let touchStartX = null;
        let touchStartY = null;
        const swipeThreshold = 30; // pixels minimum for swipe

        document.addEventListener("touchstart", e => {
            const rect = game.canvas.getBoundingClientRect();
            const touch = e.touches[0];

            const scaleX = game.canvas.width / rect.width;
            const scaleY = game.canvas.height / rect.height;

            const x = (touch.clientX - rect.left) * scaleX;
            const y = (touch.clientY - rect.top) * scaleY;

            // If touching a UI button, handle it
            for (const btn of game.uiButtons) {
                if (x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h) {
                    handleUIButton(btn.action);
                    touchStartX = null; // disable swipe
                    return;
                }
            }

            // Store start point for swipe
            touchStartX = x;
            touchStartY = y;
        }, { passive: true });

        document.addEventListener("touchend", e => {
            if (touchStartX === null) return;

            const rect = game.canvas.getBoundingClientRect();
            const touch = e.changedTouches[0];

            const scaleX = game.canvas.width / rect.width;
            const scaleY = game.canvas.height / rect.height;

            const x = (touch.clientX - rect.left) * scaleX;
            const y = (touch.clientY - rect.top) * scaleY;

            const dx = x - touchStartX;
            const dy = y - touchStartY;

            // horizontal swipe detection
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > swipeThreshold) {
                if (dx < 0) player.moveLeft();
                else player.moveRight();
            } else {
                // short tap: move left/right depending on half screen
                if (x < game.canvas.width / 2) player.moveLeft();
                else player.moveRight();
            }

            touchStartX = null;
        }, { passive: true });
    }
}