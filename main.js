var person;
var backgroundMusic;

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

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function(){
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY; 
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
    if (gameArea.key && gameArea.key == 37) {person.speedX = -1; }
    if (gameArea.key && gameArea.key == 39) {person.speedX = 1; }
    if (gameArea.key && gameArea.key == 38) {person.speedY = -1; }
    if (gameArea.key && gameArea.key == 40) {person.speedY = 1; }
    person.newPos();
    person.update();
}
