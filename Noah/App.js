//maak https://codepen.io/GabbeV/pen/Abzwga
// https://www.the-art-of-web.com/javascript/maze-generator/
//https://stackoverflow.com/questions/2440377/javascript-collision-detection
//https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics

//https://www.google.nl/search?q=javascript+game+maze+generator&sxsrf=ALiCzsZGoyiaBb3uqTkY0tindzcRN_JrqA%3A1670324189364&ei=3R-PY73PFeyP9u8P3-upyAQ&oq=Javascript+game+maze+ge&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQARgAMgUIIRCgATIFCCEQoAEyBQghEKABMggIIRAWEB4QHTIICCEQFhAeEB0yCAghEBYQHhAdMggIIRAWEB4QHTIICCEQFhAeEB0yCgghEBYQHhAPEB0yCgghEBYQHhAPEB06CggAEEcQ1gQQsAM6BggAEBYQHkoECEEYAEoECEYYAFCiAljKBWDaEGgBcAF4AIABlgGIAbUCkgEDMi4xmAEAoAEByAEIwAEB&sclient=gws-wiz-serp
//https://www.google.nl/search?q=javascript+game+collision+detection&sxsrf=ALiCzsZ9NYk6xQLOpbhnkXqobwPWaY256A%3A1670324152098&source=hp&ei=uB-PY_SqA4LtsAectYzgBQ&iflsig=AJiK0e8AAAAAY48tyEwHazw1f87AaKQuVwq9C93CI_N3&oq=Javasc&gs_lcp=Cgdnd3Mtd2l6EAEYADIECCMQJzIECCMQJzIECCMQJzIECAAQQzIECAAQQzIKCAAQsQMQgwEQQzIECAAQQzIECAAQQzIKCAAQsQMQgwEQQzIKCAAQsQMQgwEQQzoECAAQAzoICAAQsQMQgwE6CwgAEIAEELEDEIMBUABY9AdgjRNoAHAAeACAAWSIAfIDkgEDNS4xmAEAoAEB&sclient=gws-wiz

//https://www.youtube.com/watch?v=nHjqkLV_Tp0&ab_channel=ConorBailey

const  Canvas = document.getElementById("Canvas")
const ctx = Canvas.getContext("2d")
const Character = Canvas.getContext("2d")
const coins = Canvas.getContext("2d")

const PlayerWalkSpeed = 3; //De speler snelheid
const PlayerColor = 000000;
const MaxCoints = 8;

let x = 0; //X locatie van speler
let y = 0; //Y locatie van speler
let vxl = 0; // de X links "velocity" van speler
let vxr = 0; // de X rechts "velocity" van speler
let vy = 0; // de Y "velocity" van speler

var player = Character.fillRect(0,0, 0, 0);
var walls = ctx.fillRect(200,200, 200, 200);
var CoinsRef = coins.fillRect(0,0, 0, 0);
var CoinCount = 0;
var coinlocationsX = [];
var coinlocationsY = [];

CoinsBegin()
function UpdateScreen() {
    ctx.clearRect(0,0, Canvas.width, Canvas.height)
    Character.clearRect(0,0, Canvas.width, Canvas.height)
    x += vxl;
    x += vxr;
    y += vy;
    ctx.beginPath();
    player = Character.fillRect(x,y, 50, 50)
    player = Character.fillStyle = "black";
    ctx.beginPath();
    Walls()
    Coins()
    requestAnimationFrame(UpdateScreen)
}
UpdateScreen()

function Walls() {
    walls = ctx.fillRect(200,200, 200, 200)
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.closePath();
}

function CoinsBegin() {
    for (let i = 0; i < MaxCoints; i++) {
        coinlocationsX.push(Math.floor(Math.random() * 500))
        coinlocationsY.push(Math.floor(Math.random() * 500))
    }
}

