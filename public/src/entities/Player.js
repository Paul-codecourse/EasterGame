// // // /src/entities/Player.js

// export class Player {

//     constructor(game) {
//         this.game = game;

//         this.lane = 1;
//         this.width = 70;
//         this.height = 70;
//         this.y = this.game.canvas.height - 80;

//         // Load images
//         this.sprites = {
//             left: new Image(),
//             right: new Image(),
//             default: new Image(),
//             stand: new Image()
//         };
//         this.sprites.left.src = "./src/assets/characters/rabbitl.png";
//         this.sprites.right.src = "./src/assets/characters/rabbitr.png";
//         this.sprites.default.src = "./src/assets/characters/rabbit.png";  // catching eggs
//         this.sprites.stand.src = "./src/assets/characters/rabbit_stand.png"; // menu / gameover

//         this.currentSprite = this.sprites.default;

//         this.moveTimer = 0;      // ms remaining to show left/right sprite
//         this.moveDuration = 350; // show left/right for 350ms
//         this.sprites.jump = new Image();
//         this.sprites.jump.src = "./src/assets/characters/rabbit_jump.png";
        
//     }

//     toggleJumpSprite() {
//         if(this.currentSprite === this.sprites.jump){
//             this.currentSprite = this.sprites.default;
//         } else {
//             this.currentSprite = this.sprites.jump;
//         }
//     }

//     moveLeft() {
//         if (this.lane > 0) {
//             this.lane--;
//             this.currentSprite = this.sprites.left;
//             this.moveTimer = this.moveDuration;
//         }
//     }

//     moveRight() {
//         if (this.lane < this.game.laneCount - 1) {
//             this.lane++;
//             this.currentSprite = this.sprites.right;
//             this.moveTimer = this.moveDuration;
//         }
//     }

//     // update(delta) {
//     //     // If the game is not playing, always show stand sprite
//     //     if (this.game.state !== "playing") {
//     //         this.currentSprite = this.sprites.stand;
//     //         this.moveTimer = 0;
//     //         return;
//     //     }

// update(delta) {

//     // countdown movement timer
//     if (this.moveTimer > 0) {
//         this.moveTimer -= delta;

//         if (this.moveTimer <= 0) {
//             this.currentSprite = this.sprites.default;
//         }
//     }

//     // if game is playing and no movement active → ensure default sprite
//     if (this.game.state === "playing" && this.moveTimer <= 0) {
//         this.currentSprite = this.sprites.default;
//         }
// }

//     draw(ctx) {
//         const laneWidth = this.game.laneWidth;
//         const x = this.lane * laneWidth + laneWidth / 2 - this.width / 2;
//         const y = this.y;

//         if (!this.currentSprite.complete) return;
//         ctx.drawImage(this.currentSprite, x, y, this.width, this.height);
//     }

//     // explicitly set idle (for menus / game over)
//     setIdle() {
//         this.currentSprite = this.sprites.stand;
//         this.moveTimer = 0;
//     }
// }

// export class Player {

//     constructor(game) {
//         this.game = game;

//         this.lane = 1;
//         this.width = 70;
//         this.height = 70;

//         // Sprites
//         this.sprites = {
//             left: new Image(),
//             right: new Image(),
//             default: new Image(),
//             stand: new Image(),
//             jump: new Image()
//         };
//         this.sprites.left.src = "./src/assets/characters/rabbitl.png";
//         this.sprites.right.src = "./src/assets/characters/rabbitr.png";
//         this.sprites.default.src = "./src/assets/characters/rabbit.png";
//         this.sprites.stand.src = "./src/assets/characters/rabbit_stand.png";
//         this.sprites.jump.src = "./src/assets/characters/rabbit_jump.png";

//         this.currentSprite = this.sprites.default;

//         this.moveTimer = 0;      
//         this.moveDuration = 350; 
//     }

//     toggleJumpSprite() {
//         this.currentSprite = this.currentSprite === this.sprites.jump
//             ? this.sprites.default
//             : this.sprites.jump;
//     }

//     moveLeft() {
//         if (this.moveTimer > 0) return; // ⛔ block while moving

//         if (this.lane > 0) {
//             this.lane--;
//             this.currentSprite = this.sprites.left;
//             this.moveTimer = this.moveDuration;
//         }
//     }

//     moveRight() {
//         if (this.moveTimer > 0) return; // ⛔ block while moving

//         if (this.lane < this.game.laneCount - 1) {
//             this.lane++;
//             this.currentSprite = this.sprites.right;
//             this.moveTimer = this.moveDuration;
//         }
//     }

//     // moveLeft() {
//     //     if (this.lane > 0) {
//     //         this.lane--;
//     //         this.currentSprite = this.sprites.left;
//     //         this.moveTimer = this.moveDuration;
//     //     }
//     // }

