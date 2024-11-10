const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
let score = 0;
let candies = [];

class Candy {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y += this.speed;
    }
}

function spawnCandy() {
    const x = Math.random() * canvas.width;
    const radius = 10;
    const speed = 2 + Math.random() * 3;
    candies.push(new Candy(x, 0, radius, speed));
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    candies.forEach((candy, index) => {
        candy.update();
        candy.draw();

        if (candy.y - candy.radius > canvas.height) {
            candies.splice(index, 1);
            score++;
            scoreDisplay.innerText = `Candies Collected: ${score}`;
        }
    });

    requestAnimationFrame(updateGame);
}

setInterval(spawnCandy, 1000);
updateGame();
