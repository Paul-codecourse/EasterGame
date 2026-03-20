// /src/audio/Sound.js
export class Sound{

    constructor(){

        this.shoot = new Audio("./src/assets/shoot.mp3");
        this.explosion = new Audio("./src/assets/explosion.mp3");
        this.music = new Audio("./src/assets/gamemusic.mp3");
        this.music.loop = true;
        this.music.volume = 0.4; // optional
        this.miss = new Audio("./src/assets/missthud.mp3");          // new
    }

    playShoot(){
        this.shoot.currentTime=0;
        this.shoot.play();
    }

    playExplosion(){
        this.explosion.currentTime=0;
        this.explosion.play();
    }

    playMusic(){
        this.music.currentTime = 0;
        this.music.play();
    }

    stopMusic(){
        this.music.pause();
    }

    playMiss() {
        this.miss.currentTime = 0;
        this.miss.play();
    }

    playShoot(enabled){
    if (!enabled) return;
    this.shoot.currentTime = 0;
    this.shoot.play();
    }

    playExplosion(enabled){
        if (!enabled) return;
        this.explosion.currentTime = 0;
        this.explosion.play();
    }

    playMiss(enabled){
        if (!enabled) return;
        this.miss.currentTime = 0;
        this.miss.play();
    }

}
