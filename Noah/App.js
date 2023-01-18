const  Canvas = document.getElementById("Canvas")
const ctx = Canvas.getContext("2d")
const Character = Canvas.getContext("2d")
const coins = Canvas.getContext("2d")
const Monster = Canvas.getContext("2d")
const Walls = Canvas.getContext("2d")

let PlayerWalkSpeed = 3; //Snelheid van de speler
const PlayerColor = 000000; //Kleur van de speler
const PlayerScaleXY = 20; //Grootte van de speler
const MaxCoins = 8; //Maximaal aantal munten in het spel
const minCoinDistance = 350; //Minimum afstand tussen de munten
const MaxWalls = 150; //Maximaal aantal muren in het spel (alleen als willekeurig)

var Breed = 0;
var Hoog = 0;
var Loading = true;
var Dead = false;

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
var CoinscaleXY = 10; //Slaat de XY grootte van de munten op
var CoinColor = "yellow"; //Slaat de kleur van de munten op

CoinsBegin()
function UpdateScreen() {
  ctx.clearRect(0,0, Canvas.width, Canvas.height) //canvas schoonmaken
  Character.clearRect(0,0, Canvas.width, Canvas.height) //De speler van het canvas verwijderen
    Character.beginPath();
    Character.fillStyle = "white"; //De kleur van de speler
    player = Character.fillRect(x,y, PlayerScaleXY, PlayerScaleXY) //De speler op het canvas toevoegen
    Character.closePath();
    Monster.beginPath();
    Monster.fillStyle = "red"; //De kleur van het monster
    Monster.fillRect(Spr2x, Spr2y, Spr2formaat, Spr2formaat); //De monster op de canvas toevoegen
    Monster.closePath();
    UpdatePlayerLocation();
    DrawWalls();
    Coins();
    requestAnimationFrame(UpdateScreen)
}
setTimeout(UpdateScreen, 1000)
setTimeout(EindLoad, 7000) //7 seconden loaden

