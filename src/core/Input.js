export class Input{

    constructor(game, player){

        document.addEventListener("keydown", e => {

            if(e.key === "ArrowLeft") player.moveLeft();
            if(e.key === "ArrowRight") player.moveRight();

            // PAUSE TOGGLE
            if(e.code === "Space"){
                
                if(game.state === "playing"){
                    game.state = "paused";
                } 
                else if(game.state === "paused"){
                    game.state = "playing";
                }

            }
            // RESTART BUTTON
            if(e.key === "r" || e.key === "R"){

                if(game.state === "gameover"){
                    game.restart();
                }

            }

        });

        document.addEventListener("touchstart", e => {

            const x = e.touches[0].clientX;

            if(x < window.innerWidth/2){
                player.moveLeft();
            }else{
                player.moveRight();
            }

        });

    }

}