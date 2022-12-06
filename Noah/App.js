//maak https://codepen.io/GabbeV/pen/Abzwga
// https://www.the-art-of-web.com/javascript/maze-generator/
//https://stackoverflow.com/questions/2440377/javascript-collision-detection
//https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics

//https://www.google.nl/search?q=javascript+game+maze+generator&sxsrf=ALiCzsZGoyiaBb3uqTkY0tindzcRN_JrqA%3A1670324189364&ei=3R-PY73PFeyP9u8P3-upyAQ&oq=Javascript+game+maze+ge&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQARgAMgUIIRCgATIFCCEQoAEyBQghEKABMggIIRAWEB4QHTIICCEQFhAeEB0yCAghEBYQHhAdMggIIRAWEB4QHTIICCEQFhAeEB0yCgghEBYQHhAPEB0yCgghEBYQHhAPEB06CggAEEcQ1gQQsAM6BggAEBYQHkoECEEYAEoECEYYAFCiAljKBWDaEGgBcAF4AIABlgGIAbUCkgEDMi4xmAEAoAEByAEIwAEB&sclient=gws-wiz-serp
//https://www.google.nl/search?q=javascript+game+collision+detection&sxsrf=ALiCzsZ9NYk6xQLOpbhnkXqobwPWaY256A%3A1670324152098&source=hp&ei=uB-PY_SqA4LtsAectYzgBQ&iflsig=AJiK0e8AAAAAY48tyEwHazw1f87AaKQuVwq9C93CI_N3&oq=Javasc&gs_lcp=Cgdnd3Mtd2l6EAEYADIECCMQJzIECCMQJzIECCMQJzIECAAQQzIECAAQQzIKCAAQsQMQgwEQQzIECAAQQzIECAAQQzIKCAAQsQMQgwEQQzIKCAAQsQMQgwEQQzoECAAQAzoICAAQsQMQgwE6CwgAEIAEELEDEIMBUABY9AdgjRNoAHAAeACAAWSIAfIDkgEDNS4xmAEAoAEB&sclient=gws-wiz

const  Canvas = document.getElementById("Canvas")
const ctx = Canvas.getContext("2d")
const coins = Canvas.getContext("2d")

const PlayerWalkSpeed = 3; //De speler snelheid
const PlayerColor = 000000;
const MaxCoints = 8;

let x = 0; //X locatie van speler
let y = 0; //Y locatie van speler
let vxl = 0; // de X links "velocity" van speler
let vxr = 0; // de X rechts "velocity" van speler
let vy = 0; // de Y "velocity" van speler

var player = ctx.fillRect(0,0, 0, 0);
var walls = ctx.fillRect(200,200, 200, 200);
var CoinCount = 0;
var coinlocationsX = [];
var coinlocationsY = [];

CoinsBegin()
function UpdateScreen() {
    ctx.clearRect(0,0, Canvas.width, Canvas.height)
    x += vxl;
    x += vxr;
    y += vy;
    player = ctx.fillRect(x,y, 50, 50)
    ctx.fillStyle = "#" + PlayerColor;
    Walls()
    Coins()
    requestAnimationFrame(UpdateScreen)
}
UpdateScreen()

function Walls() {
    walls = ctx.fillRect(200,200, 200, 200)
    ctx.fillStyle = "#" + PlayerColor;
}

function CoinsBegin() {
    for (let i = 0; i < MaxCoints; i++) {
        coinlocationsX.push(Math.floor(Math.random() * 500))
        coinlocationsY.push(Math.floor(Math.random() * 500))
    }
}

function Coins() {
    for (let i = 0; i < MaxCoints; i++) {
        ctx.fillRect(500,500, 30, 30, "yellow")
    }
}

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
    let ALeftB = (a.x + a.width) < b.x;
    let ARightB = a.x > (b.x + b.width);
    let AaboveB = (a.y + a.height) < b.y;
    let AbelowB = a.y > (b.y + b.height)
           
alert ("Test success")

    return !(ALeftB || ARightB || AaboveB || AbelowB)
}



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

//Eind Maze