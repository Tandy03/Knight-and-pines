document.addEventListener('DOMContentLoaded', () => {
    const dino = document.getElementById('dino');
    const cactus = document.getElementById('cactus');
    const scoreDisplay = document.getElementById('score');

    let isJumping = false;
    let isGameOver = false;
    let speed = 5; // Початкова швидкість
    let speedIncreaseInterval = 5000; // Інтервал збільшення швидкості (мс)
    let score = 0;

    document.addEventListener('keydown', function(event) {
        if ((event.code === 'Space' || event.code === 'ArrowUp' || event.code === 'KeyW') && !isJumping && !isGameOver) {
            jump();
        }
    });

    function jump() {
        isJumping = true;
        let jumpHeight = 150; // Висота стрибка
        let upSpeed = 20; // Швидкість підняття
        let downSpeed = 20; // Швидкість спускання
        let position = 0;
        
        let upInterval = setInterval(() => {
            if (position >= jumpHeight) {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (position <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    } else {
                        position -= 10;
                        dino.style.bottom = position + 'px';
                    }
                }, downSpeed);
            } else {
                position += 10;
                dino.style.bottom = position + 'px';
            }
        }, upSpeed);
    }

    function checkCollision() {
        const dinoRect = dino.getBoundingClientRect();
        const cactusRect = cactus.getBoundingClientRect();

        if (
            dinoRect.left < cactusRect.left + cactusRect.width &&
            dinoRect.left + dinoRect.width > cactusRect.left &&
            dinoRect.top < cactusRect.top + cactusRect.height &&
            dinoRect.top + dinoRect.height > cactusRect.top
        ) {
            clearInterval(collisionCheck);
            clearInterval(scoreInterval);
            isGameOver = true;
            alert('Game Over!');
        }
    }

    function moveCactus() {
        if (isGameOver) return;
        let cactusPos = cactus.offsetLeft;

        if (cactusPos <= -20) {
            cactusPos = 800;
        } else {
            cactusPos -= speed;
        }

        cactus.style.left = cactusPos + 'px';
        requestAnimationFrame(moveCactus);
    }

    function increaseSpeed() {
        if (!isGameOver) {
            speed += 0.5;
            setTimeout(increaseSpeed, speedIncreaseInterval);
        }
    }

    function updateScore() {
        if (!isGameOver) {
            score += 1;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }

    let collisionCheck = setInterval(checkCollision, 10);
    let scoreInterval = setInterval(updateScore, 100);
    moveCactus();
    setTimeout(increaseSpeed, speedIncreaseInterval);
});
