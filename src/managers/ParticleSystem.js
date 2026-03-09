// /src/managers/ParticleSystem.js
export class ParticleSystem {

    constructor(game){
        this.game = game;
        this.particles = [];
    }

    explode(x,y,color="orange"){

        for(let i=0;i<15;i++){

            this.particles.push({
                x,
                y,
                vx:(Math.random()-0.5)*200,
                vy:(Math.random()-0.5)*200,
                life:500,
                color
            });

        }

    }

    update(delta){

        this.particles.forEach(p=>{

            p.x += p.vx * delta/1000;
            p.y += p.vy * delta/1000;
            p.life -= delta;

        });

        this.particles = this.particles.filter(p=>p.life>0);

    }

    draw(ctx){

        this.particles.forEach(p=>{

            ctx.fillStyle=p.color;
            ctx.fillRect(p.x,p.y,3,3);

        });

    }

}