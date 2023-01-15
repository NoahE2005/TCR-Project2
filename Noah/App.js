
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

const PlayerWalkSpeed = 3; //Snelheid van de speler
const PlayerColor = 000000; //Kleur van de speler
const PlayerScaleXY = 20; //Grootte van de speler
const MaxCoins = 8; //Maximaal aantal munten in het spel
const minCoinDistance = 350; //Minimum afstand tussen de munten
const MaxWalls = 150; //Maximaal aantal muren in het spel (alleen als willekeurig)

var Breed = 0;
var Hoog = 0;
var Loading = true;

let x = 50; //X locatie van speler
let y = 50; //Y locatie van speler
let vxl = 0; // de X links "velocity" van speler
let vxr = 0; // de X rechts "velocity" van speler
let vy = 0; // de Y "velocity" van speler

var player = Character.fillRect(0,0, 0, 0); //Tekent de speler op het canvas
var CoinsRef = coins.fillRect(0,0, 0, 0); //Tekent de munten op het canvas
var CoinCount = 0; //Houdt bij hoeveel munten de speler verzameld heeft
var coinlocationsX = []; //Slaat X-locaties van munten op
var coinlocationsY = []; //Slaat Y-locaties van munten op
var CoinscaleXY = 10;
var CoinColor = "yellow";

CoinsBegin()
function UpdateScreen() {
  var Breed = Canvas.offsetWidth - PlayerScaleXY;
  var Hoog = Canvas.offsetWidth - PlayerScaleXY;
  ctx.clearRect(0,0, Canvas.width, Canvas.height)
  Character.clearRect(0,0, Canvas.width, Canvas.height)
    Character.beginPath();
    Character.fillStyle = "white";
    player = Character.fillRect(x,y, PlayerScaleXY, PlayerScaleXY)
    Character.closePath();
    Monster.beginPath();
    Monster.fillStyle = "red"; // kleur spr2
    Monster.fillRect(Spr2x, Spr2y, Spr2formaat, Spr2formaat);
    Monster.closePath();
    UpdatePlayerLocation()
    DrawWalls()
    Coins();
    requestAnimationFrame(UpdateScreen)
}
setTimeout(UpdateScreen, 1000)
setTimeout(EindLoad, 3000)

function UpdatePlayerLocation() {
  if (checkWallCollision(x + vxl, y + vy, PlayerScaleXY)) {
    vxl = 0;
  }
  if (checkWallCollision(x + vxr, y + vy, PlayerScaleXY )) {
    vxr = 0;
  }
  if (checkWallCollision(x + vxl + vxr, y + vy, PlayerScaleXY)) {
    vy = 0;
  }
  x += vxl;
  x += vxr;
  y += vy;
}

function CoinsBegin() {
    for (let i = 0; i < MaxCoins; i++) {
        coinlocationsX.push(Math.floor(Math.random() * 1400)) //De willekeurige locatie X van de munten maken
        coinlocationsY.push(Math.floor(Math.random() * 800)) //De willekeurige locatie Y van de munten maken
    }
}


