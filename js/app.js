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

    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// check collision
var checkCollision = function(anEnemy) {
    // check for collision between enemy and player
    if (
        player.y + 131 >= anEnemy.y + 90 &&
        player.x + 25 <= anEnemy.x + 88 &&
        player.y + 73 <= anEnemy.y + 135 &&
        player.x + 76 >= anEnemy.x + 11) {

        player.x = 202.5;
        player.y = 383;
    }

}

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

Player.prototype.update = function(){}

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 20;
    }

    checkBoundary(player.x, player.y);
    checkWin(player.x, player.y);
};


var checkBoundary = function(x, y) {
    // handle cases where player move to boundaries
    if (y > 383) {
        y = 383;
    }
    if (x > 402.5) {
        x = 2.5;
    }
    if (x < 2.5) {
        x = 402.5;
    }
}

var checkWin = function(x, y) {
    // If win Reset player
    
    if (y + 63 <= 0) {
        player.x = 202.5;
        player.y = 383;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);
    }
};

// Game init
var allEnemies = [];
var player = new Player(202.5, 383, 50);
// let's make it 3 enermies

for (i = 0; i < 3; ++i) {
    var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
    allEnemies.push(enemy);
}


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