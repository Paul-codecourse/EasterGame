// /src/audio/Sound.js
export class Sound{

    constructor(){

        this.shoot = new Audio("./src/assets/shoot.mp3");
        this.explosion = new Audio("./src/assets/explosion.mp3");
        this.music = new Audio("./src/assets/gamemusic.mp3");
        this.music.loop = true;

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
