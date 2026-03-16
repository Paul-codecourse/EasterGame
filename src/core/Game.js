// // /src/core/Game.js
// import { ParticleSystem } from "../managers/ParticleSystem.js";
// import { ScreenShake } from "../effects/ScreenShake.js";
// import { Sound } from "../audio/Sound.js";
// import { Player } from "../entities/Player.js";
// import { Input } from "../core/Input.js";
// import { EggManager } from "../managers/EggManager.js";

// export class Game {

//     constructor(canvas) {

//         this.canvas = canvas;
//         this.ctx = canvas.getContext("2d");

//         this.laneCount = 3;
//         this.laneWidth = canvas.width / this.laneCount;

//         this.player = new Player(this);
//         this.eggs = new EggManager(this);
//         this.input = new Input(this, this.player);

//         this.score = 0;
//         this.lastTime = 0;

//         this.state = "menu";

//         this.particles = new ParticleSystem(this);
//         this.shake = new ScreenShake();
//         this.sound = new Sound();
//         this.musicPlaying = false; // track if music is on
//         this.nextMilestone = 100;

//         // create milestone
//         this.milestoneActive = false;
//         this.milestoneTimer = 0;
//         this.milestoneFlips = 0;
//         this.milestoneMessage = "";
//         this.milestonePauseDuration = 1000; // 1 second pause at milestone
//         this.milestonePaused = false;       // true when the game is paused for animation
        
//     }

//     start() {
//         requestAnimationFrame((t) => this.loop(t));
//         // start game music only after first user interaction
//         document.body.addEventListener('click', () => {
//             if (!this.musicPlaying) {
//                 this.sound.playMusic();
//                 this.musicPlaying = true;
//             }
//         }, { once: true });
//     }

//     restart(){

//         this.score = 0;
//         this.state = "playing";

//         this.player.lane = 1;


//         // reset eggs
//         this.eggs.eggs = [];
//         this.eggs.spawnTimer = 0;
//         this.eggs.missedEggs = 0; //reset missed eggs back yto zero on restart

//         this.particles.particles = [];
//     }

//         loop(time){
//             if(this.state === "quit") {
//                 console.log("Game loop stopped.");
//                 return;  // stop the animation loop
//             }

//             const delta = time - this.lastTime;
//             this.lastTime = time;

//             this.shake.update(delta);
//             this.particles.update(delta);

//             this.update(delta);
//             this.draw();

//             requestAnimationFrame((t)=>this.loop(t));
//         }


//         update(delta){

//             if(this.state !== "playing") {
//                 this.player.setIdle();
//                 return;
//             }

//             // milestone animation active
//             if(this.milestoneActive){
//                 this.milestoneTimer += delta;

//                 if(this.milestonePaused){
//                     // Flip sprite every 200ms
//                     if(this.milestoneTimer >= 200){
//                         this.player.toggleJumpSprite();
//                         this.milestoneTimer = 0;
//                         this.milestoneFlips++;

//                         // After 10 flips (5 jumps), end milestone
//                         if(this.milestoneFlips >= 10){
//                             this.milestoneActive = false;
//                             this.milestonePaused = false;
//                             this.player.currentSprite = this.player.sprites.default;
//                             this.milestoneMessage = "";
//                         }
//                     }

//                     // Skip regular game updates while paused
//                     return;
//                 }
//             }

//         this.player.update(delta);

//         this.eggs.update(delta, this.player, (pos)=>{

//             this.score++;

//                 if(this.score >= this.nextMilestone){
//                     this.milestoneActive = true;
//                     this.milestonePaused = true;      // pause the game
//                     this.milestoneTimer = 0;          
//                     this.milestoneFlips = 0;          
//                     this.milestoneMessage = `Congratulations! You have scored ${this.nextMilestone}`;
//                     this.nextMilestone += 100;
//                 }

//             this.particles.explode(pos.x,pos.y,"pink",20);
//             this.shake.shake(4,150);
//             this.sound.playExplosion();

//         });

        
//     }

//     draw(){

//         const ctx = this.ctx;

//         ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

//         // WATERMARK
//         ctx.save();

//         ctx.translate(this.canvas.width/2,this.canvas.height/2);
//         ctx.rotate(-Math.PI/8);

//         const gradient = ctx.createLinearGradient(-300,0,300,0);
//         gradient.addColorStop(0,"rgba(255,255,255,0.05)");
//         gradient.addColorStop(0.5,"rgba(200,200,200,0.05)");
//         gradient.addColorStop(1,"rgba(255,255,255,0.05)");

