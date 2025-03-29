const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const gameArea = document.getElementById('gameArea');

let gameOver = false;
let playerPosition = gameArea.clientHeight - 50;
let obstaclePosition = 0;

function startGame() {
    obstaclePosition = 0; 
    obstacle.style.top = obstaclePosition + 'px';
    gameOver = false;
    moveObstacle();
}

function moveObstacle() {
    if (gameOver) return;
    
    obstaclePosition += 2; // Velocidad de caída del obstáculo
    obstacle.style.top = obstaclePosition + 'px';

    // Verificar colisiones
    if (obstaclePosition > gameArea.clientHeight) {
        obstaclePosition = 0; // Resetea el obstáculo
        setTimeout(() => {
            moveObstacle();
        }, 1000); // Espera para volver a mover
    } else {
        requestAnimationFrame(moveObstacle);
    }
    
    detectCollision();
}

function detectCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        playerRect.x < obstacleRect.x + obstacleRect.width &&
        playerRect.x + playerRect.width > obstacleRect.x &&
        playerRect.y < obstacleRect.y + obstacleRect.height &&
        playerRect.y + playerRect.height > obstacleRect.y
    ) {
        gameOver = true;
        alert("¡Game Over!");
        startGame();
    }
}

document.addEventListener('keydown', (event) => {
    if (!gameOver) {
        if (event.key === 'ArrowLeft') {
            playerPosition -= 10; // Mover a la izquierda
        } else if (event.key === 'ArrowRight') {
            playerPosition += 10; // Mover a la derecha
        }
        playerPosition = Math.max(0, Math.min(gameArea.clientWidth - 30, playerPosition));
        player.style.left = playerPosition + 'px';
    }
});

startGame();