// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // if within canvas, move according to speed
    // elseif move out of canvas, reset 
    if (this.x <= 505) {
        this.x += this.speed * dt;
    } else {
        this.x = 0;
    }

    this.checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// check collision
Enemy.prototype.checkCollision = function(anEnemy) {
    // check for collision between enemy and player
    if (
        player.y + 131 >= anEnemy.y + 90 &&
        player.x + 25 <= anEnemy.x + 88 &&
        player.y + 73 <= anEnemy.y + 135 &&
        player.x + 76 >= anEnemy.x + 11) {

        reset();
    }

};

// Player object
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

// Draw the player on the screen, required method for game
// Display score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed;
    }
    if (keyPress == 'up') {
        this.y -= this.speed - 20;
    }
    if (keyPress == 'right') {
        this.x += this.speed;
    }
    if (keyPress == 'down') {
        this.y += this.speed - 20;
    }

    this.checkBoundary(this.x, this.y);
    this.checkWin(this.y);
};


Player.prototype.checkBoundary = function(x, y) {
    // handle cases where player move to boundaries
    if (y > 383) {
        this.y = 383;
    }
    if (x > 405) {
        this.x = 2.5;
    }
    if (x < 0) {
        this.x = 402.5;
    }
};

Player.prototype.checkWin = function(y) {
    // If win Reset player
    if (y <= 0) {
        reset();
    }
};

// Game init
var allEnemies = [];
var player = new Player(202.5, 383, 101);
// let's make it 3 enermies

reset = function() {
    player = new Player(202.5, 383, 101);
    allEnemies = [];
    for (i = 0; i < 3; ++i) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        allEnemies.push(enemy);
    }
};

reset();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});