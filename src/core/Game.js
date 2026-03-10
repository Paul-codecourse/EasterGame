// /src/core/Game.js
import { ParticleSystem } from "../managers/ParticleSystem.js";
import { ScreenShake } from "../effects/ScreenShake.js";
import { Sound } from "../audio/Sound.js";
import { Player } from "../entities/Player.js";
import { EnemyManager } from "../managers/EnemyManager.js";
import { Input } from "../core/Input.js";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.laneCount = 3;
        this.laneWidth = canvas.width / this.laneCount;

        this.player = new Player(this);
        this.enemies = new EnemyManager(this);
        this.input = new Input(this, this.player);

        this.score = 0;
        this.lastTime = 0;

        this.state = "menu"; 
        // "menu", "playing", "gameover"

        // Optional systems
        this.entities = [];
        this.particles = new ParticleSystem(this);
        this.shake = new ScreenShake();
        this.sound = new Sound();
    }

    start() {
        requestAnimationFrame((t) => this.loop(t));
    }

    restart(){

        this.score = 0;
        this.state = "playing";

        this.player.lane = 1;
        this.player.bullets = [];
        this.player.fireCooldown = 0;

        this.enemies.enemies = [];
        this.enemies.spawnTimer = 0;

        this.particles.particles = [];

    }

    loop(time) {
        const delta = time - this.lastTime;
        this.lastTime = time;

        this.shake.update(delta);
        this.particles.update(delta);
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
            (enemy) => {

                this.score++;

                if (this.particles) {
                    this.particles.explode(enemy.x, enemy.y);
                }

                if (this.shake) {
                    this.shake.shake(6, 200);
                }

                if (this.sound) {
                    this.sound.playExplosion();
                }

            }
        );
    }

draw() {

    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw lanes
    ctx.strokeStyle = "#333";
    for (let i = 1; i < this.laneCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * this.laneWidth, 0);
        ctx.lineTo(i * this.laneWidth, this.canvas.height);
        ctx.stroke();
    }



    // Apply screen shake
    ctx.save();
    this.shake.apply(ctx);

    // Draw game entities
    this.player.draw(ctx);
    this.enemies.draw(ctx);
    this.particles.draw(ctx);

    ctx.restore();

    // Draw UI
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + this.score, 10, 20);

    if (this.state === "gameover") {
        ctx.font = "40px Arial";
        ctx.fillText("GAME OVER", 70, 300);
        ctx.font = "20px Arial";
        ctx.fillText("Press R to Restart", 110, 340);
    }

    if (this.state === "paused") {
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", this.canvas.width/2, 300);
        ctx.textAlign = "left";
    }

    // CLICK TO START message
    if (this.state === "menu") {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("CLICK TO START", 90, 300);
    }
}
}