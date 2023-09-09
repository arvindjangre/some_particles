var canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.style = `
  background-color: black;
  box-shadow: 0px 0px 10px 2px black;
  `;
var container = document.getElementById('container');
container.appendChild(canvas);

context = canvas.getContext('2d');
var dot = document.createElement('dot');
dot.classList.add('dot');
canvas.appendChild(dot);

draw = (x, y, color, w_size) => {
  context.fillStyle = color;
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
  return Math.random() * 400;
}

createParticles = (number, color) => {
  group = [];
  for (let i = 0; i < number; i++) {
    group.push(particle(random(), random(), color));
    particles.push(group[i]);
  }
  return group
}

rule = (particle1, particle2, g) => {

  for (let i = 0; i < particle1.length; i++) {
    fx = 0;
    fy = 0;
    for (let j = 0; j < particle2.length; j++) {
      a = particle1[i];
      b = particle2[j];
      // console.log(particle1);
      dx = a.x - b.x;
      dy = a.y - b.y;
      d = Math.sqrt(dx * dx + dy * dy);

      if (d > 0 && d < 80) {
        F = g * (1 / d);
        fx += (F * dx);
        fy += (F * dy);
      }
    }
    //change in accelaration causes velocity
    a.vx = (a.vx + fx) * 0.5;
    a.vy = (a.vy + fy) * 0.5;
    b.vx = (b.vx + fx) * 0.5;
    b.vy = (b.vy + fy) * 0.5;
    a.x += a.vx;
    a.y += a.vy;
    // b.x += b.vx;
    // b.y += b.vy;

    if (a.x <= (0+5) || a.x >= (canvas.width - 10)) { a.vx *= -1 }
    if (a.y <= (0+5) || a.y >= (canvas.height - 10)) { a.vy *= -1 }
    if (b.x <= (0+5) || b.x >= (canvas.width - 10)) { b.vx *= -1 }
    if (b.y <= (0+5) || b.y >= (canvas.height - 10)) { b.vy *= -1 }
  }
}

yellow = createParticles(200, "yellow");
red = createParticles(200, "red");
green = createParticles(200, "green");

function update() {
  rule(green, green, -0.32);
  rule(green, red, -0.17);
  rule(green, yellow, 0.34);
  rule(red, red, -0.1);
  rule(red, green, -0.34);
  rule(yellow, yellow, 0.15);
  rule(yellow, green, -0.2);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  for (let i = 0; i < particles.length; i++) {
    draw(particles[i].x, particles[i].y, particles[i].color, 5);
  }
  context.closePath();

  requestAnimationFrame(update);
}