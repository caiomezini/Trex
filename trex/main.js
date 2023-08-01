var trex;
var trex_img;
var trex_die;
var chao, chao_img;
var edges;
var chao_inv;
var nuvem_img;
var obs1, obs2, obs3, obs4, obs5, obs6;
var pontos = 0;
var grupoCacto;
var grupoNuvem;
var endgame_img;
var reset_img;
var jumpsound, pointsound, diesound;
var endgame;
var reset;

const PLAY = 1;
const END = 0;
var gameState = PLAY;

function preload() {
    trex_img = loadAnimation("trex1.png", "trex3.png", "trex4.png")
    trex_die = loadAnimation("trex_collided.png")
    chao_img = loadImage("ground2.png");
    nuvem_img = loadImage("cloud.png");
    obs1 = loadImage("obstacle1.png");
    obs2 = loadImage("obstacle2.png");
    obs3 = loadImage("obstacle3.png");
    obs4 = loadImage("obstacle4.png");
    obs5 = loadImage("obstacle5.png");
    obs6 = loadImage("obstacle6.png");
    endgame_img = loadImage("gameOver.png");
    reset_img = loadImage("restart.png");
    jumpsound = loadSound("jump.mp3");
    pointsound = loadSound("checkpoint.mp3");
    diesound = loadSound("die.mp3");
}

function setup() {
    createCanvas(600, 200);
    chao = createSprite(width, height - 20, 600, 50);
    chao.addImage(chao_img);
    chao.velocityX = -(6+pontos/100);
    trex = createSprite(50, 160, 20, 50);
    trex.addAnimation("correndo", trex_img);
    trex.addAnimation("die", trex_die);
    trex.scale = 0.5;
    trex.debug = false;
    trex.setCollider("rectangle",0,0,80,80);

    edges = createEdgeSprites()

    chao_inv = createSprite(width / 2, height, width, 20);
    chao_inv.visible = false;
    grupoCacto = new Group;
    grupoNuvem = new Group;
    
    endgame = createSprite(300, 50);
    endgame.addImage(endgame_img);
    endgame.scale = 0.5;
    reset = createSprite(300, 100);
    reset.addImage(reset_img);
    reset.scale = 0.5;
    gameState = END;

    
}

function draw() {
    background(250);
    textFont("arial black")
    textSize(10);
    text("SCORE: " + pontos, 530, 30);

    if (gameState === PLAY) {
        //CRIANDO O FUNDO INFINITO
        if (chao.x < 0) {
            chao.x = width * 2;
        }

        //PULO
        if (keyDown("space") && trex.y > 150) {
            trex.velocityY = -10;
            jumpsound.play();
        }

        //GRAVIDADE
        trex.velocityY += 0.5;

        //COLIDINDO COM AS BORDAS
        trex.collide(edges);
        trex.collide(chao_inv);
        pontos += Math.round(frameCount / 60);

        if(pontos > 0  && pontos % 100 == 0){
            pointsound.play();
        }

        if (trex.collide(grupoCacto)) {
            trex.velocityX = 0;
            trex.velocityY = 0;
            diesound.play();

        }
        gerarNuvem();
        gerarCactus();

    } else if (gameState === END) {
        chao.velocityX = 0;
        grupoCacto.setVelocityXEach(0);
        grupoNuvem.setVelocityXEach(0);
        grupoCacto.setLifetimeEach(-1);
        grupoNuvem.setLifetimeEach(-1);
        trex.changeAnimation("die");

    }

    text(mouseX + "," + mouseY, mouseX, mouseY);

    if(mousePressedOver(reset)){
        reset();
    }

    drawSprites();

}

function reset(){
    gameState = PLAY;
    endgame.visible = false;
    reset.visible = false;
    grupoCacto.destroyEach();
    grupoNuvem.destroyEach();
    pontos = 0;
}

function gerarNuvem() {

    //MÓDULO
    if (frameCount % 60 === 0) {
        var nuvem = createSprite(width, 30);
        nuvem.addImage(nuvem_img);
        nuvem.scale = random(0.5,1.4);
        nuvem.velocityX = -(3+pontos/100);
        nuvem.y = random(20, 70);
        nuvem.lifetime = 250;
        grupoNuvem.add(nuvem);
        nuvem.depth = trex.depth;
        trex.depth += 1;
    }

}
function gerarCactus() {
    if (frameCount % 80 === 0) {
        var cactus = createSprite(width, 165);
        cactus.scale = 0.6;
        cactus.velocityX = -(4+pontos/100);
        cactus.lifetime = 300;
        cactus.debug = false;
        cactus.setCollider("rectangle",0,0,80,80);
        var num = Math.round(random(1, 6));
        console.log(num);
        switch (num) {
            case 1:
                cactus.addImage(obs1);
                cactus.setCollider("rectangle", 0, 0, cactus.width * 2,
                cactus.height);
                break;
            case 2:
                cactus.addImage(obs2);
                cactus.setCollider("rectangle", 0, 0, cactus.width * 2,
                cactus.height);
                break;
            case 3:
                cactus.addImage(obs3);
                cactus.setCollider("rectangle", 0, 0, cactus.width * 2,
                cactus.height);
                break;
            case 4:
                cactus.addImage(obs4);
                cactus.setCollider("rectangle", 0, 0, cactus.width * 2,
                cactus.height);
                break;
            case 5:
                cactus.addImage(obs5);
                cactus.setCollider("rectangle", 0, 0, cactus.width * 2,
                cactus.height);
                break;
            case 6:
                cactus.addImage(obs6);
                cactus.setCollider("rectangle", 0, 0, cactus.width * 2,
                cactus.height);
                break;
            default:
                break;

        }
        grupoCacto.add(cactus);
        cactus.depth = trex.depth;
    }
}
