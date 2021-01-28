var monkey, monkey_running;
var banana, bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var playground, playgroundImage;
var invisibleGround;
var score;
var gameState = 1;

function preload(){
 monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png",      "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("banana (1).png");
  obstacleImage = loadImage("stone.png");
  playgroundImage = loadImage("jungle.jpg");  
}

function setup(){
  createCanvas(600,600);

  playground = createSprite(300, 300, 600, 600);
  playground.velocityX = -2;
  playground.addImage("ground",playgroundImage);
  playground.x = playground.width / 2;
  
  invisibleGround = createSprite(400,450,800,10);
  invisibleGround.visible = false;

  monkey = createSprite(80, 420, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.15;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw(){  
  background(0);
  if(gameState === 1){ 
  
 if (playground.x < 100){
      playground.x = playground.width/2;
    }
  if(monkey.isTouching(bananaGroup)){
     bananaGroup.destroyEach();
     score = score+2;
     }
  if(keyDown("space") && monkey.y >= 320){
     monkey.velocityY = -12;
     }
  monkey.velocityY = monkey.velocityY + 1;
  
  monkey.collide(invisibleGround);

  switch(score){
    case 10: monkey.scale = 0.16;
      break;
    case 15: monkey.scale = 0.18;
      break;
    case 20: monkey.scale = 0.20;
      break;
    case 25: monkey.scale = 0.22; 
      break;
    case 30: monkey.scale = 0.24; 
      break; 
    case 35: monkey.scale = 0.26; 
      break;  
    case 50: monkey.scale = 0.28; 
      break;  
    default: break;  
         }
  if(obstacleGroup.isTouching(monkey)){
     gameState = 2;
     }
  
  spawnObstacles();
  spawnFruits();
  
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE : "+score, 480, 50);
    }
    if (gameState === 2){
  stroke("yellow");
  textSize(50);
  fill("yellow");
  text("SCORE : "+score, 220, 250);
  text("GAME OVER", 200, 300);
    }
  }

function spawnObstacles(){
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(400,450,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.setLifetime = 300;
    obstacle.velocityX = -3;
    obstacle.collide(invisibleGround); 
    obstacleGroup.add(obstacle);
  }
}

function spawnFruits(){
  if(frameCount % 120 === 0){
   var banana = createSprite(400,120,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.y = Math.round(random(100,180));
    banana.velocityX = -3;
    banana.setLifetime = 300;
    bananaGroup.add(banana);
    
  }
}