//         ctx.font="bold 120px Arial";
//         ctx.fillStyle=gradient;
//         ctx.textAlign="center";
//         ctx.textBaseline="middle";

//         ctx.fillText("RNN Library",0,0);

//         ctx.restore();

//         // // LANES
//         // ctx.strokeStyle="#333";

//         // for(let i=1;i<this.laneCount;i++){

//         //     ctx.beginPath();
//         //     ctx.moveTo(i*this.laneWidth,0);
//         //     ctx.lineTo(i*this.laneWidth,this.canvas.height);
//         //     ctx.stroke();

//         // }

//         // GAME WORLD
//         ctx.save();
//         this.shake.apply(ctx);

//         this.player.draw(ctx);
//         this.eggs.draw(ctx);
//         this.particles.draw(ctx);

//         ctx.restore();

//         // UI
//         ctx.fillStyle="white";
//         ctx.font="16px Arial";
//         ctx.textAlign="left";

//         ctx.fillText("Score: "+this.score,10,20);

//         if(this.state==="gameover"){

//             ctx.font="40px Arial";
//             ctx.fillText("GAME OVER",70,300);

//             ctx.font="20px Arial";
//             ctx.fillText("Press R to Restart",110,340);

//         }

//         if(this.state==="paused"){

//             ctx.textAlign="center";
//             ctx.font="40px Arial";
//             ctx.fillText("PAUSED",this.canvas.width/2,300);
//             ctx.textAlign="left";

//         }

//         if(this.state==="menu"){

//             ctx.textAlign="center";
//             ctx.font="30px Arial";
//             ctx.fillText("CLICK TO START",this.canvas.width/2,300);
//             ctx.textAlign="left";

//         }

//         if(this.milestoneActive && this.milestoneMessage){
//             ctx.textAlign = "center";
//             ctx.font = "30px Arial";
//             ctx.fillStyle = "yellow";
//             const milestoneY = this.canvas.height * 0.15; // 15% from top
//             ctx.fillText(this.milestoneMessage, this.canvas.width / 2, milestoneY);
//             ctx.textAlign = "left";  // reset
//             const textWidth = ctx.measureText(this.milestoneMessage).width;
//             ctx.fillStyle = "rgba(0,0,0,0.5)";
//             ctx.fillRect(this.canvas.width/2 - textWidth/2 - 10, milestoneY - 5, textWidth + 20, 40);

//             ctx.fillStyle = "yellow";
//             ctx.fillText(this.milestoneMessage, this.canvas.width / 2, milestoneY);
//         }        

        

//     }


// }

import { ParticleSystem } from "../managers/ParticleSystem.js";
import { ScreenShake } from "../effects/ScreenShake.js";
import { Sound } from "../audio/Sound.js";
import { Player } from "../entities/Player.js";
import { Input } from "../core/Input.js";
import { EggManager } from "../managers/EggManager.js";

export class Game {

    constructor(canvas) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.laneCount = 3;
        this.laneWidth = canvas.width / this.laneCount;

        this.player = new Player(this);
        this.eggs = new EggManager(this);
        this.input = new Input(this, this.player, this);

        this.score = 0;
        this.lastTime = 0;
        this.state = "menu";

        this.particles = new ParticleSystem(this);
        this.shake = new ScreenShake();
        this.sound = new Sound();
        this.musicPlaying = false;
        this.nextMilestone = 100;

