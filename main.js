function startGame() {
  gameArea.start();
  gameArea.canvas;
}

var gameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
        this.canvas.width = window.innerWidth - 10;
        this.canvas.height = window.innerHeight - 20;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGame, 20);
        window.addEventListener('keydown', function (e) {
            gameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            gameArea.key = false;
        })
        window.addEventListener('mousemove', function (e) {
            gameArea.x = e.pageX;
            gameArea.y = e.pageY;
        })
        window.addEventListener('mousedown', function (e) {
            gameArea.md = e;
        })
        window.addEventListener('mouseup', function (e) {
            gameArea.md = false;
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

//===================================
//Maths and data types

function vector2(x_, y_) {
  this.x = x_;
  this.y = y_;
}

function distence(x_,y_,x1_,y1_)
{
    var dist = Math.sqrt((x1_-x_)*(x1_-x_)+(y1_-y_)*(y1_-y_));
    return dist;
}

function collision(localObj, otherObj) {
    if (localObj.x < otherObj.x + otherObj.width &&
        localObj.x + localObj.width > otherObj.x &&
        localObj.y < otherObj.y + otherObj.height &&
        localObj.height + localObj.y > otherObj.y) {
        return true;
    }
    else {
        return false;
    }
}

//===================================

function gameObject(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 1;
    this.speedY = 1;    
    this.angle = 0;
    this.speed = 2;
    this.x = x;
    this.y = y;    
    this.destroyed = false;
    this.update = function() {
        if (!this.destroyed) {
            ctx = gameArea.context;
            ctx.save();
            ctx.fillStyle = "green";
            ctx.font = "15pt Calibri";
            ctx.translate(this.x, this.y); 
            ctx.rotate(this.angle);
            ctx.fillStyle = color;
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height); 
            ctx.restore(); 
        }
        else {
            ctx.fillStyle = "orange";
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height); 
        }
    }
    this.clicked = function() {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var clicked = true;
        if ((mybottom < gameArea.y) || (mytop > gameArea.y) || (myright < gameArea.x) || (myleft > gameArea.x)) {
            clicked = false;
        }
        return clicked;
    }
    this.godir = function() {
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
    this.destroy = function() {
        this.destroyed = true;
        this.speedX = 0;
        this.speedY = 0;    
        this.angle = 0;
        this.speed = 0;
    }
}

function updateGame() {
  gameArea.clear();
  alert("This might work");
}