function Coins() {
    for (let i = 0; i < MaxCoints; i++) {
      coins.beginPath();
        coins.fillRect(500,500, 30, 30)
        coins.fillStyle = "white"; //fix
        coins.closePath();
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
/** Helper function for better responsiveness and animation. */
function whileAsync(cond, body, chunkSize, period) {
    var chunkSize = chunkSize || 10;
    var period = period || 0;
    return new Promise(function(resolve, reject){
      var interval = setInterval(function() {
        for (var k = 0; k < chunkSize; k++) {
          if (!cond()) {
            clearInterval(interval);
            resolve();
            return;
          }
          body();
       }
      }, period);
    });
  }
  
  /** Adds a CSS class for a short time. */
  function addEphemeralClass(element, className, duration) {
    var duration = duration || 1000;
    element.classList.add(className);
    setTimeout(function() {
      element.classList.remove(className);
    }, duration);
  }
  
  /** A simple point or pair. */
  function Point(x, y) {
    this.x = parseInt(x);
    this.y = parseInt(y);
  }
  
  Point.prototype.equals = function(other) {
    return other.x == this.x && other.y == this.y;
  }
  
  /** Allows for using the point as a key in a set. */
  Point.prototype.serialize = function() {
    return JSON.stringify([this.x, this.y]);
  }
  
  /** Checks if the point is inside bounds. */
  Point.prototype.insideBounds = function(bounds) {
    return (
        (this.x >= 0 && this.x < bounds.x) &&
        (this.y >= 0 && this.y < bounds.y));
  }
  
  /** Creates a new point offset by the delta. */
  Point.prototype.offset = function(delta) {
    return new Point(this.x + parseInt(delta[0]), this.y + parseInt(delta[1]));
  }
  
  /** The main game object. */
  function Maze(options) {
    var options = Object.assign({
      gridElement: document.getElementById('body'),
      gridSize: new Point(20, 10),
      startPosition: new Point(0, 0),
      targetPosition: null,
      blockSize: 25,
      onSolved: function() {},
    }, options || {});
  
    this.gridElement = options.gridElement;
    this.blockSize = options.blockSize;
    this.onSolved = options.onSolved;
    this.bounds = options.gridSize;
    this.startPosition = options.startPosition
    this.targetPosition =  options.targetPosition || this.bounds.offset([-1, -1]);
  
    this.sides = ['bottom', 'right', 'top', 'left'];
    this.oppositeSides = ['top', 'left', 'bottom', 'right'];
    this.delta = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    this.keyCodeDirMap = {37: 'left', 38: 'top', 39: 'right', 40: 'bottom'};
  
    this.blocks = new Array(this.bounds.y);
    for (var i = 0; i < this.bounds.y; i++) {
      this.blocks[i] = new Array(this.bounds.x);
    }
  
    var self = this;
    document.onkeydown = function(e) {
      if (self.solving || self.solved) {
        return;
      }
      if (e.keyCode in self.keyCodeDirMap) {
        self.movePlayer(self.keyCodeDirMap[e.keyCode]);
        e.preventDefault();
      }
    };
  }
  
  /** Creates a single block and sets its position. */
  Maze.prototype.createBlock = function(p) {
    var block = document.createElement('div');
    block.classList.add('block');
    block.style.left = (p.x * this.blockSize) + 'px';
    block.style.top = (p.y * this.blockSize) + 'px';
    block.open = {left: false, top: false, bottom: false, right: false};
    return block;
  }
  
  /** Fetches a block by a given position. */
  Maze.prototype.getBlock = function(point) {
    return this.blocks[point.y][point.x];
  }
  
  /** Fetches the player's position block. */
  Maze.prototype.getPlayerBlock = function() {
    return this.getBlock(this.position);
  }
  
  /** Resets the game. */
  Maze.prototype.reset = function() {
    if (this.solving || this.reseting) {
      return false;
    }
  
    this.reseting = true;
    this.position = this.startPosition;
    this.solving = false;
    this.solved = false;
  
    while (this.gridElement.firstChild) {
      this.gridElement.removeChild(this.gridElement.firstChild);
    }
  
    var fragment = document.createDocumentFragment();
    for (var x = 0; x < this.bounds.x; x++) {
      for (var y = 0; y < this.bounds.y; y++) {
        var block = this.createBlock(new Point(x, y), 25);
        this.blocks[y][x] = block;
        fragment.appendChild(block);
      }
    }
    this.gridElement.appendChild(fragment);
  
    this.getBlock(this.targetPosition).classList.add('target');
  
    var self = this;
    return this.generate().then(function() {
      self.setPlayerPosition(self.startPosition);
      self.reseting = false;
    })
  }
  
  /** Gets the valid adjacent points which were not visited. */
  Maze.prototype.getAdjacents = function(point, visitedSet) {
    var adjacents = [];
    for (var i = 0; i < this.delta.length; i++) {
      var cp = point.offset(this.delta[i]);
      // We add the direction information w.r.t. the original point.
      cp.side = this.sides[i];
      cp.oppositeSide = this.oppositeSides[i];
      if (cp.insideBounds(this.bounds) && !visitedSet.has(cp.serialize())) {
        adjacents.push(cp);
      }
    }
    return adjacents;
  }
  
  /** Moves the player to the specified direction (top, left, right, bottom). */
  Maze.prototype.movePlayer = function(direction) {
    var currentBlock = this.getPlayerBlock();
    var delta = this.delta[this.sides.indexOf(direction)];
    var nextPosition = this.position.offset(delta);
  
    if (!nextPosition.insideBounds(this.bounds)) {
      addEphemeralClass(currentBlock, 'error', 100);
      return;
    }
  
    if (!currentBlock.open[direction]) {
      addEphemeralClass(currentBlock, 'error', 100);
      return;
    }
  
    this.setPlayerPosition(nextPosition);
  }
  
  /** Sets the player's block to the specified point and checks for the goal. */
  Maze.prototype.setPlayerPosition = function(position) {
    this.getPlayerBlock().classList.remove('current');
    this.position = position;
    this.getPlayerBlock().classList.add('current');
    if (!this.solved && this.position.equals(this.targetPosition)) {
      this.solved = true;
      if (!this.solving) {
        this.onSolved();
      }
    }
  }
  
  /** Generates the maze by randomly traversing and removing walls. */
  Maze.prototype.generate = function() {
    var blockCount = this.bounds.x * this.bounds.y;
    var stack = [];
    var visited = new Set();
    var start = this.startPosition;
    stack.push(start);
  
    var i = 0;
    return whileAsync(() => visited.size < blockCount, () => {
      var point = stack[stack.length - 1];
      var ps = point.serialize();
  
      var block = this.getBlock(point);
  
      if (!visited.has(ps)) {
        visited.add(ps);
        block.dataset.index = i;
        block.classList.add('generated');
        i++;
      }
  
      var adjacents = this.getAdjacents(point, visited);
  
      if (adjacents.length == 0) {
        stack.pop();
        return;
      }
  
      var rand = parseInt(Math.random() * 1000);
      var np = adjacents[rand % adjacents.length]
      var ajdBlock = this.getBlock(np);
      stack.push(np);
  
      // Remove the wall on the current block.
      block.classList.add(np.side);
      block.open[np.side] = true;
  
      // And the opposite side for the adjacent block's perspective.
      ajdBlock.classList.add(np.oppositeSide);
      ajdBlock.open[np.oppositeSide] = true;
    }, 100);
  }
  
  /** Solves the maze using the BFS algorithm including simple animation. */
  Maze.prototype.solve = function() {
    if (this.solving || this.reseting) {
      return;
    }
  
    this.solving = true;
    var startPosition = this.position;
    var visited = new Set();
    var position = startPosition;
    var queue = [position];
    var self = this;
  
    // The familiar BFS loop.
    return whileAsync(
        () => queue.length > 0 && !position.equals(self.targetPosition), () => {
      position = queue.shift();
      var block = self.getBlock(position);
  
      visited.add(position.serialize());
      block.classList.add('visited');
  
      for (var side in block.open) {
        if (!block.open[side]) {
          continue;
        }
  
        var nextPosition =
            position.offset(self.delta[self.sides.indexOf(side)]);
  
        if (!nextPosition.insideBounds(self.bounds) ||
            visited.has(nextPosition.serialize())) {
          continue;
        }
  
        // Keep track so we can traverse back using the shortest path.
        nextPosition.previous = position;
        queue.push(nextPosition);
      }
    }).then(function() {
      // Build up the shortest path.
      var path = [];
      while (!position.equals(startPosition)) {
        path.push(position);
        position = position.previous;
      };
  
      // Animation for showing the shortest path.
      var i = path.length;
      whileAsync(() => i > 0, () => {
        self.getBlock(path[--i]).classList.add('path');
      }, 1, 5);
  
      // Animation for moving the player block to the target.
      return whileAsync(() => path.length > 0, () => {
        self.setPlayerPosition(path.pop());
      }, 1, 100);
    }).then(function() {
      self.solving = false;
    });
  }
  
//Eind Maze