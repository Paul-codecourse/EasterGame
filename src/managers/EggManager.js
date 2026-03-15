// /src/managers/EggManager.js

export class EggManager {

    constructor(game) {
        this.game = game;
        this.eggs = [];
        this.eggImages = [];

        // load egg images
        for (let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./src/assets/eggs/egg${i}.png`;
            this.eggImages.push(img);
        }

        this.spawnTimer = 0;
        this.spawnRate = 800;

        this.missedEggs = 0;
        this.maxMisses = 5;
    }

    spawnEgg(){

        const lane = Math.floor(Math.random() * this.game.laneCount);

        const img =
            this.eggImages[
                Math.floor(Math.random() * this.eggImages.length)
            ];

        this.eggs.push({
            lane,
            x: lane * this.game.laneWidth + this.game.laneWidth / 2,
            y: -40,
            width: 40,
            height: 50,
            speed: 150 + Math.random()*80,
            img,
            rotation: Math.random()*Math.PI*2,
            rotationSpeed: (Math.random()-0.5)*2
        });

    }

    update(delta, player, onCollect){

        // spawn eggs
        this.spawnTimer += delta;

        if(this.spawnTimer > this.spawnRate){
            this.spawnEgg();
            this.spawnTimer = 0;
        }

        // update eggs
        for(let i=this.eggs.length-1; i>=0; i--){

            const egg = this.eggs[i];

            // movement
            egg.y += egg.speed * delta/1000;
            egg.rotation += egg.rotationSpeed * delta/1000;

            // caught
            if(
                egg.lane === player.lane &&
                egg.y + egg.height > player.y &&
                egg.y < player.y + player.height
            ){

                onCollect({x:egg.x,y:egg.y});
                this.eggs.splice(i,1);
                continue;
            }

            // missed
            if(egg.y > this.game.canvas.height){

                this.missedEggs++;

                if(this.missedEggs >= this.maxMisses){
                    this.game.state = "gameover";
                }

                this.eggs.splice(i,1);
            }

        }

    }

    draw(ctx){

        this.eggs.forEach(egg=>{

            ctx.save();

            ctx.translate(egg.x, egg.y + egg.height/2);
            ctx.rotate(egg.rotation);

            ctx.drawImage(
                egg.img,
                -egg.width/2,
                -egg.height/2,
                egg.width,
                egg.height
            );

            ctx.restore();

        });

        // UI
        ctx.fillStyle="white";
        ctx.font="16px Arial";
        ctx.textAlign="right";

        ctx.fillText(
            "Missed: " + this.missedEggs + "/" + this.maxMisses,
            this.game.canvas.width - 10,
            20
        );

        ctx.textAlign="left";
    }

}