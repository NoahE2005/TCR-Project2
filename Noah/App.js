
//https://www.google.nl/search?q=javascript+game+maze+generator&sxsrf=ALiCzsZGoyiaBb3uqTkY0tindzcRN_JrqA%3A1670324189364&ei=3R-PY73PFeyP9u8P3-upyAQ&oq=Javascript+game+maze+ge&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQARgAMgUIIRCgATIFCCEQoAEyBQghEKABMggIIRAWEB4QHTIICCEQFhAeEB0yCAghEBYQHhAdMggIIRAWEB4QHTIICCEQFhAeEB0yCgghEBYQHhAPEB0yCgghEBYQHhAPEB06CggAEEcQ1gQQsAM6BggAEBYQHkoECEEYAEoECEYYAFCiAljKBWDaEGgBcAF4AIABlgGIAbUCkgEDMi4xmAEAoAEByAEIwAEB&sclient=gws-wiz-serp
//https://www.google.nl/search?q=javascript+game+collision+detection&sxsrf=ALiCzsZ9NYk6xQLOpbhnkXqobwPWaY256A%3A1670324152098&source=hp&ei=uB-PY_SqA4LtsAectYzgBQ&iflsig=AJiK0e8AAAAAY48tyEwHazw1f87AaKQuVwq9C93CI_N3&oq=Javasc&gs_lcp=Cgdnd3Mtd2l6EAEYADIECCMQJzIECCMQJzIECCMQJzIECAAQQzIECAAQQzIKCAAQsQMQgwEQQzIECAAQQzIECAAQQzIKCAAQsQMQgwEQQzIKCAAQsQMQgwEQQzoECAAQAzoICAAQsQMQgwE6CwgAEIAEELEDEIMBUABY9AdgjRNoAHAAeACAAWSIAfIDkgEDNS4xmAEAoAEB&sclient=gws-wiz

//https://www.youtube.com/watch?v=_MyPLZSGS3s&ab_channel=ChrisCourses
//https://www.youtube.com/watch?v=-UJpgZucQGs&ab_channel=SemicolonDotDev

//https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection


//https://codersblock.com/blog/creating-glow-effects-with-css/

const  Canvas = document.getElementById("Canvas")
const ctx = Canvas.getContext("2d")
const Character = Canvas.getContext("2d")
const coins = Canvas.getContext("2d")
const Monster = Canvas.getContext("2d")
const Walls = Canvas.getContext("2d")

const PlayerWalkSpeed = 3; //De speler snelheid
const PlayerColor = 000000;
const PlayerScaleXY = 20;
const MaxCoins = 8;
const MaxWalls = 50;

var Breed = 0;
var Hoog = 0;

let x = 0; //X locatie van speler
let y = 0; //Y locatie van speler
let vxl = 0; // de X links "velocity" van speler
let vxr = 0; // de X rechts "velocity" van speler
let vy = 0; // de Y "velocity" van speler

var player = Character.fillRect(0,0, 0, 0);
var CoinsRef = coins.fillRect(0,0, 0, 0);
var CoinCount = 0;
var coinlocationsX = [];
var coinlocationsY = [];
var CoinscaleXY = 10;

CoinsBegin()
function UpdateScreen() {
  var Breed = Canvas.offsetWidth - PlayerScaleXY;
  var Hoog = Canvas.offsetWidth - PlayerScaleXY;
  ctx.clearRect(0,0, Canvas.width, Canvas.height)
  Character.clearRect(0,0, Canvas.width, Canvas.height)
    x += vxl;
    x += vxr;
    y += vy;
    Character.beginPath();
    Character.fillStyle = "white";
    player = Character.fillRect(x,y, PlayerScaleXY, PlayerScaleXY)
    Character.closePath();
    Monster.beginPath();
    Monster.fillStyle = "red"; // kleur spr2
    Monster.fillRect(Spr2x, Spr2y, Spr2formaat, Spr2formaat);
    Monster.closePath();
    DrawWalls()
    Coins();
    requestAnimationFrame(UpdateScreen)
}
setTimeout(UpdateScreen, 1000)
setTimeout(EindLoad, 15000)


function CoinsBegin() {
    for (let i = 0; i < MaxCoins; i++) {
        coinlocationsX.push(Math.floor(Math.random() * 1000)) //De willekeurige locatie X van de munten maken
        coinlocationsY.push(Math.floor(Math.random() * 600)) //De willekeurige locatie Y van de munten maken
    }
}


