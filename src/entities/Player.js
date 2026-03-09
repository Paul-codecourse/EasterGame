// Player.js
// export class Player {
//     constructor(game) {
//         this.game = game;
//         this.lane = 1;
//         this.y = game.canvas.height - 60;
//         this.bullets = [];

//         setInterval(() => {
//             this.shoot();
//         }, 300);
//     }

//     moveLeft() {
//         if (this.lane > 0) this.lane--;
//     }

//     moveRight() {
//         if (this.lane < this.game.laneCount - 1) this.lane++;
//     }

//     shoot() {
//         this.bullets.push({
//             x: this.lane * this.game.laneWidth + this.game.laneWidth / 2,
//             y: this.y
//         });
//     }

//     update() {
//         this.bullets.forEach(b => b.y -= 6);
//         this.bullets = this.bullets.filter(b => b.y > 0);
//     }

//     draw(ctx) {
//         const laneWidth = this.game.laneWidth;

//         ctx.fillStyle = "cyan";
//         ctx.fillRect(
//             this.lane * laneWidth + laneWidth / 2 - 20,
//             this.y,
//             40,
//             20
//         );

//         ctx.fillStyle = "yellow";
//         this.bullets.forEach(b => {
//             ctx.beginPath();
//             ctx.arc(b.x, b.y, 5, 0, Math.PI * 2);
//             ctx.fill();
//         });
//     }
// }
export class Player{

    constructor(game){

        this.game=game;

        this.lane=1;
        this.y=game.canvas.height-60;

        this.bullets=[];

        this.fireCooldown=0;
        this.fireRate=300;
    }

    moveLeft(){
        if(this.lane>0) this.lane--;
    }

    moveRight(){
        if(this.lane<this.game.laneCount-1) this.lane++;
    }

    shoot(){

        this.bullets.push({

            x:this.lane*this.game.laneWidth+
              this.game.laneWidth/2,

            y:this.y,
            speed:350

        });
            this.game.sound.playShoot();
    }

    update(delta){

        this.fireCooldown += delta;

        if(this.fireCooldown > this.fireRate){
            this.shoot();
            this.fireCooldown=0;
        }

        this.bullets.forEach(b=>{
            b.y -= b.speed * delta/1000;
        });

        this.bullets = this.bullets.filter(b=>b.y>0);

    }

    draw(ctx){

        const laneWidth=this.game.laneWidth;

        ctx.fillStyle="cyan";

        ctx.fillRect(
            this.lane*laneWidth+laneWidth/2-20,
            this.y,
            40,
            20
        );

        ctx.fillStyle="yellow";

        this.bullets.forEach(b=>{

            ctx.beginPath();
            ctx.arc(b.x,b.y,5,0,Math.PI*2);
            ctx.fill();

        });

    }
}