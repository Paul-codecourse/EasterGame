// /src/managers/EggManager.js
export class EggManager {
    constructor(game) {
        this.game = game;
        this.eggs = [];
        this.eggImages = [];

        // Load egg images
        for (let i = 1; i <= 3; i++) {
            const img = new Image();
            img.src = `./src/assets/eggs/egg${i}.png`;
            this.eggImages.push(img);
        }

        this.spawnTimer = 0;
        this.spawnRate = 1000; // spawn every 1s
    }

    spawnEgg() {
        const lane = Math.floor(Math.random() * this.game.laneCount);
        const img = this.eggImages[Math.floor(Math.random() * this.eggImages.length)];
        this.eggs.push({
            x: lane * this.game.laneWidth + this.game.laneWidth / 2 - img.width/2,
            y: -50,
            speed: 150 + Math.random()*100,
            img
        });
    }

    update(delta) {
        this.spawnTimer += delta;
        if (this.spawnTimer > this.spawnRate) {
            this.spawnEgg();
            this.spawnTimer = 0;
        }

        this.eggs.forEach(egg => egg.y += egg.speed * delta/1000);

        // Remove eggs off screen
        this.eggs = this.eggs.filter(egg => egg.y < this.game.canvas.height + 50);
    }

    draw(ctx) {
        this.eggs.forEach(egg => {
            ctx.drawImage(egg.img, egg.x, egg.y, 40, 50); // scale if needed
        });
    }
}