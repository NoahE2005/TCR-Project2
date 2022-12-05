//https://www.youtube.com/watch?v=kX18GQurDQg&ab_channel=NewTrix (fix met opnieuw kijken)

const  Canvas = document.getElementById("Canvas")
const ctx = Canvas.getContext("2d")

const PlayerWalkSpeed = 5;

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
addEventListener("keydown", function(e){
    if(e.code == 'keyD') vx = PlayerWalkSpeed;
    if(e.code == 'keyA') vx = PlayerWalkSpeed * -1;
    if(e.code == 'keyS') vy = PlayerWalkSpeed;
    if(e.code == 'keyW') vy = PlayerWalkSpeed * -1;
})
addEventListener("keyup", function(e) {
    if(e.code == 'keyD') {
        vx = 0;
    }
    if(e.code == 'keyA') {
        vx = 0;
    }
    if(e.code == 'keyS') {
        vx = 0;
    }
    if(e.code == 'keyW') {
        vx = 0;
    }
})

