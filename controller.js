// create a display controller using a module
const displayController = (() => {
  let _allowMoves = true;
  let _playerOne = null;
  let _playerTwo = null;
  let _currentPlayer = null;
  const startNewGame = () => {
    _currentPlayer = _playerOne;
    _allowMoves = true;
    gameboard.resetBoard();
  };
  const getCurrentPlayer = () => _currentPlayer;
  const setCurrentPlayer = (playerOne, playerTwo) => {
    _currentPlayer = playerOne;
    _playerOne = playerOne;
    _playerTwo = playerTwo;
  }

  const swapCurrentPlayer = () => {
    _currentPlayer = _currentPlayer === playerOne ? _playerTwo : _playerOne;
  };

  const setMovesAllowed = status => {
    _allowMoves = status;
  }
  const getMovesAllowed = () => {
    return _allowMoves;
  }
  // set up button
  const resetButton = document.getElementById('reset-board');
  resetButton.addEventListener('click', startNewGame);
  // some functions

  return {
    startNewGame,
    getCurrentPlayer,
    setCurrentPlayer,
    swapCurrentPlayer,
    setMovesAllowed,
    getMovesAllowed,
  };
})();
// write a JavaScript function that will render the contents of 
// the gameboard array to the webpage
function renderArray(){
  const container = document.getElementById('boardContainer');
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){

      let el = document.createElement('div');
      el.classList.add('box');
      el.classList.add('x'+i+'y'+j);
      el.setAttribute('data-contents', 'empty');
      // do some stuff
      container.appendChild(el);
    }
  }
  const boxes = document.querySelectorAll('.box');
  boxes.forEach((item) => item.addEventListener('click', placeHolderFunction));
}

function placeHolderFunction(e){
  //console.log(e);
  const box = e.target;
  const coords = box.classList[1];
  const selectedBox = document.querySelector('.'+coords);
  const contents = box.getAttribute('data-contents');
  const currentPlayer = displayController.getCurrentPlayer();
  if (contents === 'empty' && displayController.getMovesAllowed()) {
    selectedBox.setAttribute('data-contents', currentPlayer.checkIcon());
    selectedBox.innerText = currentPlayer.checkIcon();
    gameboard.updateBoard(coords, currentPlayer.checkIcon());
    gameboard.printBoardStatus();
    displayController.swapCurrentPlayer();
    let winner = gameboard.checkWin();
    if(winner !== false) {
      console.log(winner+' wins!');
      displayController.setMovesAllowed(false);
    }
  }
  //console.log(contents);

}

function clickBox(e) {
  //check if box is empty

  // if box is empty, Place a strike

  // check if ended
};

// allow players to add marks to a specific spot on the game board and 
// attach it to the DOM

// check if the game is over

// and the ability to put in names including a button to start or restart the game

// create an AI

//let gameboard = [];