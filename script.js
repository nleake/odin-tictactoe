const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartButton = document.querySelector('#restartBtn');
const winningCombos = [
  //horizontal
  [0, 1, 2],
  [3, 4, 5],
  [ 6, 7, 8],
  //vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonal
  [0, 4, 8],
  [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;``

initializeGame();

function initializeGame(){
  cells.forEach(cell => cell.addEventListener('click', cellClicked));
  restartButton.addEventListener('click', restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
};

function cellClicked(){
  const cellIndex = this.getAttribute('cellIndex');
//if the cell is already clicked or the game is not running, return
  if(options[cellIndex] !== "" || !running){
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}
//update the cell with the current player's mark
function updateCell(cell, index){
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
//check if there is a winner or a draw
function checkWinner(){
  let winner = false;
  for (let i = 0; i < winningCombos.length; i++){
    const winCondition = winningCombos[i];
    let a = options[winCondition[0]];
    let b = options[winCondition[1]];
    let c = options[winCondition[2]];

    if(a === "" || b === "" || c === ""){
      continue;
    }

    if(a === b && b === c){
      winner = true;
      break;
    }
  }

  if(winner){
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
    return;
  } else if(!options.includes("")){
    statusText.textContent = "It's a draw!";
    running = false;
    return;
  } else {
    changePlayer();
  }

}
//change the player and update the status text
function changePlayer(){
  currentPlayer = (currentPlayer === "X") ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function restartGame(){
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = "";
  });
  running = true;
}