function Coins() {
    for (let i = 0; i < MaxCoins; i++) {
      coins.beginPath();
      coins.fillStyle = "yellow"; //fix
      coins.fillRect(coinlocationsX.at(i),coinlocationsY.at(i), CoinscaleXY, CoinscaleXY)
      coins.closePath();
    }
}

function CoinsCollisionCheck() {
  for (let i = 0; i < MaxCoins; i++) {
    if(coinlocationsX.at(i) >= -10 || coinlocationsY.at(i) >= -10) {
  if((coinlocationsX.at(i) + CoinscaleXY) < x ||
   coinlocationsX.at(i) > (x + PlayerScaleXY) ||
    (coinlocationsY.at(i) + CoinscaleXY) < y ||
     coinlocationsY.at(i) > (y + PlayerScaleXY)) {
}
else {
  CoinCount = CoinCount + 1;
  console.log(CoinCount);
  delete coinlocationsX[i];
  delete coinlocationsY[i];
  UpdateMonsterSpeed();
}
}
  }
}
setInterval(CoinsCollisionCheck,3)

//Begin Input
addEventListener('keydown', function (e){
    if(e.code == 'KeyD') vxr = PlayerWalkSpeed;
    if(e.code == 'KeyA') vxl = PlayerWalkSpeed * -1;
    if(e.code == 'KeyS') vy = PlayerWalkSpeed;
    if(e.code == 'KeyW') vy = PlayerWalkSpeed * -1;
    if( collisionCheck(player, walls)) {
        vxr = 0;
        vxl = 0;
        vy = 0;
        this.alert ("Collision")
    }
})
addEventListener("keyup", function(e) {
    if(e.code == 'KeyD') vxr = 0;
    if(e.code == 'KeyA') vxl = 0;
    if(e.code == 'KeyS') vy = 0;
    if(e.code == 'KeyW') vy = 0;
})

function collisionCheck(a, b) {
    if((a.x + a.width) < b.x ||
    a.x > (b.x + b.width) ||
    (a.y + a.height) < b.y ||
    a.y > (b.y + b.height)) {
      console.log(a.x);
      console.log(b.x);
      console.log("colliding");
    }
    else {
      console.log(a.width);
      console.log(b.width);
      console.log("Not colliding")
    }

    return (ALeftB || ARightB || AaboveB || AbelowB)
}



function OuterWallCollision() { //Een Collision check voor de grootte van de canvas zelf
  var breed = Canvas.offsetWidth - PlayerScaleXY; //breedte van canvas

  var hoog = Canvas.offsetHeight - PlayerScaleXY; //hoogte van canvas

  if(x <= 0){
      x = 0;
  }
  if(y <= 0){
      y = 0;
  }
  if(x >= breed)
  {
      x = breed;
  }
  if(y >= hoog)
  {
      y = hoog;
  }
  setTimeout(OuterWallCollision, 5)
}
OuterWallCollision()


//Eind Input

//Begin Lighting
function TrackPlayer() { //Locatie van player pakken en het setten voor de style
    document.documentElement.style.setProperty('--cursorXpos', x + parseFloat(25) + "px") //de parsefloat om het te centreren
    document.documentElement.style.setProperty('--cursorYpos', y + parseFloat(75) + "px") //de parsefloat om het te centreren
    setTimeout(TrackPlayer, 50)
}
TrackPlayer()
//Eind Lighting

//Begin Maze
pathWidth = 90      //Width of the Maze Path
wall = 40          //Width of the Walls between Paths
outerWall = 50        //Width of the Outer most wall
width = 15          //Number paths fitted horisontally
height = 15          //Number paths fitted vertically
delay = 0           //Delay between algorithm cycles
x = width/2|0        //Horisontal starting position
y = height/2|0       //Vertical starting position
seed = Math.random()*100000|0//Seed for random numbers
wallColor = '#000000'   //Color of the walls
pathColor = '#222a33'//Color of the path

randomGen = function(seed){
	if(seed===undefined)var seed=performance.now()
	return function(){
    seed = (seed * 9301 + 49297) % 233280
		return seed/233280
	}
}

