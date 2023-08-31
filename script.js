const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

canvas.height = canvas.width;

const Direction = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
};

let bodyLocations = []

const boxSize = 10;
let framesPerMove = 7;
let snake = [{ x: 0, y: 0, moveFrames: 0 }];
let food = { x: 0, y: 0 };
let currentDirection = Direction.RIGHT;

function generateRandomPosition() {
    return Math.floor(Math.random() * canvas.width / boxSize) * boxSize;
}

function createFood() {
    food.x = generateRandomPosition();
    food.y = generateRandomPosition();
}

function drawSnake() {
    context.fillStyle = "#2ecc71";
    snake.forEach(segment => {
        context.fillRect(segment.x, segment.y, boxSize, boxSize);
    });
}

function drawFood() {
    context.fillStyle = "#e74c3c";
    context.fillRect(food.x, food.y, boxSize, boxSize);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    clearCanvas();

    snake[0].moveFrames--;
    if (snake[0].moveFrames <= 0) {
        moveSnake();
        snake[0].moveFrames = framesPerMove;
    }

    drawSnake();
    drawFood();
    requestAnimationFrame(gameLoop);
}

function moveSnake() {
    const head = { ...snake[0] };
    switch (currentDirection) {
        case Direction.LEFT:
            head.x -= boxSize;
            break;
        case Direction.RIGHT:
            head.x += boxSize;
            break;
        case Direction.UP:
            head.y -= boxSize;
            break;
        case Direction.DOWN:
            head.y += boxSize;
            break;
    }
    snake.unshift(head);

    if (head.x >= canvas.width) {
        head.x -= canvas.width
    }

    if (head.x <= -10) {
        head.x = canvas.width
    }

    if (head.y >= canvas.width) {
        head.y -= canvas.width
    }

    if (head.y <= -10) {
        head.y = canvas.width
    }

    if (snake.length > 4) {
        snake.forEach((snakeBody, index) => {

            if (index === 0) return

            if (snakeBody.x === head.x && snakeBody.y === head.y) {
                console.log("hit");
            }
        })
    }
    if (head.x === food.x && head.y === food.y) {
        framesPerMove -= 0.05
        createFood();
    } else {
        snake.pop();
    }
}

function startGame() {
    createFood();
    snake[0].moveFrames = framesPerMove;
    requestAnimationFrame(gameLoop);
}

gameStarted = false

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowLeft":
            if (currentDirection !== Direction.RIGHT) {
                currentDirection = Direction.LEFT;
            }
            break;
        case "ArrowRight":
            if (currentDirection !== Direction.LEFT) {
                currentDirection = Direction.RIGHT;
            }
            break;
        case "ArrowUp":
            if (currentDirection !== Direction.DOWN) {
                currentDirection = Direction.UP;
            }
            break;
        case "ArrowDown":
            if (currentDirection !== Direction.UP) {
                currentDirection = Direction.DOWN;
            }
            break;
    }
    
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
        !gameStarted && startGame();
        gameStarted = true    
    }

});

window.onclick = event => {

    switch (event.target.id) {
        case "left":
            if (currentDirection !== Direction.RIGHT) {
                currentDirection = Direction.LEFT;
            }
            break;
        case "right":
            if (currentDirection !== Direction.LEFT) {
                currentDirection = Direction.RIGHT;
            }
            break;
        case "top":
            if (currentDirection !== Direction.DOWN) {
                currentDirection = Direction.UP;
            }
            break;
        case "down":
            if (currentDirection !== Direction.UP) {
                currentDirection = Direction.DOWN;
            }
            break;
    }

    if (["top", "bottom", "left", "right"].includes(event.target.id)) {
        !gameStarted && startGame();
        gameStarted = true
    }

}
