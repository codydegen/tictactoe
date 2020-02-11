let playerOne = Player('bob', 'x', true);
let playerTwo = Player('fred', 'o', true);
let gameboard = Board2();
displayController.setActiveBoard(gameboard);
playerOne.setName('john');
console.log(playerOne.getName());
console.log(gameboard.getBoardState());
displayController.setCurrentPlayer(playerOne, playerTwo);
// write a JavaScript function that will render the contents of 
// the gameboard array to the webpage

renderArray();
let b = Board();
// let c = _.cloneDeep(gameboard);
// c.setBoardState()
// c.updateBoard('x2y2','o');
// console.log(c.getValidMoves());
let c = Board2();
let d = Board2([2,3]);
console.log(c.getBoardState());
console.log(d.getBoardState());
c.updateBoard('x2y2','x');
let e = c.getBoardState();
let f = Board2(e);
f.resetBoard();
console.table(c.getBoardState());
console.table(f.getBoardState());
// console.log(c.getBoardState());
// console.log(d.getBoardState());
// console.log(c.getValidMoves());
// console.log(gameboard.getValidMoves());
// allow players to add marks to a specific spot on the game board and 
// attach it to the DOM

// check if the game is over

// and the ability to put in names including a button to start or restart the game

// create an AI

//let gameboard = [];