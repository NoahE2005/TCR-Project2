//https://www.youtube.com/watch?v=kX18GQurDQg&ab_channel=NewTrix (fix met opnieuw kijken)
//doe nog https://www.youtube.com/watch?v=y1Avl1CscnM&ab_channel=RizedWebDesign
//maak https://codepen.io/GabbeV/pen/Abzwga

const  Canvas = document.getElementById("Canvas")
const ctx = Canvas.getContext("2d")

const PlayerWalkSpeed = 3;

let x = 0;
let y = 0;
let vx = 0;
let vy = 0;

function UpdateScreen() {
    ctx.clearRect(0,0, Canvas.width, Canvas.height)
    x += vx;
    y += vy;
    ctx.fillRect(x,y, 50, 50)
    requestAnimationFrame(UpdateScreen)
}
UpdateScreen()

//Input
addEventListener('keydown', function (e){
    if(e.code == 'KeyD') vx = PlayerWalkSpeed;
    if(e.code == 'KeyA') vx = PlayerWalkSpeed * -1;
    if(e.code == 'KeyS') vy = PlayerWalkSpeed;
    if(e.code == 'KeyW') vy = PlayerWalkSpeed * -1;
})
addEventListener("keyup", function(e) {
    if(e.code == 'KeyD') vx = 0;
    if(e.code == 'KeyA') vx = 0;
    if(e.code == 'KeyS') vy = 0;
    if(e.code == 'KeyW') vy = 0;
})

