// import { Player } from "./Player.js";
// import { EnemyManager } from "./EnemyManager.js";
// import { Input } from "./Input.js";

// export class Game {
//     constructor(canvas) {
//         this.canvas = canvas;
//         this.ctx = canvas.getContext("2d");

//         this.laneCount = 3;
//         this.laneWidth = canvas.width / this.laneCount;

//         this.player = new Player(this);
//         this.enemies = new EnemyManager(this);
//         this.input = new Input(this.player);

//         this.score = 0;
//     }

//     start() {
//         this.loop();
//     }

//     loop() {
//         this.update();
//         this.draw();
//         requestAnimationFrame(() => this.loop());
//     }

//     update() {
//         this.player.update();
//         this.enemies.update(this.player.bullets, () => {
//             this.score++;
//         });
//     }

//     draw() {
//         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

//         // Lane lines
//         this.ctx.strokeStyle = "#333";
//         for (let i = 1; i < this.laneCount; i++) {
//             this.ctx.beginPath();
//             this.ctx.moveTo(i * this.laneWidth, 0);
//             this.ctx.lineTo(i * this.laneWidth, this.canvas.height);
//             this.ctx.stroke();
//         }

//         this.player.draw(this.ctx);
//         this.enemies.draw(this.ctx);

//         this.ctx.fillStyle = "white";
//         this.ctx.fillText("Score: " + this.score, 10, 20);
//     }
// }

import { Player } from "./Player.js";
import { EnemyManager } from "./EnemyManager.js";
import { Input } from "./Input.js";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.laneCount = 3;
        this.laneWidth = canvas.width / this.laneCount;

        this.player = new Player(this);
        this.enemies = new EnemyManager(this);
        this.input = new Input(this.player);

        this.score = 0;

        this.lastTime = 0;

        this.state = "playing"; 
        // "menu", "playing", "gameover"
    }

    start() {
        requestAnimationFrame((t) => this.loop(t));
    }

    loop(time) {
        const delta = time - this.lastTime;
        this.lastTime = time;

        this.update(delta);
        this.draw();

        requestAnimationFrame((t) => this.loop(t));
    }

    update(delta) {

        if (this.state !== "playing") return;

        this.player.update(delta);

        this.enemies.update(
            delta,
            this.player.bullets,
            () => this.score++
        );
    }

    draw() {

        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        // lanes
        this.ctx.strokeStyle = "#333";
        for (let i=1;i<this.laneCount;i++){
            this.ctx.beginPath();
            this.ctx.moveTo(i*this.laneWidth,0);
            this.ctx.lineTo(i*this.laneWidth,this.canvas.height);
            this.ctx.stroke();
        }

        this.player.draw(this.ctx);
        this.enemies.draw(this.ctx);

        this.ctx.fillStyle="white";
        this.ctx.font="16px Arial";
        this.ctx.fillText("Score: "+this.score,10,20);

        if(this.state==="gameover"){
            this.ctx.font="40px Arial";
            this.ctx.fillText("GAME OVER",70,300);
        }
    }
}