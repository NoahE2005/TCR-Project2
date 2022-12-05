//maak https://codepen.io/GabbeV/pen/Abzwga

const  Canvas = document.getElementById("Canvas")
const ctx = Canvas.getContext("2d")

const PlayerWalkSpeed = 3; //De speler snelheid
const PlayerColor = 000000;

let x = 0; //X locatie van speler
let y = 0; //Y locatie van speler
let vxl = 0; // de X links "velocity" van speler
let vxr = 0; // de X rechts "velocity" van speler
let vy = 0; // de Y "velocity" van speler

var player = ctx.fillRect(0,0, 0, 0);
var walls = ctx.fillRect(200,200, 200, 200);

function UpdateScreen() {
    ctx.clearRect(0,0, Canvas.width, Canvas.height)
    x += vxl;
    x += vxr;
    y += vy;
    player = ctx.fillRect(x,y, 50, 50)
    ctx.fillStyle = "#" + PlayerColor;
    Walls()
    requestAnimationFrame(UpdateScreen)
}
UpdateScreen()

function Walls () {
    walls = ctx.fillRect(200,200, 200, 200)
    ctx.fillStyle = "#" + PlayerColor;
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