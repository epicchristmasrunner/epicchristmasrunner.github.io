var person;
var backgroundMusic;
var myObstacles = [];
var spedman = 3;
var core = 0;

function startGame() {
    backgroundMusic = new sound("untitled.wav");
    person = new component(50, 50, "santa.png", 10, 120, "image");
    backgroundMusi();
    gameArea.start();
}

function backgroundMusi() {
    backgroundMusic.play();
    this.dur = backgroundMusic.sound.duration;
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth - 10;
        this.canvas.height = window.innerHeight - 25;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0; 
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interv = setInterval(backgroundMusi, backgroundMusi.dur*1000);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            gameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            gameArea.key = false;
        })
        window.addEventListener('touchstart', function (e) {
            gameArea.toocc = true;
        })
        window.addEventListener('touchend', function (e) {
            gameArea.toocc = false;
        })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function everyinterval(n, s) {
  if (((gameArea.frameNo - s) / n) % 1 == 0) {return true;}
  return false;
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = gameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        if (this.y > gameArea.canvas.height-100) {
            this.gravitySpeed = 0;
        }
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed; 
    } 
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
           (mytop > otherbottom) ||
           (myright < otherleft) ||
           (myleft > otherright)) {
                crash = false;
        }
        return crash;
    }
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function updateGameArea() {
    gameArea.clear();
    
    //=======
        var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (person.crashWith(myObstacles[i])) {
            gameArea.stop();
            return;
        } 
    }
    gameArea.clear();
    gameArea.frameNo += 1;
    if (gameArea.frameNo == 1 || everyinterval(150, Math.ceil(spedman))) {
        x = gameArea.canvas.width;
        minHeight = window.innerHeight - 300;
        maxHeight = window.innerHeight - 130;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 100;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "candycane.png", x, 0, "image"));
        myObstacles.push(new component(10, x - height - gap, "candycane.png", x, height + gap, "image"));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -spedman;
        myObstacles[i].update();
    }
    //========
    
    person.speedX = 0;
    person.speedY = 0;
    if (gameArea.toocc) {person.speedY = -4 }
    if (gameArea.key && gameArea.key == 37) {person.speedX = -4; }
    if (gameArea.key && gameArea.key == 39) {person.speedX = 4; }
    if (gameArea.key && gameArea.key == 38) {person.speedY = -4; }
    person.newPos();
    person.update();
    spedman+=0.001;
    core++;
    ctx = gameArea.context;
    ctx.fillText(core, 100, 100);
    ctx.fillStyle = "brown";
    ctx.fillRect(0, gameArea.canvas.height-(100-person.height), gameArea.canvas.width, gameArea.canvas.height);
}
