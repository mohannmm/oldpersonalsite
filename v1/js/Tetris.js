const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
//const SIZE = 25;
canvas.addEventListener('keyDown',keyDown, false);
context.scale(20,20);
console.log(canvas.width + ', ' + canvas.height);

function drawBackground (){
  context.fillStyle = '#2f3642';
  context.fillRect(0,0,canvas.width,canvas.height);
}

function keyDown(e){
  console.log(e.keyCode);
}
const matrix = [
  [0,0,0],
  [1,1,1],
  [0,1,0],
];

const player = {
  pos:{x:5, y:5},
  matrix: matrix,
}

function drawPiece(matrix, pos){
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = 'red';
        context.fillRect(x + pos.x, y + pos.y, 1, 1);
      }
    });
  });
}

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
    player.pos.y++;
    dropCounter = 0;
  }
  drawBackground();
  drawPiece(player.matrix, player.pos);
  requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
  console.log(event);
  switch(event.which){
    //movement, drop, and rotation
    case 37: player.pos.x--; break;
    case 39: player.pos.x++; break;
    case 38: player.pos.y--; break;
    case 40: player.pos.y++; break;
    case 32: //rotate
  }

});

update();