function UpdatePlayerLocation() { //De locatie van de speler updaten
  //eerst checken voor collision
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

function CoinsBegin() { // een array van de X en Y locatie van de munten maken
    for (let i = 0; i < MaxCoins; i++) {
        coinlocationsX.push(Math.floor(Math.random() * 1400)) //De willekeurige locatie X van de munten maken
        coinlocationsY.push(Math.floor(Math.random() * 800)) //De willekeurige locatie Y van de munten maken
    }
}


function Coins() {
    for (let i = 0; i < coinlocationsX.length; i++) {
      coins.beginPath();
      coins.fillStyle = CoinColor; //de munten een kleur geven
      coins.fillRect(coinlocationsX.at(i),coinlocationsY.at(i), CoinscaleXY, CoinscaleXY); //de munten op het canvas toevoegen
      coins.closePath();
      for (let i = 0; i < coinlocationsX.length; i++) {
        let coinX = coinlocationsX[i]; //de coinX variable maken
        let coinY = coinlocationsY[i]; //de coinY variable maken
        //Kijken of de munten in een muur zitten
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
      //Een 2de check voor de munten in een muur, en als ze in een muur zitten worden ze uit de muur gehaald
      if (checkCoinWallCollision(coinX, coinY)) {
          coinX = Math.random() * (Canvas.width - 20);
          coinY = Math.random() * (Canvas.height - 20);
      }
  
      //Een check of munten te dichtbij elkaar zijn, als ja worden ze naar een nieuwe locatie gezet
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

function CoinsCollisionCheck() { //een functie om munten op te pakken
  for (let i = 0; i < coinlocationsX.length; i++) {
    if(coinlocationsX.at(i) >= -10 || coinlocationsY.at(i) >= -10) {
  if((coinlocationsX.at(i) + CoinscaleXY) < x ||
   coinlocationsX.at(i) > (x + PlayerScaleXY) ||
    (coinlocationsY.at(i) + CoinscaleXY) < y ||
     coinlocationsY.at(i) > (y + PlayerScaleXY)) {
}
else {
  if(!Loading) { // zorgen dat je geen munten op kan pakken als het spel aan het laden is
  CoinCount = CoinCount + 1; //coin count 1 omhoog
  console.log(CoinCount);
  delete coinlocationsX[i];
  delete coinlocationsY[i];
  UpdateMonsterSpeed(); //de monster sneller maken
  document.getElementById("CoinsCounter").textContent = "Coins: " + CoinCount; //de tekst updaten
  if(CoinCount >= MaxCoins) {
    EndCoin() //kijken of de EndCoin kan spawnen
    if (EndCoinReady) {
      WinScreen()
    }
  }
}
}
}
  }
}
setInterval(CoinsCollisionCheck,3)

//Begin Input
addEventListener('keydown', function (e){ //kijken welke toetsen zijn ingedrukt met een Const voor de snelheid van de speler
  if(!Dead) {
    if(e.code == 'KeyD') vxr = PlayerWalkSpeed;
    if(e.code == 'KeyA') vxl = PlayerWalkSpeed * -1;
    if(e.code == 'KeyS') vy = PlayerWalkSpeed;
    if(e.code == 'KeyW') vy = PlayerWalkSpeed * -1;
  }
  else{
    PlayerWalkSpeed = 0;
    SeesPlayer = false;
  }
})
addEventListener("keyup", function(e) { //de speler stoppen als de toets is los gelaten
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
function EindLoad() { //de functie voor het einde van het loaden
var modal = document.getElementById("modal");
modal.style.visibility = "hidden";
document.getElementById("Canvas").style.animation = "CanvasZoom 2s forward";
document.getElementById("Canvas2").style.animation = "CanvasZoom 2s forward";
document.documentElement.style.setProperty('--Radius',15 + "rem")
document.getElementById("CoinsCounter").textContent = "Coins: 0";
Loading = false;
MonsterCanMove = true;
}
document.documentElement.style.setProperty('--Radius', 3000 + "rem")

//de loading tekst animatie
function LoadingText1() {
  if(Loading) {
  document.getElementById("LoadingText").innerHTML = "Loading.";
  setTimeout(LoadingText2, 1500);
}
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
 let Spr2x = 400; //X locatie van monster
 let Spr2y = 220; //Y locatie van monster
 let MonsterSpeed = 0.5; //De normalen snelheid van monster
 

 var Spr2formaat = 20; //De XY scale van monster
 var telSpr2 = 0;
 var maxSpr2 = 100;
 var richtSpr2X = 1; //De X velocity van monster
 var richtSpr2Y = 1; //De Y velocity van monster
 var SeesPlayer = false; //Boolean om te checken of de speler de monster ziet
 var MonsterCanMove = false;

 function Spr2() {
  if(SeesPlayer) { //Checken of SeesPlayer is True
    //De monster naar de speler bewegen
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
    //Als SeesPlayer False is gaat de monster een willekeurige richting op
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
if(MonsterCanMove) {
     Spr2x += richtSpr2X; //De X locatie van monster updaten
     Spr2y += richtSpr2Y; //De Y locatie van monster updaten
    }
    else{
      richtSpr2X = 0;
      richtSpr2Y = 0;
    }

     if (Spr2x<0) {richtSpr2X = MonsterSpeed;}
     if (Spr2x>Canvas.offsetWidth-Spr2formaat) {richtSpr2X = MonsterSpeed * -1;}
     if (Spr2y<0) {richtSpr2Y = MonsterSpeed;}
     if (Spr2y>Canvas.offsetHeight-Spr2formaat) {richtSpr2Y = MonsterSpeed * -1;}
   }
   setInterval(Spr2, 5)

   function MonstercollisionCheck() { //Kijken of de speler de monster aan het aanraken is
    if((x + PlayerScaleXY) < Spr2x ||
    x > (Spr2x + Spr2formaat) ||
    (y + PlayerScaleXY) < Spr2y ||
    y > (Spr2y + Spr2formaat)) {
      console.log("Not colliding");
    }
    else {
      console.log("colliding")
      document.getElementById("CoinsCounter").textContent = "You died";
      document.getElementById("CoinsCounter").style.color = "red";
      Dead = true;
    }
  }
setInterval(MonstercollisionCheck,5)

function UpdateMonsterSpeed() {
  richtSpr2X = 0;
  richtSpr2Y = 0;
  MonsterSpeed = MonsterSpeed + (CoinCount * 0.05); //De monster sneller maken de hoger dat de CoinCount is
}

 //Monster Eind

 //Maze begin
 const walls = [  
  {x: 100, y: 100, width: 50, height: 50},
  {x: 300, y: 300, width: 50, height: 50},
  {x: 400, y: 400, width: 50, height: 50}
];

walls.push( //De Muren zelf gemaakt
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



function wallsBegin() { //een functie om een willekeurige locatie maken X en Y voor de muren, met een MaxWalls const variable
 for (let i = 0; i < MaxWalls; i++) {
  let RandomX = Math.floor(Math.random() * 1000);
  let RandomY = Math.floor(Math.random() * 800);
  RandomX = Math.round(RandomX / 50)*50;
  RandomY = Math.round(RandomY / 50)*50;
  walls.push({x:RandomX, y:RandomY,width:50, height:50}); 
}
}
//wallsBegin() //Comment verwijderen om doolhof willekeurig later genereren


function checkWallCollision(playerX, playerY, scale) { //Een functie om te kijken of de monster of speler in een muur zitten 
  for (let i = 0; i < walls.length; i++) {
      let wall = walls[i];
      //Kijken of een speler/monster x of y in 1 van de muren x of y zit
      if (playerX + scale > wall.x && playerX < wall.x + wall.width && playerY + scale > wall.y && playerY < wall.y + wall.height) {
          return true;
      }
  }
  return false;
}

function DrawWalls() { //Een functie met een loop om alle muren op het canvas zetten
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    ctx.beginPath();
    ctx.fillStyle = "black"; 
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    ctx.closePath();
  }
}

function checkCoinWallCollision(coinX, coinY) { //Een functie om te kijken of een munt in een muur zit
  for (let i = 0; i < walls.length; i++) {
      let wall = walls[i];
      if (coinX + 20 > wall.x && coinX < wall.x + wall.width && coinY + 20 > wall.y && coinY < wall.y + wall.height) {
        console.log("CoinColidw")
          return true;
      }
  }
  return false;
}
//Maze eind

//Raycast Begin
function doLinesIntersect(x1, y1, x2, y2, x3, y3, x4, y4) { //Functie om te controleren of twee lijnen (de ray en de muur) elkaar snijden
    //Bereken de noemer van het snijpunt
  let denominator = ((x2 - x1) * (y4 - y3)) - ((y2 - y1) * (x4 - x3));
  let numerator1 = ((y1 - y3) * (x4 - x3)) - ((x1 - x3) * (y4 - y3));
  let numerator2 = ((y1 - y3) * (x2 - x1)) - ((x1 - x3) * (y2 - y1));

    //Als de denominator 0 is, dan zijn de lijnen parallel
  if (denominator == 0) {
      //Als ook numerator1 en numerator2 0 zijn, dan liggen de lijnen op elkaar
      return numerator1 == 0 && numerator2 == 0;
  }

    //Bereken de r- en s-waardes van het snijpunt
  let r = numerator1 / denominator;
  let s = numerator2 / denominator;

    //Als r en s tussen 0 en 1 liggen, dan snijden de lijnen elkaar
  return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
}

function checkPlayerAndWalls() { //Functie om te controleren of de speler gezien wordt door het monster
  //Initialiseer de startpositie van de ray (de positie van het monster)
  let rayStartX = Spr2x + Spr2formaat/2;
  let rayStartY = Spr2y + Spr2formaat/2;

  //Initialiseer de eindpositie van de ray (de positie van de speler)
  let rayEndX = x + PlayerScaleXY/2;
  let rayEndY = y + PlayerScaleXY/2;

  for (let i = 0; i < walls.length; i++) { // Controleer of de ray een muur snijdt
      let wall = walls[i];
      if (doLinesIntersect(rayStartX, rayStartY, rayEndX, rayEndY, wall.x, wall.y, wall.x + wall.width, wall.y + wall.height)) {
          SeesPlayer = false; //De SeesPlayer variable naar False veranderen
          break;
      } else {
        if(!Dead) {
          SeesPlayer = true; //De SeesPlayer variable naar True veranderen
        }
          else {
            SeesPlayer = false;
          }
      }
  }
  console.log("seesPlayer: ", SeesPlayer);
}
// Voer de functie elke seconde uit
setInterval(checkPlayerAndWalls, 1000);

//RaycastEind

let EndCoinReady = false
function EndCoin() { //Een functie om de EndCoin te maken
  document.getElementById("CoinsCounter").textContent = "Escape";
  document.getElementById("CoinsCounter").style.color = "red"; //De tekst (coin counter) veranderen
  CoinColor = "green"; //De munten een nieuwe kleur geven
  coinlocationsX.push(Math.floor(Math.random() * 1400)) //De willekeurige locatie X van de munten maken
  coinlocationsY.push(Math.floor(Math.random() * 800)) //De willekeurige locatie Y van de munten maken
  setTimeout(EndCoinReadyToggle, 50)
}

function EndCoinReadyToggle() {
  EndCoinReady = true
}

function WinScreen() {
  MonsterCanMove = false;
  document.getElementById("CoinsCounter").textContent = "You Win";
  document.getElementById("CoinsCounter").style.color = "green";
}
