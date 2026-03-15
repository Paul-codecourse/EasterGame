// // /src/entities/Player.js

// export class Player{

//     constructor(game){

//         this.game = game;

//         this.lane = 1;
//         this.y = game.canvas.height - 80;

//         // rabbit image
//         this.rabbit = new Image();
//         this.rabbit.src = "./src/assets/characters/rabbit.png";
//         this.bounce = 0;
//         this.jump = 0;
//         this.width = 70;
//         this.height = 70;
//     }

//     // moveLeft(){
//     //     if(this.lane > 0) this.lane--;
//     // }

//     // moveRight(){
//     //     if(this.lane < this.game.laneCount - 1) this.lane++;
//     // }

//     moveLeft(){
//         if(this.lane > 0){
//             this.lane--;
//             this.jump = 12;
//         }
//     }

//     moveRight(){
//         if(this.lane < this.game.laneCount - 1){
//             this.lane++;
//             this.jump = 12;
//         }
//     }

//     // update(delta){
//     //     // no shooting anymore
//     //     this.bounce = Math.sin(Date.now() * 0.01) * 3;
//     // }

//     update(delta){

//         this.bounce = Math.sin(Date.now() * 0.01) * 2;

//         if(this.jump > 0){
//             this.jump -= delta * 0.05;
//         }

//     }

//     draw(ctx){

//         if(!this.rabbit.complete) return;

//         const laneWidth = this.game.laneWidth;

//         const x =
//                 this.lane * laneWidth +
//                 laneWidth / 2 -
//                 this.width / 2;

//         ctx.drawImage(
//                 this.rabbit,
//                 x,
//                 this.y + this.bounce - this.jump,
//                 this.width,
//                 this.height
//             );

//         }

// }
export class Player {

    constructor(game){
        this.game = game;

        this.lane = 1;

        this.images = {
            left: new Image(),
            right: new Image(),
            idle: new Image(),
            tap: new Image()
        };

        this.images.left.src = "./src/assets/characters/rabbitl.png";
        this.images.right.src = "./src/assets/characters/rabbitr.png";
        this.images.idle.src = "./src/assets/characters/rabbit_stand.png";
        this.images.tap.src = "./src/assets/characters/rabbit_tap.png";
        
        this.current = this.images.idle;
        this.width = 80;
        this.height = 80;
        this.y = this.game.canvas.height - 120;

        this.tapTimer = 0;
        this.missedEggs = 0;
        this.maxMisses = 5;
    }

    moveLeft(){
        this.lane = Math.max(0, this.lane - 1);
        this.current = this.images.left;
    }

    moveRight(){
        this.lane = Math.min(2, this.lane + 1);
        this.current = this.images.right;
    }

    tap(){
        this.current = this.images.tap;
        this.tapTimer = 150;
    }

    update(delta){

        if(this.tapTimer > 0){
            this.tapTimer -= delta;

            if(this.tapTimer <= 0){
                this.current = this.images.idle;
            }
        } else {
        this.current = this.images.idle;
    }

    }

    draw(ctx){

        const x =
            this.lane * this.game.laneWidth +
            this.game.laneWidth / 2 -
            this.width / 2;
        const y = this.game.canvas.height - 120;
        ctx.drawImage(this.current, x, this.y, this.width, this.height);
    }
}