function Coins() {
    for (let i = 0; i < coinlocationsX.length; i++) {
      coins.beginPath();
      coins.fillStyle = CoinColor; 
      coins.fillRect(coinlocationsX.at(i),coinlocationsY.at(i), CoinscaleXY, CoinscaleXY)
      coins.closePath();
      for (let i = 0; i < coinlocationsX.length; i++) {
        let coinX = coinlocationsX[i];
        let coinY = coinlocationsY[i];
        // Check if coin collides with a wall, if so, move the coin out of the wall
        if (checkCoinWallCollision(coinX, coinY)) {
            coinX = Math.random() * (Canvas.width - 20);
            coinY = Math.random() * (Canvas.height - 20);
        }
        coinlocationsX[i] = coinX;
        coinlocationsY[i] = coinY;
      }
    }
    for (let i = 0; i < coinlocationsX.length; i++) {
      let coinX = coinlocationsX[i];
      let coinY = coinlocationsY[i];
      // Check if coin collides with a wall, if so, move the coin out of the wall
      if (checkCoinWallCollision(coinX, coinY)) {
          coinX = Math.random() * (Canvas.width - 20);
          coinY = Math.random() * (Canvas.height - 20);
      }
  
      // Check if coin is too close to other coins, if so, move the coin to a new location
      for (let j = 0; j < coinlocationsX.length; j++) {
          if (i !== j) {
              let otherCoinX = coinlocationsX[j];
              let otherCoinY = coinlocationsY[j];
              let distance = Math.sqrt(Math.pow(coinX - otherCoinX, 2) + Math.pow(coinY - otherCoinY, 2));
              if (distance < minCoinDistance) {
                  coinX = Math.random() * (Canvas.width - 20);
                  coinY = Math.random() * (Canvas.height - 20);
              }
          }
      }
  
      coinlocationsX[i] = coinX;
      coinlocationsY[i] = coinY;
  }
}