init = function(){
  offset = pathWidth/2+outerWall
  map = []
  canvas = document.getElementById('Canvas2')
  Maze = canvas.getContext("2d")
  canvas.width = outerWall*2+width*(pathWidth+wall)-wall
  canvas.height = outerWall*2+height*(pathWidth+wall)-wall
  Maze.fillStyle = wallColor
  Maze.fillRect(0,0,canvas.width,canvas.height)
  random = randomGen(seed)
  Maze.strokeStyle = pathColor
  Maze.lineCap = 'square'
  Maze.lineWidth = pathWidth
  Maze.beginPath()
  for(var i=0;i<height*2;i++){
    map[i] = []
    for(var j=0;j<width*2;j++){
      map[i][j] = false
    }
  }
  map[y*2][x*2] = true
  route = [[x,y]]
  Maze.moveTo(x*(pathWidth+wall)+offset,
             y*(pathWidth+wall)+offset)
}
init()

inputWidth = document.getElementById('width')
inputHeight = document.getElementById('height')
inputPathWidth = document.getElementById('pathwidth')
inputWallWidth = document.getElementById('wallwidth')
inputOuterWidth = document.getElementById('outerwidth')
inputPathColor = document.getElementById('pathcolor')
inputWallColor = document.getElementById('wallcolor')
inputSeed = document.getElementById('seed')
buttonRandomSeed = pathColor = '#222a33'

settings = {

  update: function(){
    clearTimeout(timer)
    width = parseFloat(inputWidth.value)
    height = parseFloat(inputHeight.value)
    pathWidth = parseFloat(inputPathWidth.value)
    wall = parseFloat(inputWallWidth.value)
    outerWall = parseFloat(inputOuterWidth.value)
    pathColor = inputPathColor.value
    wallColor = inputWallColor.value
    seed = parseFloat(inputSeed.value)
    x = width/2|0
    y = height/2|0
    init()
    loop()
  }
}

loop = function(){
  x = route[route.length-1][0]|0
  y = route[route.length-1][1]|0
  
  var directions = [[1,0],[-1,0],[0,1],[0,-1]],
      alternatives = []
  
  for(var i=0;i<directions.length;i++){
    if(map[(directions[i][1]+y)*2]!=undefined&&
       map[(directions[i][1]+y)*2][(directions[i][0]+x)*2]===false){
      alternatives.push(directions[i])
    }
  }
  
  if(alternatives.length===0){
    route.pop()
    if(route.length>0){
      Maze.moveTo(route[route.length-1][0]*(pathWidth+wall)+offset,
                 route[route.length-1][1]*(pathWidth+wall)+offset)
      timer = setTimeout(loop,delay)
    }
    return;
  }
  direction = alternatives[random()*alternatives.length|0]
  route.push([direction[0]+x,direction[1]+y])
  Maze.lineTo((direction[0]+x)*(pathWidth+wall)+offset,
             (direction[1]+y)*(pathWidth+wall)+offset)
  map[(direction[1]+y)*2][(direction[0]+x)*2] = true
  map[direction[1]+y*2][direction[0]+x*2] = true
  Maze.stroke()
  timer = setTimeout(loop,delay)
}

loop()
setInterval(settings.check,400)
//Eind Maze

//Begin Modal

//Begin Loading
function EindLoad() {
var modal = document.getElementById("modal");
modal.classList.remove("activemodal");
document.getElementById("Canvas").style.animation = "CanvasZoom 2s forward";
document.getElementById("Canvas2").style.animation = "CanvasZoom 2s forward";
document.documentElement.style.setProperty('--Radius', 20 + "rem")
}
document.documentElement.style.setProperty('--Radius', 3000 + "rem")

