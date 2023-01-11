const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let points = 0;   //begin punten
let enemies = [];
let bullets = [];

let mouse = {   //begin locatie van de muis
  x: canvas.width / 2,
  y: canvas.height / 2
}

addEventListener('mousemove', (event) => {    //ziet de locatie van de muis
  mouse.x = event.pageX,
  mouse.y = event.pageY
});

addEventListener('click', Shoot);   //conect de keys aan acties
addEventListener('keypress', (event) => {   //conect de keys aan acties
  if (event.code == "Space") {
    Shoot();
  }
});

addEventListener('keydown', (event) => {    //conect de keys aan acties
  if (event.code == "KeyW") {
    MovePlayer(1);
  }
  if (event.code == "KeyS") {
    MovePlayer(2);
  } 
});

class Circle {    //voor later als er een cirkel nodig is
  constructor(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = c;
  }

  draw () {   //tekent een cirkel
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update () {
    this.draw();
  }
}

function randomIntFromRange(min, max) {   //voor latere randomizers
  return Math.floor(Math.random() * (max-min+1) + min);
}

function Shoot () {
  let bullet = new Circle(player.x, player.y, 8, 'white');    // says the x and y spawn value and the size than the color
  // bullet.mx = mouse.x;
  // bullet.my = mouse.y;

  let vx = mouse.x - bullet.x;    //<-- zegt hoe snel en waar de bullet naar toe moet bewegen
  let vy = mouse.y - bullet.y;
  let speed = 6;

  let dist = Math.sqrt(vx * vx + vy * vy);
  bullet.dx = vx / dist;
  bullet.dy = vy / dist;

  bullet.dx *= speed;
  bullet.dy *= speed;   //-->

  bullets.push(bullet);   //beweegt de bullet
}

// Spawn Enemy
function SpawnEnemy() {
  let enemy = new Circle(canvas.width, randomIntFromRange(40, canvas.height - 10), 10, 'red');//level 1 vijand
  let level = randomIntFromRange(1, 4);   //bepaalt de level van vijanden
  enemy.speed = 2;    //vijand snelheid
  enemy.health = level/2;    //bepaalt health
  if (level == 2) {   //level 2 vijand
    enemy.color = 'blue';   //vijand kleur
    enemy.speed = 2,5;    //vijand snelheid
  }
  else if (level == 3){   //level 3 vijand
    enemy.color = 'green';    //vijand kleur
    enemy.speed = 3;    //vijand snelheid
  }
  else if(level == 4){    //level 4 vijand
    enemy.color = 'yellow';   //vijand kleur
    enemy.speed = 3,5;    //vijand snelheid
  }

  enemies.push(enemy);    //beweeg vijand
}

let player;
function Start() {   //start het spel
  player = new Circle(0, canvas.height/2, 22, 'orange');    //maakt de speler
}

let originalTimer = 120;    //timer voor de vijanden
let spawnTimer = originalTimer;
function Update () {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];

    bullet.x += bullet.dx;
    bullet.y += bullet.dy;

    if (
      bullet.x < 0 ||
      bullet.x > canvas.width ||
      bullet.y < 0 ||
      bullet.y > canvas.height
    ) {
      bullets.splice(i, 1);   //verwijderd de bullets
      console.log(bullets);
    }

    bullet.update();    //update de bullets
  }

  // Enemies
  spawnTimer--;
  if (spawnTimer <= 0) {
    originalTimer = (originalTimer * 0.98 > 60) ? originalTimer * 0.98 : 60;
    spawnTimer = originalTimer;
    SpawnEnemy();   //zecht dat de vijanden moeten spawnen
  }
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];

    enemy.x -= enemy.speed;   //beweegt de vijand

    if (enemy.x < 45) { // bepaald waar de vijanden verdwijnen
      enemies.splice(i, 1);   //verwijderd de vijand
      originalTimer = 150;
      points = 0;
    }

    for (let j = 0; j < bullets.length; j++) {
      let bullet = bullets[j];

      let ax = bullet.x - enemy.x;
      let ay = bullet.y - enemy.y;
      let distance = Math.sqrt(ax * ax + ay * ay);

      if (distance < bullet.radius + enemy.radius) {
        enemy.health--;   //damaged de vijand
        bullets.splice(j, 1);   //verwijderd de bullet
        if (enemy.health <= 0){
          enemies.splice(i, 1);   //verwijderd de vijand
          points += 1;   //geeft punten
        }
      }
    }

    enemy.update();   //update de vijand
  }

  player.update();  //update de speler

  ctx.fillStyle = "#FFFFFF";    //text kleur
  ctx.font = "15px sans-serif";   //text font
  ctx.textAlign = "center";   //waar de text staat
  ctx.fillText("points: " + points, canvas.width/2, 15);    //de text
}

function MovePlayer(direction) {
  switch (direction) {
    case 1:
        player.y -= 10;   //beweegt de speler naar boven
      break;
    case 2:
      player.y += 10;   //beweegt de speler naar beneden
      break;
    default:
      break;
  }
}

addEventListener('keypress', (event) => {
  if (event.code == "Enter") {    //als enter is ingedrukt begin het spel
    Start();
    Update();
  }
})