        // milestone animation
        this.milestoneActive = false;
        this.milestoneTimer = 0;
        this.milestoneFlips = 0;
        this.milestoneMessage = "";
        this.milestonePaused = false;       
        this.milestoneFlipInterval = 200; // ms per flip
    }

    start() {
        requestAnimationFrame((t) => this.loop(t));

        // Start music after first user interaction (click/touch)
        const startMusic = () => {
            if (!this.musicPlaying) {
                this.sound.playMusic();
                this.musicPlaying = true;
            }
            document.body.removeEventListener("click", startMusic);
            document.body.removeEventListener("touchstart", startMusic);
        };
        document.body.addEventListener("click", startMusic);
        document.body.addEventListener("touchstart", startMusic);
    }

    restart() {
        this.score = 0;
        this.state = "playing";
        this.player.lane = 1;

        // reset eggs
        this.eggs.eggs = [];
        this.eggs.spawnTimer = 0;
        this.eggs.missedEggs = 0;

        this.particles.particles = [];

        // reset milestone
        this.nextMilestone = 100;
        this.milestoneActive = false;
        this.milestoneTimer = 0;
        this.milestoneFlips = 0;
        this.milestoneMessage = "";
        this.milestonePaused = false;
    }

    loop(time) {
        if (this.state === "quit") {
            console.log("Game loop stopped.");
            return;
        }

        const delta = time - this.lastTime;
        this.lastTime = time;

        this.shake.update(delta);
        this.particles.update(delta);

        this.update(delta);
        this.draw();

        requestAnimationFrame((t) => this.loop(t));
    }

    update(delta) {

        if (this.state !== "playing") {
            this.player.setIdle();
            return;
        }

        // Milestone animation
        if (this.milestoneActive) {
            this.milestoneTimer += delta;

            if (this.milestonePaused) {
                if (this.milestoneTimer >= this.milestoneFlipInterval) {
                    this.player.toggleJumpSprite();
                    this.milestoneTimer = 0;
                    this.milestoneFlips++;

                    if (this.milestoneFlips >= 10) { // 5 jumps
                        this.milestoneActive = false;
                        this.milestonePaused = false;
                        this.player.currentSprite = this.player.sprites.default;
                        this.milestoneMessage = "";
                    }
                }
                return; // skip regular updates while milestone animation is active
            }
        }

        this.player.update(delta);

        this.eggs.update(delta, this.player, (pos) => {

            this.score++;

            // milestone check
            if (this.score >= this.nextMilestone) {
                this.milestoneActive = true;
                this.milestonePaused = true;
                this.milestoneTimer = 0;
                this.milestoneFlips = 0;
                this.milestoneMessage = `Congratulations! You have scored ${this.nextMilestone}`;
                this.nextMilestone += 100;
            }

            this.particles.explode(pos.x, pos.y, "pink", 20);
            this.shake.shake(4, 150);
            this.sound.playExplosion();

        });

    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.state === "quit") {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            ctx.textAlign = "center";
            ctx.font = "40px Arial";
            ctx.fillStyle = "red";
            ctx.fillText("GAME QUIT", this.canvas.width / 2, this.canvas.height / 2);

            ctx.font = "20px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("Refresh to play again", this.canvas.width / 2, this.canvas.height / 2 + 40);

            return; // stop drawing anything else
        }

        // Watermark
        ctx.save();
        ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        ctx.rotate(-Math.PI / 8);
        const gradient = ctx.createLinearGradient(-300, 0, 300, 0);
        gradient.addColorStop(0, "rgba(255,255,255,0.05)");
        gradient.addColorStop(0.5, "rgba(200,200,200,0.05)");
        gradient.addColorStop(1, "rgba(255,255,255,0.05)");
        ctx.font = "bold 120px Arial";
        ctx.fillStyle = gradient;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("RNN Library", 0, 0);
        ctx.restore();

        // Game world
        ctx.save();
        this.shake.apply(ctx);
        this.player.draw(ctx);
        this.eggs.draw(ctx);
        this.particles.draw(ctx);
        ctx.restore();

        // UI
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.textAlign = "left";
        ctx.fillText("Score: " + this.score, 10, 20);

        // States
        if (this.state === "gameover") {
            ctx.font = "40px Arial";
            ctx.fillText("GAME OVER", 70, 300);
            ctx.font = "20px Arial";
            ctx.fillText("Press R to Restart", 110, 340);
        }

        if (this.state === "paused") {
            ctx.textAlign = "center";
            ctx.font = "40px Arial";
            ctx.fillText("PAUSED", this.canvas.width / 2, 300);
            ctx.textAlign = "left";
        }

        if (this.state === "menu") {
            ctx.textAlign = "center";
            ctx.font = "30px Arial";
            ctx.fillText("CLICK TO START", this.canvas.width / 2, 300);
            ctx.textAlign = "left";
        }

        // Milestone message
        if (this.milestoneActive && this.milestoneMessage) {
            ctx.textAlign = "center";
            ctx.font = "36px Arial";
            ctx.fillStyle = "yellow";
            ctx.textBaseline = "top";
            const milestoneY = this.canvas.height * 0.1; // 10% down
            ctx.fillText(this.milestoneMessage, this.canvas.width / 2, milestoneY);
            ctx.textAlign = "left";
            ctx.textBaseline = "alphabetic"; // reset
        }
    }
}