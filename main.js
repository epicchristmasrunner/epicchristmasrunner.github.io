var person;
var backgroundMusic;
var myObstacles = [];

function startGame() {
    backgroundMusic = new sound("https://www.feltmusic.com/audio/128/felt004_321_the_oracle_of_delphi_v1.mp3");
    person = new component(30, 30, "red", 10, 120);
    backgroundMusic.play();
    gameArea.start();
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth - 10;
        this.canvas.height = window.innerHeight - 25;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0; 
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            gameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            gameArea.key = false;
        })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function everyinterval(n) {
  if ((gameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.update = function(){
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
    var x, y;
  for (i = 0; i < myObstacles.length; i += 1) {
    if (person.crashWith(myObstacles[i])) {
      return;
    } 
  }
  gameArea.clear();
  gameArea.frameNo += 1;
  if (gameArea.frameNo == 1 || everyinterval(150)) {
    x = gameArea.canvas.width;
    y = gameArea.canvas.height - 200
    myObstacles.push(new component(10, 200, "green", x, y));
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
    //========
    
    person.speedX = 0;
    person.speedY = 0;
    if (gameArea.key && gameArea.key == 37) {person.speedX = -4; }
    if (gameArea.key && gameArea.key == 39) {person.speedX = 4; }
    if (gameArea.key && gameArea.key == 38) {person.speedY = -4; }
    if (gameArea.key && gameArea.key == 40) {person.speedY = 4; }
    person.newPos();
    person.update();
}
