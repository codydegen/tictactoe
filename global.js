let playerOne = Player('Bob', 'x', true, 0, 'easy');
let playerTwo = Player('Fred', 'o', true, 0, 'easy');
let gameboard = Board();

displayController.setActiveBoard(gameboard);
displayController.setCurrentPlayer(playerOne, playerTwo);
displayController.render();
displayController.renderBoard();
