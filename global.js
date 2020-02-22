let playerOne = Player('Player One', 'x', true, 0, 'easy');
let playerTwo = Player('Player Two', 'o', true, 0, 'easy');
let gameboard = Board();

displayController.setActiveBoard(gameboard);
displayController.setCurrentPlayer(playerOne, playerTwo);
displayController.render();
displayController.renderBoard();