//     // moveRight() {
//     //     if (this.lane < this.game.laneCount - 1) {
//     //         this.lane++;
//     //         this.currentSprite = this.sprites.right;
//     //         this.moveTimer = this.moveDuration;
//     //     }
//     // }

//     update(delta) {
//     this.y = this.game.canvas.height - 80;
//         // countdown move timer
//         if (this.moveTimer > 0) {
//             this.moveTimer -= delta;
//             if (this.moveTimer <= 0) {
//                 this.moveTimer = 0;
//                 this.currentSprite = this.sprites.default;
//             }
//         }

//         // ensure default sprite when game is playing and no movement active
//         if (this.game.state === "playing" && this.moveTimer <= 0) {
//             this.currentSprite = this.sprites.default;
//         }
//     }

//     draw(ctx) {
//         const laneWidth = this.game.laneWidth;
//         const x = this.lane * laneWidth + laneWidth / 2 - this.width / 2;
//         const y = this.y;

//         if (!this.currentSprite.complete) return;
//         ctx.drawImage(this.currentSprite, x, y, this.width, this.height);
//     }

//     setIdle() {
//         this.currentSprite = this.sprites.stand;
//         this.moveTimer = 0;
//     }

// }

export class Player {

    constructor(game) {
        this.game = game;

        this.lane = 1;
        this.width = 70;
        this.height = 70;

        // Sprites
        this.sprites = {
            left: new Image(),
            right: new Image(),
            default: new Image(),
            stand: new Image(),
            jump: new Image()
        };

        this.sprites.left.src = "./src/assets/characters/rabbitl.png";
        this.sprites.right.src = "./src/assets/characters/rabbitr.png";
        this.sprites.default.src = "./src/assets/characters/rabbit.png";
        this.sprites.stand.src = "./src/assets/characters/rabbit_stand.png";
        this.sprites.jump.src = "./src/assets/characters/rabbit_jump.png";

        this.currentSprite = this.sprites.default;

        // Movement timing
        this.moveTimer = 0;
        this.moveDuration = 200; // 🔥 shorter = more responsive

        // 🔥 Input buffering
        this.bufferedMove = 0; // -1 = left, +1 = right

        // 🔥 Juice: squash/stretch
        this.scaleX = 1;
        this.scaleY = 1;
    }

    // ─── MOVEMENT ──────────────────────────────
    moveLeft() {
        if (this.moveTimer > 0) {
            this.bufferedMove = -1;
            return;
        }

        if (this.lane > 0) {
            this.lane--;

            this.currentSprite = this.sprites.left;
            this.moveTimer = this.moveDuration;

            // 🔥 squash effect
            this.scaleX = 1.2;
            this.scaleY = 0.8;
        }
    }

    moveRight() {
        if (this.moveTimer > 0) {
            this.bufferedMove = 1;
            return;
        }

        if (this.lane < this.game.laneCount - 1) {
            this.lane++;

            this.currentSprite = this.sprites.right;
            this.moveTimer = this.moveDuration;

            // 🔥 squash effect
            this.scaleX = 1.2;
            this.scaleY = 0.8;
        }
    }

    toggleJumpSprite() {
        this.currentSprite =
            this.currentSprite === this.sprites.jump
                ? this.sprites.default
                : this.sprites.jump;
    }

    // ─── UPDATE ────────────────────────────────
    update(delta) {
        this.y = this.game.canvas.height - 80;

        // 🔥 Smoothly reset squash/stretch
        this.scaleX += (1 - this.scaleX) * 0.2;
        this.scaleY += (1 - this.scaleY) * 0.2;

        // Movement timer
        if (this.moveTimer > 0) {
            this.moveTimer -= delta;

            if (this.moveTimer <= 0) {
                this.moveTimer = 0;

                // 🔥 Execute buffered move
                if (this.bufferedMove !== 0) {
                    const move = this.bufferedMove;
                    this.bufferedMove = 0;

                    if (move === -1) this.moveLeft();
                    if (move === 1) this.moveRight();

                    return; // prevents flicker
                }

                this.currentSprite = this.sprites.default;
            }
        }

        // Ensure default sprite while idle in gameplay
        if (this.game.state === "playing" && this.moveTimer <= 0) {
            this.currentSprite = this.sprites.default;
        }
    }

    // ─── DRAW ──────────────────────────────────
    draw(ctx) {
        const laneWidth = this.game.laneWidth;
        const x = this.lane * laneWidth + laneWidth / 2 - this.width / 2;
        const y = this.y;

        if (!this.currentSprite.complete) return;

        ctx.save();

        // 🔥 Apply squash/stretch from center
        ctx.translate(x + this.width / 2, y + this.height / 2);
        ctx.scale(this.scaleX, this.scaleY);

        ctx.drawImage(
            this.currentSprite,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        ctx.restore();
    }

    // ─── IDLE STATE ────────────────────────────
    setIdle() {
        this.currentSprite = this.sprites.stand;
        this.moveTimer = 0;
        this.bufferedMove = 0;
    }
}
