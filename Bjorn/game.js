let character = document.getElementById('character');
let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue
('bottom'));
let characteright = parseInt(window.getComputedStyle(character).getPropertyValue
('right'));
let characterwidth = parseInt(window.getComputedStyle(character).getPropertyValue
('width'));
let ground = document.getElementById('ground');
let groundbottom = parseInt(window.getComputedStyle(ground).getPropertyValue
('bottom'));
let groundheight = parseInt(window.getComputedStyle(ground).getPropertyValue
('height'));
let isjumping = false; 
let upTime;
let downTime;

function jump(){
    if (isjumping) return;
    upTime = setInterval(() => {
        if(characterBottom >= groundheight + 250){
            clearInterval(upTime);
            downTime = setInterval(()=> {
                if (characterBottom <= groundheight + 10){
                    clearInterval(downTime);
                    isjumping = false;
                }
                characterBottom -= 10;
                character.style.bottom = characterBottom + 'px' ;
            }, 20);
        }
        characterBottom += 10;
        character.style.bottom = characterBottom + 'px' ;
        isjumping = true;
    }, 20);
}

function generateObstacle(){
    let obstacles = document.querySelector('.obstacles');
    let obstacle = document.createElement('div');
    obstacle.setAttribute('class', 'obstacle');
    obstacles.appendChild(obstacle);

    let obstacleright = -30;
    let obstaclebottom = 100;
    let obstaclewidth = 30;
    let obstacleheight = Math.floor(Math.random() * 50) + 50;
    obstacle.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}),$
    {Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;

    function moveObstacle(){
        obstacleright += 5;
        obstacle.style.right = obstacleright + 'px';
        obstacle.style.bottom = obstaclebottom + 'px';
        obstacle.style.width = obstaclewidth + 'px';
        obstacle.style.height = obstacleheight + 'px';
        if(characteright >= obstacleright - characterwidth && characteright <=
            obstacleright + obstaclewidth && characterBottom <= obstaclebottom +
            obstacleheight){
                alert('game over');
                clearInterval(obstacleinterval);
                clearTimeout(obstacletimeout);
                location.reload();
            }
    }

    let obstacleinterval = setInterval(moveObstacle, 20);
    let obstacletimeout = setTimeout(generateObstacle, 1000);
        
    }


generateObstacle();

function control(e){
    if (e.key == 'arrowUp' || e.key == ' '){
        jump();
    }
}

document.addEventListener('keydown', control);