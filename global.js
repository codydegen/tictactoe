let playerOne = Player('Bob', 'x', true);
let playerTwo = Player('Fred', 'o', true);
// let b = [[0, 0, 0],
        //  [0, 0, 0],
        //  [0, 0, 0]]
let gameboard = Board();
displayController.setActiveBoard(gameboard);
// playerOne.setName('john');
//console.log(playerOne.getName());
//console.log(gameboard.getBoardState());
displayController.setCurrentPlayer(playerOne, playerTwo);
// displayController.swapCurrentPlayer();
// write a JavaScript function that will render the contents of 
// the gameboard array to the webpage

displayController.render();
// gameboard.setBoardState(b);
displayController.renderBoard();
// let b = Board();
// let c = _.cloneDeep(gameboard);
// c.setBoardState()
// c.updateBoard('x2y2','o');
// console.log(c.getValidMoves());


// let c = Board();
// let d = Board(c.getBoardState());
// console.log(c.getBoardState());
// console.log(d.getBoardState());
// c.updateBoard('x2y2','x');
// let e = c.boardState;
// let f = Board();
// f.setBoardState(e);
// c.updateBoard('x2y2','y');
// console.table(c._boardState);
// console.table(f._boardState);

// f.resetBoard();
// console.table(c._boardState);
// console.table(f._boardState);

// let h = Player('bob','x',true);
// let g = Player('tim','q',true);
// console.log(h.getName());
// console.log(g.getName());
// g.setName('bill');
// console.log(h.getName());
// console.log(g.getName());
// let k = Player(h.getName(),'p',true);
// k.setName('john');
// console.log(k.getName());
// console.log(h.getName());

// let c = new Board();
// console.log(c.boardState);
// c.updateBoard('x0y0', 'x');
// let d = new Board(c.getBoardState());
// c.updateBoard('x2y2', 'y');
// console.table(c.getBoardState());
// console.table(d.getBoardState());


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