let players = [];
let turn = Math.round(Math.random());
let gameOver = false;
let n = parseInt(document.getElementById("dimensions").value);

let board = new Array(n).fill("").map(() => new Array(n).fill(""));
const changeDimension = (event) => {
  n = parseInt(event.target.value);
  board = new Array(n)
    .fill("")
    .map(() => new Array(n).fill(""));
};

document
  .getElementById("dimensions")
  .addEventListener("change", changeDimension);

const startGame = () => {
  let input1 = document.getElementById("p1");
  let input2 = document.getElementById("p2");
  let select=document.getElementById("dimensions");
  let b=document.getElementById("start");
  let player1 = input1.value;
  let player2 = input2.value;

  if (isEmpty(player1) || isEmpty(player2)) {
    alert("Player name is required");
    return;
  }
  input1.setAttribute("disabled", true);
  input2.setAttribute("disabled", true);
  select.setAttribute("disabled", true);
  b.setAttribute("disabled", true);

  let game = document.getElementById("game");
  game.classList.remove("hide");
  players.push(player1);
  players.push(player2);
  document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";
  initGame();
};

const handleClick = (event, i, j) => {
  if(gameOver){
    return;
  }
  const el = event.target;
  console.log("clicked");
  if (el.innerHTML !== "") {
    return;
  }
  board[i][j] = turn % 2 === 0 ? "X" : "O";
  if(board[i][j]==="X"){
    el.style.color = "#ff0000";
  }
  else{
    el.style.color='#061cf8';
  }
  el.innerHTML = board[i][j];
  if(board[i][j]==="X"){
  }
  outcome();
  
};
let outcome=()=>{
  if (calculateWinner()) {
    //alert(players[turn % 2] + " won");
    document.getElementById("winner").innerHTML = players[turn % 2] + " won";
turn%2===0?document.getElementById("winner").style.color="#ff0000":document.getElementById("winner").style.color="#061cf8";;
    gameOver = true;
    return;
  }
  turn++;
  document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";
  if (turn === n*n) {
    //alert("Game is drawn");
    document.getElementById("winner").innerHTML = "Draw";
    gameOver = true;
    return;
  }
}
let initGame = () => {
  let game = document.getElementById("game");

  for (let i = 0; i < n; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < n; j++) {
      let cell = document.createElement("div");

      //cell.setAttribute("onclick", "handleClick(this)");
      cell.addEventListener("click", (event) => handleClick(event, i, j));
      if (i === n - 1 || j === n - 1) {
        if (i === n - 1 && j === n - 1) {
          cell.className = "cell3";
        } else if (i === n - 1) {
          cell.className = "cell1";
        } else {
          cell.className = "cell2";
        }
      } else {
        cell.className = "cell";
      }
      row.appendChild(cell);
    }
    game.appendChild(row);
  }
};
const calculateWinner = () => {
  // first check for all rows in board and then for col and then for diagonals
  for (let z = 0; z < board.length; z++) {
    console.log(board[z]);
  }
  let len = board.length;
  if (turn < len) {
    return false;
  }
  //console.log(board);

  for (let i = 0; i < len; i++) {
    if (board[i].every((el) => el === board[i][0] && el !== "")) {
      return true;
    }
    //console.log(`${i} Row clear`);
    let start_col_val = board[0][i];
    let count = 1;
    for (let j = 1; j < len; j++) {
      if (start_col_val === board[j][i] && start_col_val !== "") {
        count++;
      }
    }
    //console.log(`${i} Col clear`);
    if (count === len) {
      return true;
    }
  }

  // check for diagonal

  let i = board[0][0];
  let j = 0;
  while (j < len) {
    //console.log(`${board[j][j]} diagonal`);
    if (board[0][0] === "") {
      break;
    }
    if (board[j][j] !== i) {
      break;
    } else {
      j++;
    }
  }
  //console.log(`Diagonal clear`);
  //console.log(`${j} j for diagonal`);
  if (j === len) {
    return true;
  }

  let rev_i = 0;
  let rev_j = len - 1;
  let rev_val = board[rev_i][rev_j];

  while (rev_i < len) {
    if (board[rev_i][rev_j] === "") {
      break;
    }
    if (rev_val !== board[rev_i][rev_j]) {
      break;
    } else {
      rev_i++;
      rev_j--;
    }
  }
  //console.log(`reverse Diagonal clear`);
  if (rev_i === len) {
    return true;
  }

  return false;
};
const isEmpty = (value) => !value || !value.trim();
