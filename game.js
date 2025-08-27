// Variables for the game
const player = document.getElementById('player');
const enemy = document.getElementById('enemy');
const scoreElement = document.getElementById('score');
let score = 0;

// Player controls
let playerX = 100;
let playerY = 350;
const playerSpeed = 5;

// Enemy controls
let enemyX = 700;
let enemyY = 350;
const enemySpeed = 2;

// Game constants
const gameArea = document.getElementById('game-container');
const gameWidth = gameArea.clientWidth;
const gameHeight = gameArea.clientHeight;

// Movement listener
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        playerX -= playerSpeed;
    } else if (e.key === 'ArrowRight') {
        playerX += playerSpeed;
    } else if (e.key === 'ArrowUp') {
        playerY -= playerSpeed;
    } else if (e.key === 'ArrowDown') {
        playerY += playerSpeed;
    } else if (e.key === ' ') {
        // Attack logic
        attackEnemy();
    }

    // Update player position
    updatePlayerPosition();
});

// Update player position
function updatePlayerPosition() {
    // Keep player within game boundaries
    if (playerX < 0) playerX = 0;
    if (playerX > gameWidth - 50) playerX = gameWidth - 50;
    if (playerY < 0) playerY = 0;
    if (playerY > gameHeight - 50) playerY = gameHeight - 50;

    player.style.left = playerX + 'px';
    player.style.bottom = playerY + 'px';
}

// Enemy AI movement
function enemyMovement() {
    const direction = Math.random() > 0.5 ? 1 : -1;  // Random movement direction
    enemyX += enemySpeed * direction;

    if (enemyX < 0) enemyX = 0;
    if (enemyX > gameWidth - 50) enemyX = gameWidth - 50;

    enemy.style.left = enemyX + 'px';
    enemy.style.bottom = enemyY + 'px';
}

// Attack Logic (simplified)
function attackEnemy() {
    const attackRange = 50; // distance for attack to land

    if (Math.abs(playerX - enemyX) < attackRange && Math.abs(playerY - enemyY) < attackRange) {
        score += 10;
        scoreElement.textContent = 'Score: ' + score;
        // Reset enemy position after hit
        enemyX = Math.random() * (gameWidth - 50);
    }
}

// Main game loop
function gameLoop() {
    enemyMovement();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
