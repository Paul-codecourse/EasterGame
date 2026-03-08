// /src/core/Input.js
export class Input{

    constructor(player){

        document.addEventListener("keydown",e=>{

            if(e.key==="ArrowLeft") player.moveLeft();
            if(e.key==="ArrowRight") player.moveRight();

        });

        document.addEventListener("touchstart",e=>{

            const x=e.touches[0].clientX;

            if(x < window.innerWidth/2){
                player.moveLeft();
            }else{
                player.moveRight();
            }

        });

    }

}