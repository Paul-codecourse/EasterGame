// /src/managers/EnemyManager.js
// export class EnemyManager {
//     constructor(game) {
//         this.game = game;
//         this.enemies = [];

//         this.spawnTimer = 0;
//         this.spawnInterval = 1000;
//     }

//     spawnWave() {
//         for (let i = 0; i < this.game.laneCount; i++) {
//             if (Math.random() < 0.6) {
//                 this.enemies.push({
//                     lane: i,
//                     y: -20,
//                     speed: 2 + Math.random() * 1.5
//                 });
//             }
//         }
//     }

//     update(bullets, onKill) {

//         // spawn timer
//         this.spawnTimer += 16; // approx frame time

//         if (this.spawnTimer > this.spawnInterval) {
//             this.spawnWave();
//             this.spawnTimer = 0;
//         }

//         // move enemies
//         this.enemies.forEach(e => e.y += e.speed);

//         // collision detection
//         for (let ei = this.enemies.length - 1; ei >= 0; ei--) {
//             const enemy = this.enemies[ei];

//             for (let bi = bullets.length - 1; bi >= 0; bi--) {
//                 const bullet = bullets[bi];

//                 const enemyX =
//                     enemy.lane * this.game.laneWidth +
//                     this.game.laneWidth / 2;

//                 if (
//                     Math.abs(bullet.x - enemyX) < 20 &&
//                     Math.abs(bullet.y - enemy.y) < 20
//                 ) {
//                     this.enemies.splice(ei, 1);
//                     bullets.splice(bi, 1);
//                     onKill();
//                     break;
//                 }
//             }
//         }

//         // cleanup
//         this.enemies = this.enemies.filter(
//             e => e.y < this.game.canvas.height + 40
//         );
//     }

//     draw(ctx) {
//         ctx.fillStyle = "red";
//         this.enemies.forEach(e => {
//             ctx.fillRect(
//                 e.lane * this.game.laneWidth +
//                 this.game.laneWidth / 2 - 20,
//                 e.y,
//                 40,
//                 40
//             );
//         });
//     }
// }

export class EnemyManager {

    constructor(game){
        this.game = game;
        this.enemies = [];

        this.spawnTimer = 0;
        this.spawnRate = 1000;
    }

    spawnWave(){

        for(let i=0;i<this.game.laneCount;i++){

            if(Math.random()<0.6){

                this.enemies.push({
                    lane:i,
                    y:-20,
                    speed:100 + Math.random()*80
                });

            }

        }
    }

    update(delta, bullets, onKill){

        this.spawnTimer += delta;

        if(this.spawnTimer > this.spawnRate){
            this.spawnWave();
            this.spawnTimer = 0;
        }

        // movement
        this.enemies.forEach(e=>{
            e.y += e.speed * delta/1000;
        });

        // collisions
        for(let ei=this.enemies.length-1; ei>=0; ei--){

            const enemy=this.enemies[ei];

            for(let bi=bullets.length-1; bi>=0; bi--){

                const bullet=bullets[bi];

                const enemyX =
                    enemy.lane * this.game.laneWidth +
                    this.game.laneWidth/2;

                if(
                    Math.abs(bullet.x-enemyX)<20 &&
                    Math.abs(bullet.y-enemy.y)<20
                ){

                    this.enemies.splice(ei,1);
                    bullets.splice(bi,1);

                    onKill({x:enemyX,y:enemy.y});
                    break;

                }

            }

            // player death
            if(enemy.y > this.game.canvas.height-60){
                this.game.state="gameover";
            }

        }

    }

    draw(ctx){

        ctx.fillStyle="red";

        this.enemies.forEach(e=>{

            ctx.fillRect(
                e.lane * this.game.laneWidth +
                this.game.laneWidth/2 - 20,
                e.y,
                40,
                40
            );

        });

    }
}