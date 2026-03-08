// /src/effects/ScreenShake.js
export class ScreenShake{

    constructor(){
        this.duration = 0;
        this.strength = 0;
    }

    shake(strength=5,duration=200){

        this.strength=strength;
        this.duration=duration;

    }

    update(delta){

        if(this.duration>0){
            this.duration-=delta;
        }

    }

    apply(ctx){

        if(this.duration>0){

            const dx=(Math.random()-0.5)*this.strength;
            const dy=(Math.random()-0.5)*this.strength;

            ctx.translate(dx,dy);

        }

    }

}