class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage(player_img);
    player2 = createSprite(800,500);
    player2.addImage( player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;

            // Differentiate the main player by printing
            // the name of the player on the basket. 
            fill("white")
            text(allPlayers[plr].name,players[index-1].x-15,players[index-1].y+75)
        }
            if(player1score.index!==null){
            for(var i=0;i<fruitGroup.lenght;i++){
                if(fruitGroup.get(i).isTouching(players)){
                fruitGroup.get(i).destroy();
                player.score+=1
                player.update();
                }
            }

            }

        // Give movements for the players using arrow keys
        if(keyIsDown(37)&&player.index!==null){
        player.distance+=10
        player.update();
        }
        if(keyIsDown(39)&&player.index!==null){
        player.distance-=10
        player.update();
        }
        // Create and spawn fruits randomly
        if(frameCount%20===0){
        fruits=createSprite((50,950),0,100,100)
        fruits.x=Math.round(random(50,590))
        fruits.velocityY=5
        var rand=Math.round(random(1,5));
        switch(rand){
        case 1:fruits.addImage(fruit1_img);
        break;
        case 2:fruits.addImage(fruit2_img);
        break;
        case 3:fruits.addImage(fruit3_img);
        break;
        case 4:fruits.addImage(fruit4_img);
        break;
        case 5:fruits.addImage(fruit5_img);
        break;
        }
        fruits.lifetime=110;
        fruitGroup.add(fruits);
        if(fruitGroup.isTouching(player1)){
        player1score+=1
        fruitGroup[0].destroy();
        player.update();

        }
        if(fruitGroup.isTouching(player2)){
            player2score+=1
            fruitGroup[0].destroy();
            player.update();
            
            }
        }
        
     drawSprites();  
     fill("white")
     text("player1 :"+player1score,200,100) 
     text("player2 :"+player2score,800,100) 

     if(player1score>=10||player2score>=10){
     this.end();
     }
    }
    

    end(){
       console.log("Game Ended");
       clear();
       fill("blue");
       textSize(40);
       text("Game Over",400,300);

    }
}