function CoinsCollisionCheck() {
  for (let i = 0; i < coinlocationsX.length; i++) {
    if(coinlocationsX.at(i) >= -10 || coinlocationsY.at(i) >= -10) {
  if((coinlocationsX.at(i) + CoinscaleXY) < x ||
   coinlocationsX.at(i) > (x + PlayerScaleXY) ||
    (coinlocationsY.at(i) + CoinscaleXY) < y ||
     coinlocationsY.at(i) > (y + PlayerScaleXY)) {
}
else {
  if(!Loading) {
  CoinCount = CoinCount + 1;
  console.log(CoinCount);
  delete coinlocationsX[i];
  delete coinlocationsY[i];
  UpdateMonsterSpeed();
  document.getElementById("CoinsCounter").textContent = "Coins: " + CoinCount;
  if(CoinCount >= MaxCoins) {
    EndCoin()
    if (EndCoinReady) {
      document.getElementById("CoinsCounter").textContent = "You Win";
      document.getElementById("CoinsCounter").style.color = "green";
    }
  }
}
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
})
addEventListener("keyup", function(e) {
    if(e.code == 'KeyD') vxr = 0;
    if(e.code == 'KeyA') vxl = 0;
    if(e.code == 'KeyS') vy = 0;
    if(e.code == 'KeyW') vy = 0;
})



function OuterWallCollision() { //Een Collision check voor de grootte van de canvas zelf
  var breed = Canvas.offsetWidth - PlayerScaleXY; //breedte van canvassd

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

//Begin Modal

//Begin Loading
function EindLoad() {
var modal = document.getElementById("modal");
modal.classList.remove("activemodal");
document.getElementById("Canvas").style.animation = "CanvasZoom 2s forward";
document.getElementById("Canvas2").style.animation = "CanvasZoom 2s forward";
document.documentElement.style.setProperty('--Radius',15 + "rem")
Loading = false;
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
 var SeesPlayer = false;

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
    if (checkWallCollision(Spr2x + richtSpr2X, Spr2y + richtSpr2Y, Spr2formaat)) {
      richtSpr2X = 0;
  }
    if (checkWallCollision(Spr2x + richtSpr2X, Spr2y + richtSpr2Y, Spr2formaat)) {
      richtSpr2Y = 0;
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

 //Maze begin
 const walls = [  
  {x: 100, y: 100, width: 50, height: 50},
  {x: 300, y: 300, width: 50, height: 50},
  {x: 400, y: 400, width: 50, height: 50}
];

walls.push(
  {x: 100, y: 150, width: 50, height: 50},
  {x: 150, y: 150, width: 50, height: 50},
  {x: 200, y: 150, width: 50, height: 50},
  {x: 300, y: 150, width: 50, height: 50},
  {x: 350, y: 150, width: 50, height: 50},
  {x: 200, y: 250, width: 50, height: 50},
  {x: 200, y: 50, width: 50, height: 50},
  {x: 150, y: 0, width: 50, height: 50},
  {x: 100, y: 0, width: 50, height: 50},
  {x: 200, y: 0, width: 50, height: 50},
  {x: 150, y: 0, width: 50, height: 50},
  {x: 100, y: 0, width: 50, height: 50},
  {x: 50, y: 0, width: 50, height: 50},
  {x: 0, y: 0, width: 50, height: 50},
  {x: 0, y: 50, width: 50, height: 50},
  {x: 0, y: 100, width: 50, height: 50},
  {x: 0, y: 150, width: 50, height: 50},
  {x: 0, y: 200, width: 50, height: 50},
  {x: 0, y: 250, width: 50, height: 50},
  {x: 0, y: 300, width: 50, height: 50},
  {x: 0, y: 350, width: 50, height: 50},
  {x: 50, y: 250, width: 50, height: 50},
  {x: 50, y: 300, width: 50, height: 50},
  {x: 100, y: 250, width: 50, height: 50},
  {x: 200, y: 300, width: 50, height: 50},
  {x: 200, y: 350, width: 50, height: 50},
  {x: 150, y: 350, width: 50, height: 50},
  {x: 150, y: 400, width: 50, height: 50},
  {x: 100, y: 400, width: 50, height: 50},
  {x: 50, y: 450, width: 50, height: 50},
  {x: 100, y: 450, width: 50, height: 50},
  {x: 50, y: 500, width: 50, height: 50},
  {x: 50, y: 550, width: 50, height: 50},
  {x: 50, y: 600, width: 50, height: 50},
  {x: 50, y: 700, width: 50, height: 50},
  {x: 100, y: 700, width: 50, height: 50},
  {x: 100, y: 600, width: 50, height: 50},
  {x: 100, y: 750, width: 50, height: 50},
  {x: 150, y: 700, width: 50, height: 50},
  {x: 200, y: 700, width: 50, height: 50},
  {x: 250, y: 700, width: 50, height: 50},
  {x: 250, y: 650, width: 50, height: 50},
  {x: 250, y: 550, width: 50, height: 50},
  {x: 200, y: 550, width: 50, height: 50},
  {x: 100, y: 550, width: 50, height: 50},
  {x: 100, y: 500, width: 50, height: 50},
  {x: 200, y: 500, width: 50, height: 50},
  {x: 250, y: 500, width: 50, height: 50},
  {x: 300, y: 500, width: 50, height: 50},
  {x: 350, y: 500, width: 50, height: 50},
  {x: 450, y: 500, width: 50, height: 50},
  {x: 550, y: 500, width: 50, height: 50},
  {x: 350, y: 400, width: 50, height: 50},
  {x: 300, y: 400, width: 50, height: 50},
  {x: 200, y: 400, width: 50, height: 50},
  {x: 300, y: 350, width: 50, height: 50},
  {x: 300, y: 250, width: 50, height: 50},
  {x: 350, y: 250, width: 50, height: 50},
  {x: 400, y: 250, width: 50, height: 50},
  {x: 450, y: 250, width: 50, height: 50},
  {x: 450, y: 300, width: 50, height: 50},
  {x: 300, y: 100, width: 50, height: 50},
  {x: 300, y: 50, width: 50, height: 50},
  {x: 350, y: 50, width: 50, height: 50},
  {x: 400, y: 50, width: 50, height: 50},
  {x: 500, y: 50, width: 50, height: 50},
  {x: 500, y: 100, width: 50, height: 50},
  {x: 500, y: 150, width: 50, height: 50},
  {x: 450, y: 150, width: 50, height: 50},
  {x: 400, y: 150, width: 50, height: 50},
  {x: 600, y: 50, width: 50, height: 50},
  {x: 600, y: 0, width: 50, height: 50},
  {x: 600, y: 50, width: 50, height: 50},
  {x: 550, y: 150, width: 50, height: 50},
  {x: 600, y: 150, width: 50, height: 50},
  {x: 650, y: 150, width: 50, height: 50},
  {x: 700, y: 150, width: 50, height: 50},
  {x: 700, y: 50, width: 50, height: 50},
  {x: 750, y: 50, width: 50, height: 50},
  {x: 800, y: 50, width: 50, height: 50},
  {x: 850, y: 50, width: 50, height: 50},
  {x: 800, y: 100, width: 50, height: 50},
  {x: 800, y: 150, width: 50, height: 50},
  {x: 800, y: 250, width: 50, height: 50},
  {x: 800, y: 200, width: 50, height: 50},
  {x: 500, y: 250, width: 50, height: 50},
  {x: 550, y: 250, width: 50, height: 50},
  {x: 650, y: 250, width: 50, height: 50},
  {x: 650, y: 300, width: 50, height: 50},
  {x: 650, y: 350, width: 50, height: 50},
  {x: 600, y: 350, width: 50, height: 50},
  {x: 550, y: 350, width: 50, height: 50},
  {x: 550, y: 400, width: 50, height: 50},
  {x: 500, y: 500, width: 50, height: 50},
  {x: 500, y: 550, width: 50, height: 50},
  {x: 500, y: 600, width: 50, height: 50},
  {x: 450, y: 600, width: 50, height: 50},
  {x: 400, y: 600, width: 50, height: 50},
  {x: 400, y: 650, width: 50, height: 50},
  {x: 400, y: 700, width: 50, height: 50},
  {x: 400, y: 750, width: 50, height: 50},
  {x: 350, y: 600, width: 50, height: 50},
  {x: 350, y: 700, width: 50, height: 50},
  {x: 450, y: 700, width: 50, height: 50},
  {x: 450, y: 650, width: 50, height: 50},
  {x: 500, y: 650, width: 50, height: 50},
  {x: 500, y: 700, width: 50, height: 50},
  {x: 600, y: 700, width: 50, height: 50},
  {x: 650, y: 700, width: 50, height: 50},
  {x: 700, y: 700, width: 50, height: 50},
  {x: 600, y: 650, width: 50, height: 50},
  {x: 600, y: 600, width: 50, height: 50},
  {x: 650, y: 600, width: 50, height: 50},
  {x: 650, y: 550, width: 50, height: 50},
  {x: 650, y: 500, width: 50, height: 50},
  {x: 650, y: 450, width: 50, height: 50},
  {x: 650, y: 400, width: 50, height: 50},
  {x: 700, y: 250, width: 50, height: 50},
  {x: 800, y: 300, width: 50, height: 50},
  {x: 800, y: 350, width: 50, height: 50},
  {x: 750, y: 350, width: 50, height: 50},
  {x: 750, y: 400, width: 50, height: 50},
  {x: 750, y: 500, width: 50, height: 50},
  {x: 750, y: 550, width: 50, height: 50},
  {x: 750, y: 600, width: 50, height: 50},
  {x: 800, y: 600, width: 50, height: 50},
  {x: 800, y: 650, width: 50, height: 50},
  {x: 800, y: 700, width: 50, height: 50},
  {x: 800, y: 750, width: 50, height: 50},
  {x: 850, y: 600, width: 50, height: 50},
  {x: 900, y: 600, width: 50, height: 50},
  {x: 950, y: 600, width: 50, height: 50},
  {x: 1000, y: 600, width: 50, height: 50},
  {x: 1000, y: 550, width: 50, height: 50},
  {x: 1000, y: 500, width: 50, height: 50},
  {x: 1000, y: 450, width: 50, height: 50},
  {x: 1000, y: 400, width: 50, height: 50},
  {x: 1000, y: 350, width: 50, height: 50},
  {x: 950, y: 350, width: 50, height: 50},
  {x: 900, y: 350, width: 50, height: 50},
  {x: 900, y: 300, width: 50, height: 50},
  {x: 900, y: 250, width: 50, height: 50},
  {x: 900, y: 150, width: 50, height: 50},
  {x: 950, y: 150, width: 50, height: 50},
  {x: 950, y: 100, width: 50, height: 50},
  {x: 950, y: 50, width: 50, height: 50},
  {x: 950, y: 0, width: 50, height: 50},
  {x: 950, y: 250, width: 50, height: 50},
  {x: 1000, y: 250, width: 50, height: 50},
  {x: 1100, y: 250, width: 50, height: 50},
  {x: 1100, y: 300, width: 50, height: 50},
  {x: 1100, y: 350, width: 50, height: 50},
  {x: 1100, y: 400, width: 50, height: 50},
  {x: 1100, y: 500, width: 50, height: 50},
  {x: 1100, y: 550, width: 50, height: 50},
  {x: 1100, y: 600, width: 50, height: 50},
  {x: 1100, y: 650, width: 50, height: 50},
  {x: 1100, y: 700, width: 50, height: 50},
  {x: 1100, y: 800, width: 50, height: 50},
  {x: 1150, y: 700, width: 50, height: 50},
  {x: 1200, y: 700, width: 50, height: 50},
  {x: 1250, y: 650, width: 50, height: 50},
  {x: 1300, y: 650, width: 50, height: 50},
  {x: 1400, y: 650, width: 50, height: 50},
  {x: 1400, y: 600, width: 50, height: 50},
  {x: 1400, y: 700, width: 50, height: 50},
  {x: 1400, y: 750, width: 50, height: 50},
  {x: 1350, y: 750, width: 50, height: 50},
  {x: 1300, y: 750, width: 50, height: 50},
  {x: 1200, y: 650, width: 50, height: 50},
  {x: 1000, y: 700, width: 50, height: 50},
  {x: 1000, y: 650, width: 50, height: 50},
  {x: 900, y: 700, width: 50, height: 50},
  {x: 900, y: 750, width: 50, height: 50},
  {x: 1350, y: 550, width: 50, height: 50},
  {x: 1400, y: 550, width: 50, height: 50},
  {x: 1300, y: 550, width: 50, height: 50},
  {x: 1200, y: 550, width: 50, height: 50},
  {x: 1200, y: 500, width: 50, height: 50},
  {x: 1200, y: 400, width: 50, height: 50},
  {x: 1200, y: 350, width: 50, height: 50},
  {x: 1200, y: 450, width: 50, height: 50},
  {x: 1250, y: 350, width: 50, height: 50},
  {x: 1250, y: 450, width: 50, height: 50},
  {x: 1300, y: 450, width: 50, height: 50},
  {x: 1350, y: 450, width: 50, height: 50},
  {x: 1350, y: 350, width: 50, height: 50},
  {x: 1400, y: 350, width: 50, height: 50},
  {x: 1400, y: 300, width: 50, height: 50},
  {x: 1400, y: 250, width: 50, height: 50},
  {x: 1400, y: 200, width: 50, height: 50},
  {x: 1350, y: 200, width: 50, height: 50},
  {x: 1300, y: 200, width: 50, height: 50},
  {x: 1250, y: 200, width: 50, height: 50},
  {x: 1200, y: 200, width: 50, height: 50},
  {x: 1150, y: 150, width: 50, height: 50},
  {x: 1200, y: 150, width: 50, height: 50},
  {x: 1050, y: 150, width: 50, height: 50},
  {x: 1050, y: 100, width: 50, height: 50},
  {x: 1050, y: 50, width: 50, height: 50},
  {x: 1050, y: 0, width: 50, height: 50},
  {x: 1150, y: 100, width: 50, height: 50},
  {x: 1150, y: 0, width: 50, height: 50},
  {x: 1350, y: 50, width: 50, height: 50},
  {x: 1350, y: 100, width: 50, height: 50},
  {x: 1300, y: 50, width: 50, height: 50},
  {x: 1300, y: 100, width: 50, height: 50},
  {x: 1250, y: 50, width: 50, height: 50},
  {x: 0, y: 800, width: 5000, height: 50},
  )



function wallsBegin() {
 for (let i = 0; i < MaxWalls; i++) {
  let RandomX = Math.floor(Math.random() * 1000);
  let RandomY = Math.floor(Math.random() * 800);
  RandomX = Math.round(RandomX / 50)*50;
  RandomY = Math.round(RandomY / 50)*50;
  walls.push({x:RandomX, y:RandomY,width:50, height:50}); 
}
}
//wallsBegin() //Comment verwijderen om doolhof willekeurig later genereren



// Function to check if player collides with a wall
function checkWallCollision(playerX, playerY, scale) {
  for (let i = 0; i < walls.length; i++) {
      let wall = walls[i];
      // Check if player's x and y positions intersect with the wall's x and y positions
      if (playerX + scale > wall.x && playerX < wall.x + wall.width && playerY + scale > wall.y && playerY < wall.y + wall.height) {
          return true;
      }
  }
  return false;
}

function DrawWalls() {
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    ctx.beginPath();
    ctx.fillStyle = "black"; 
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    ctx.closePath();
  }
}

// Function to check if a coin collides with a wall
function checkCoinWallCollision(coinX, coinY) {
  for (let i = 0; i < walls.length; i++) {
      let wall = walls[i];
      // Check if coin's x and y positions intersect with the wall's x and y positions
      if (coinX + 20 > wall.x && coinX < wall.x + wall.width && coinY + 20 > wall.y && coinY < wall.y + wall.height) {
        console.log("CoinColidw")
          return true;
      }
  }
  return false;
}




//Maze eind

//Raycast Begin
function doLinesIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  let denominator = ((x2 - x1) * (y4 - y3)) - ((y2 - y1) * (x4 - x3));
  let numerator1 = ((y1 - y3) * (x4 - x3)) - ((x1 - x3) * (y4 - y3));
  let numerator2 = ((y1 - y3) * (x2 - x1)) - ((x1 - x3) * (y2 - y1));

  if (denominator == 0) {
      return numerator1 == 0 && numerator2 == 0;
  }

  let r = numerator1 / denominator;
  let s = numerator2 / denominator;

  return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
}

function checkPlayerAndWalls() {
  // Initialize starting point of the ray (the monster's position)
  let rayStartX = Spr2x + Spr2formaat/2;
  let rayStartY = Spr2y + Spr2formaat/2;

  // Initialize end point of the ray (the player's position)
  let rayEndX = x + PlayerScaleXY/2;
  let rayEndY = y + PlayerScaleXY/2;

  for (let i = 0; i < walls.length; i++) {
      let wall = walls[i];
      if (doLinesIntersect(rayStartX, rayStartY, rayEndX, rayEndY, wall.x, wall.y, wall.x + wall.width, wall.y + wall.height)) {
          SeesPlayer = false;
          break;
      } else {
          SeesPlayer = true;
      }
  }
  console.log("seesPlayer: ", SeesPlayer);
}
setInterval(checkPlayerAndWalls, 1000);

//RaycastEind

let EndCoinReady = false
function EndCoin() {
  document.getElementById("CoinsCounter").textContent = "Escape";
  document.getElementById("CoinsCounter").style.color = "red";
  CoinColor = "green";
  coinlocationsX.push(Math.floor(Math.random() * 1400)) //De willekeurige locatie X van de munten maken
  coinlocationsY.push(Math.floor(Math.random() * 800)) //De willekeurige locatie Y van de munten maken
  setTimeout(EndCoinReadyToggle, 50)
}

function EndCoinReadyToggle() {
  EndCoinReady = true
}