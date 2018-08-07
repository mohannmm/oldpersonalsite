const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.scale(25,25);

// ************************************************************************ //

// 0 = No block
// 1 = Block
// 2 = Pivot Block

const T = [
  [1,2,1],
  [0,1,0]
];

const O = [
  [1,1],
  [1,1]
];

const S = [
  [0,2,1],
  [1,1,0]
];

const Z = [
  [1,2,0],
  [0,1,1]
];

const L = [
  [1,0],
  [1,0],
  [2,1]
];

const J = [
  [0,1],
  [0,1],
  [1,2]
];

const I = [
  [1],
  [1],
  [2],
  [1]
];
// ************************************************************************ //

const player = {
  pos:{x:4, y:0},
  piv:{row:0, col:1},
  longestRow: 3,
  matrix: T,
}

const arena = createMatrix(10,24);

function createMatrix(w, h){
  const matrix = [];
  while(h--){ //while h is not 0
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

function merge(arena, player){
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value !== 0){
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function drawMatrix(matrix, offset){
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        //console.log('ROW: ' + row + ', Y: ' + y + ', VAL: ' + value + ', X: ' + x);
        //row is the array row at position y
        //value is the element value within row at position x
        context.fillStyle = 'red';
        context.fillRect(x + offset.x, y + offset.y, 1, 1); //width and height just 1
      }
    });
  });
}

function collide(arena, player){
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value !== 0){
        if(arena[y + player.pos.y] && arena[y + player.pos.y][x + player.pos.x] !== 0){
          return true;
        }
      }
    });
  });
  return false;
}

function draw(){
  context.fillStyle = '#2f3642';
  context.fillRect(0,0,canvas.width,canvas.height);

  drawMatrix(arena, {x:0, y:0}); //arena is static, and position is always (0,0)
  drawMatrix(player.matrix, player.pos);
}
// ************************************************************************ //

//Drops every second, or 1000 miliseconds
let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0){
  //console.log(time);
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if(dropCounter >= dropInterval){
    playerDrop();
  }
  draw();
  requestAnimationFrame(update);
}

function playerDrop(){
  player.pos.y++;
  if (collide(arena, player)){
    player.pos.y--;
    merge(arena, player);
    player.pos.x = 0;
    player.pos.y = 0;
    console.log('collision');
  }
  console.log(player.pos);
  dropCounter = 0;
}

document.addEventListener('keydown', event => {
  //console.log(event);
  switch(event.which){
    //movement, drop, and rotation
    case 37: event.preventDefault(); player.pos.x--; break; //left
    case 39: event.preventDefault(); player.pos.x++; break; //right
    case 38: event.preventDefault(); player.pos.y--; break; //up
    case 40: event.preventDefault(); playerDrop(); break;   //down
    case 32: event.preventDefault(); merge(arena, player);  break;                 //space
    case 13: break;                 //enter
  }

});

console.log(dropCounter);
update();
