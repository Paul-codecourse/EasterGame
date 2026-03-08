// /src/audio/Sound.js
export class Sound{

    constructor(){

        this.shoot = new Audio("./assets/shoot.mp3");
        this.explosion = new Audio("assets/explosion.mp3");

    }

    playShoot(){
        this.shoot.currentTime=0;
        this.shoot.play();
    }

    playExplosion(){
        this.explosion.currentTime=0;
        this.explosion.play();
    }

}