// /src/managers/ParticleSystem.js
export class ParticleSystem {

    constructor(game){
        this.game = game;
        this.particles = [];
    }

explode(x,y,color="orange",count=20){

    for(let i=0;i<count;i++){

        this.particles.push({
            x,
            y,
            vx:(Math.random()-0.5)*150,
            vy:(Math.random()*-250), // upward burst
            life:400+Math.random()*200,
            color
        });

    }

    }

        update(delta){

            this.particles.forEach(p=>{

                // movement
                p.x += p.vx * delta/1000;
                p.y += p.vy * delta/1000;

                // gravity makes particles fall back down
                p.vy += 400 * delta/1000;

                // lifetime
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