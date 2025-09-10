const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const numStars = 200;
const mouse = { x: canvas.width/2, y: canvas.height/2 };

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speed = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += (this.x - mouse.x) * 0.0005;
    this.y += (this.y - mouse.y) * 0.0005;
    this.y += this.speed;
    if(this.y > canvas.height) this.reset();
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// create stars
for(let i = 0; i < numStars; i++) {
  stars.push(new Star());
}

// animate
function animate() {
  ctx.fillStyle = "rgba(0,0,30,0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.update();
    star.draw();
  });

  requestAnimationFrame(animate);
}

animate();
