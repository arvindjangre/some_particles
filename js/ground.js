var canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
canvas.style = `
  background-color: white;
  box-shadow: 0px 0px 10px 2px black;
  `;
var container = document.getElementById('container');
container.appendChild(canvas);

context = canvas.getContext('2d');
var dot = document.createElement('dot');
dot.classList.add('dot');
canvas.appendChild(dot);

draw = (x, y, color, w_size) => {
  context.fillstyle = color;
  context.fillRect(x, y, w_size, w_size);
}

particles = [];
particle = (x, y, color) => {
  return {
    "x": x,
    "y": y,
    "vx": 0,
    "vy": 0,
    "color": color
  };
}

random = () => {
  return Math.random() * 400 + 50;
}

createParticles = (number, color) => {
  group = [];
  for (let i = 0; i < number; i++) {
    group.push(particle(random(), random(), color));
    particles.push(group[i]);
  }
  return group
}

black = createParticles(10, "black");

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  for (let i = 0; i < particles.length; i++) {
    draw(particles[i].x, particles[i].y, particles[i].color, 5);
  }
  context.closePath();

  requestAnimationFrame(update);
}