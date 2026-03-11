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
        this.spawnRate = 800; // spawn eggs faster
    }

    spawnEgg() {
        const lane = Math.floor(Math.random() * this.game.laneCount);
        const img = this.eggImages[Math.floor(Math.random() * this.eggImages.length)];
        this.eggs.push({
            lane,
            x: lane * this.game.laneWidth + this.game.laneWidth / 2,
            y: -50,
            width: 40,
            height: 50,
            speed: 150 + Math.random() * 100,
            img,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 2 // radians/sec
        });
    }

    update(delta, player, onCollect) {
        this.spawnTimer += delta;
        if (this.spawnTimer > this.spawnRate) {
            this.spawnEgg();
            this.spawnTimer = 0;
        }

        this.eggs.forEach(egg => {
            egg.y += egg.speed * delta / 1000;
            egg.rotation += egg.rotationSpeed * delta / 1000;
        });

        // Collision: simple vertical and lane check
        for (let i = this.eggs.length - 1; i >= 0; i--) {
            const egg = this.eggs[i];
            if (egg.lane === player.lane && egg.y + egg.height > player.y && egg.y < player.y + 20) {
                onCollect({ x: egg.x, y: egg.y });
                this.eggs.splice(i, 1);
            }
        }

        // Remove eggs off screen
        this.eggs = this.eggs.filter(egg => egg.y < this.game.canvas.height + 50);
    }

    draw(ctx) {
        this.eggs.forEach(egg => {
            ctx.save();
            ctx.translate(egg.x, egg.y + egg.height / 2); // move origin to center
            ctx.rotate(egg.rotation);
            ctx.drawImage(egg.img, -egg.width/2, -egg.height/2, egg.width, egg.height);
            ctx.restore();
        });
    }
}