let playerOne = Player('Bob', 'x', true);
let playerTwo = Player('Fred', 'o', true);
let gameboard = Board();

displayController.setActiveBoard(gameboard);
displayController.setCurrentPlayer(playerOne, playerTwo);
displayController.render();
displayController.renderBoard();
