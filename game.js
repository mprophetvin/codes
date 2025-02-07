const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
const basketWidth = 100;
const basketHeight = 20;
let basketX = canvas.width / 2 - basketWidth / 2;
const basketY = canvas.height - 50;
let basketSpeed = 50;

const objectSize = 20;
let objects = [];
let score = 0;
let gameOver = false;

// Event listeners for moving the basket
document.addEventListener('keydown', moveBasket);

function moveBasket(event) {
    if (event.key === 'ArrowLeft' && basketX > 0) {
        basketX -= basketSpeed;
    } else if (event.key === 'ArrowRight' && basketX < canvas.width - basketWidth) {
        basketX += basketSpeed;
    }
}

// Function to spawn falling objects
function spawnObject() {
    const x = Math.random() * (canvas.width - objectSize);
    objects.push({ x, y: 0 });
}

// Game loop
function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '48px Arial';
        ctx.fillText('Game Over!', canvas.width / 2 - 150, canvas.height / 2);
        ctx.fillText(`Score: ${score}`, canvas.width / 2 - 100, canvas.height / 2 + 50);
        return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the basket
    ctx.fillStyle = 'blue';
    ctx.fillRect(basketX, basketY, basketWidth, basketHeight);

    // Update and draw falling objects
    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        obj.y += 5;

        // Check for collision
        if (
            obj.y + objectSize >= basketY &&
            obj.x + objectSize >= basketX &&
            obj.x <= basketX + basketWidth
        ) {
            score++;
            objects.splice(i, 1); // Remove the caught object
            i--; // Adjust index after removal
            continue;
        }

        // Remove objects that fall off the screen
        if (obj.y > canvas.height) {
            gameOver = true;
        }

        // Draw the object
        ctx.fillStyle = 'green';
        ctx.fillRect(obj.x, obj.y, objectSize, objectSize);
    }

    // Display score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);

    // Spawn new objects periodically
    if (Math.random() < 0.02) {
        spawnObject();
    }

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
