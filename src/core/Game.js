// /src/core/Game.js
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
        this.input = new Input(this, this.player);

        this.score = 0;
        this.lastTime = 0;

        this.state = "menu";

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


        // reset eggs
        this.eggs.eggs = [];
        this.eggs.spawnTimer = 0;

        this.particles.particles = [];
    }

    loop(time){

        const delta = time - this.lastTime;
        this.lastTime = time;

        this.shake.update(delta);
        this.particles.update(delta);

        this.update(delta);
        this.draw();

        requestAnimationFrame((t)=>this.loop(t));
    }

    update(delta){

        if(this.state !== "playing") return;

        this.player.update(delta);

        this.eggs.update(delta, this.player, (pos)=>{

            this.score++;

            this.particles.explode(pos.x,pos.y,"pink",20);
            this.shake.shake(4,150);
            this.sound.playExplosion();

        });

    }

    draw(){

        const ctx = this.ctx;

        ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        // WATERMARK
        ctx.save();

        ctx.translate(this.canvas.width/2,this.canvas.height/2);
        ctx.rotate(-Math.PI/8);

        const gradient = ctx.createLinearGradient(-300,0,300,0);
        gradient.addColorStop(0,"rgba(255,255,255,0.05)");
        gradient.addColorStop(0.5,"rgba(200,200,200,0.05)");
        gradient.addColorStop(1,"rgba(255,255,255,0.05)");

        ctx.font="bold 120px Arial";
        ctx.fillStyle=gradient;
        ctx.textAlign="center";
        ctx.textBaseline="middle";

        ctx.fillText("RNN Library",0,0);

        ctx.restore();

        // LANES
        ctx.strokeStyle="#333";

        for(let i=1;i<this.laneCount;i++){

            ctx.beginPath();
            ctx.moveTo(i*this.laneWidth,0);
            ctx.lineTo(i*this.laneWidth,this.canvas.height);
            ctx.stroke();

        }

        // GAME WORLD
        ctx.save();
        this.shake.apply(ctx);

        this.player.draw(ctx);
        this.eggs.draw(ctx);
        this.particles.draw(ctx);

        ctx.restore();

        // UI
        ctx.fillStyle="white";
        ctx.font="16px Arial";
        ctx.textAlign="left";

        ctx.fillText("Score: "+this.score,10,20);

        if(this.state==="gameover"){

            ctx.font="40px Arial";
            ctx.fillText("GAME OVER",70,300);

            ctx.font="20px Arial";
            ctx.fillText("Press R to Restart",110,340);

        }

        if(this.state==="paused"){

            ctx.textAlign="center";
            ctx.font="40px Arial";
            ctx.fillText("PAUSED",this.canvas.width/2,300);
            ctx.textAlign="left";

        }

        if(this.state==="menu"){

            ctx.textAlign="center";
            ctx.font="30px Arial";
            ctx.fillText("CLICK TO START",this.canvas.width/2,300);
            ctx.textAlign="left";

        }

    }

}