function LoadingText1() {
  document.getElementById("LoadingText").innerHTML = "Loading.";
  setTimeout(LoadingText2, 1500);
}
function LoadingText2() {
  document.getElementById("LoadingText").innerHTML = "Loading..";
  setTimeout(LoadingText3, 1000);
}
function LoadingText3() {
  document.getElementById("LoadingText").innerHTML = "Loading...";
  setTimeout(LoadingText1, 1000);
}
LoadingText1()
//Eind Loading

 //Monster Begin
 let Spr2x = 400;
 let Spr2y = 220;
 let MonsterSpeed = 0.5;

 var Spr2formaat = 20; 
 var telSpr2 = 0;
 var maxSpr2 = 100;
 var richtSpr2X = 1;
 var richtSpr2Y = 1;
 var SeesPlayer = true;

 var Spr1boven = x - (PlayerScaleXY / 2);
 var Spr1beneden = y + (PlayerScaleXY / 2);
 var Spr1links = x - (PlayerScaleXY / 2);
 var Spr1rechts = x + (PlayerScaleXY / 2);
 var Spr2boven = Spr2y - (Spr2formaat / 2);
 var Spr2beneden = Spr2y + (Spr2formaat / 2);
 var Spr2links = Spr2x - (Spr2formaat / 2);
 var Spr2rechts = Spr2x + (Spr2formaat / 2);

 function Spr2() {
  if(SeesPlayer) {
    if(x > Spr2x) {
      richtSpr2X = MonsterSpeed;
    }
    if(x < Spr2x) {
      richtSpr2X = MonsterSpeed * -1;
    }
    if(y > Spr2y) {
      richtSpr2Y = MonsterSpeed;
    }
    if(y < Spr2y) {
      richtSpr2Y = MonsterSpeed * -1;
    }
  }
  else {

     telSpr2++;
     if (telSpr2 > maxSpr2) {
         telSpr2 = 0;
         richtSpr2X = Math.floor(Math.random()*3) -1;Spr2formaat
         richtSpr2Y = Math.floor(Math.random()*3) -1;
     }
    }
     Spr2x += richtSpr2X;  
     Spr2y += richtSpr2Y;
     if (Spr2x<0) {richtSpr2X = MonsterSpeed;}
     if (Spr2x>Canvas.offsetWidth-Spr2formaat) {richtSpr2X = MonsterSpeed * -1;}
     if (Spr2y<0) {richtSpr2Y = MonsterSpeed;}
     if (Spr2y>Canvas.offsetHeight-Spr2formaat) {richtSpr2Y = MonsterSpeed * -1;}
   }
   setInterval(Spr2, 5)

   function MonstercollisionCheck() {
    if((x + PlayerScaleXY) < Spr2x ||
    x > (Spr2x + Spr2formaat) ||
    (y + PlayerScaleXY) < Spr2y ||
    y > (Spr2y + Spr2formaat)) {
      console.log("Not colliding");
    }
    else {
      console.log("colliding")
    }
  }
setInterval(MonstercollisionCheck,5)

function UpdateMonsterSpeed() {
  richtSpr2X = 0;
  richtSpr2Y = 0;
  MonsterSpeed = MonsterSpeed + (CoinCount * 0.05);
}

 //Monster Eind

 let walls = [
  {x: 100, y: 100, width: 50, height: 50},
  {x: 300, y: 300, width: 50, height: 50},
  {x: 400, y: 400, width: 50, height: 50}
];

 for (let i = 0; i < MaxWalls; i++) {
  walls.push((Math.random() * 1000), Math.floor(Math.random() * 1000), 50, 50) 
}

function checkCollision() {
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    if (x < wall.x + wall.width && x + PlayerScaleXY > wall.x &&
      y < wall.y + wall.height && y + PlayerScaleXY > wall.y) {
        console.log("Player collided with wall");
        // Move player out of collision
        if (vxl > 0 || vxr > 0) {
          x = wall.x - PlayerScaleXY;
        } else if (vxl < 0 || vxr < 0) {
          x = wall.x + wall.width;
        }
        if (vy > 0) {
          y = wall.x - PlayerScaleXY;
        } else if (vy < 0) {
          y = wall.x + wall.width;
        }
    }
      if (Spr2x < wall.x + wall.width && Spr2x + Spr2formaat > wall.x &&
          Spr2y < wall.y + wall.height && Spr2y + Spr2formaat > wall.y) {
            console.log("Monster collided with wall");
            // Move monster out of collision
            if (richtSpr2X > 0) {
                Spr2x = wall.x - Spr2formaat;
            } else if (richtSpr2X < 0) {
                Spr2x= wall.x + wall.width;
            }
            if (richtSpr2Y > 0) {
                Spr2y = wall.y - Spr2formaat;
            } else if (richtSpr2Y < 0) {
                Spr2y = wall.y + wall.height;
            }
            // Reverse monster's velocity
            richtSpr2X = richtSpr2X * -1;
            richtSpr2Y = richtSpr2Y * -1;
        }
  }
}
setInterval(checkCollision, 1)

function DrawWalls() {
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    ctx.beginPath();
    ctx.fillStyle = "white"; 
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    ctx.closePath();
  }
}
