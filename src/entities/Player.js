// /src/entities/Player.js

export class Player{

    constructor(game){

        this.game = game;

        this.lane = 1;
        this.y = game.canvas.height - 60;

    }

    moveLeft(){
        if(this.lane > 0) this.lane--;
    }

    moveRight(){
        if(this.lane < this.game.laneCount - 1) this.lane++;
    }

    update(delta){
        // no shooting anymore
    }

    draw(ctx){

        const laneWidth = this.game.laneWidth;

        ctx.fillStyle = "cyan";

        ctx.fillRect(
            this.lane * laneWidth + laneWidth/2 - 20,
            this.y,
            40,
            20
        );

    }

}