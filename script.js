const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

const paddleWidth = 10, paddleHeight = 100;
let playerY = (canvas.height - paddleHeight) / 2;
let aiY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

function draw() {
    // Limpiar el canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja paletas y pelota
    context.fillStyle = 'white';
    context.fillRect(0, playerY, paddleWidth, paddleHeight);
    context.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);
    context.beginPath();
    context.arc(ballX, ballY, 10, 0, Math.PI * 2, false);
    context.fill();

    // Mueve la pelota
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colisiones con la parte superior/inferior
    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Colisiones con las palas
    if (ballX < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX > canvas.width - paddleWidth && ballY > aiY && ballY < aiY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Movimiento de la IA
    if (aiY + paddleHeight / 2 < ballY) {
        aiY += 4; // Velocidad de la IA, ajustable
    } else {
        aiY -= 4; // Velocidad de la IA, ajustable
    }
    
    // Colisión de fondo
    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }
}

function playerMove(event) {
    const mouseY = event.clientY - canvas.getBoundingClientRect().top - paddleHeight / 2;
    playerY = mouseY < 0 ? 0 : (mouseY + paddleHeight > canvas.height ? canvas.height - paddleHeight : mouseY);
}

// Escuchamos el movimiento del mouse
canvas.addEventListener('mousemove', playerMove);

// Actualizamos el juego
setInterval(draw, 1000 / 60);