// set up event listener for human versus computer toggle


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

  const setGameInProgress = status => {
    _allowMoves = status;
  }
  const getGameInProgress = () => {
    return _allowMoves;
  }

  const makeAIMove = () => {
    displayController.setGameInProgress(false);
    setTimeout(function() {
      const validMoves = gameboard.getValidMoves();
      const randomValue = Math.floor(Math.random()*validMoves.length);
      console.log(validMoves[randomValue]);
      
      const box = document.querySelector('.'+validMoves[randomValue]);
      console.log(box);
      displayController.setGameInProgress(true);
      makeMove(box);
    },1000)
  };
  // set up reset button
  const resetButton = document.getElementById('reset-board');
  resetButton.addEventListener('click', startNewGame);

  const statusButton = document.getElementById('check-status');
  statusButton.addEventListener('click', () => {
    let isXPlayer = getCurrentPlayer().getIcon() === 'x';
    let testBoard = Board(gameboard.getBoardState());
    testBoard.resetInternalBoard();
    console.log(gameboard.getValidMoves());
    alert(minimax(testBoard,3,isXPlayer));
  });
  // some functions

  return {
    startNewGame,
    getCurrentPlayer,
    setCurrentPlayer,
    swapCurrentPlayer,
    setGameInProgress,
    getGameInProgress,
    makeAIMove,
  };
})();
// write a JavaScript function that will render the contents of 
// the gameboard array to the webpage
function renderArray(){
  const container = document.getElementById('board-container');
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
  console.log(boxes);
  boxes.forEach((item) => item.addEventListener('click', makeHumanMove));
}

function makeHumanMove(e){
  console.log(e);
  const box = e.target;
  console.log(box);
  makeMove(box);
  
  //console.log(contents);

}

function makeMove(box) {
  const coords = box.classList[1];
  const selectedBox = document.querySelector('.'+coords);
  const contents = box.getAttribute('data-contents');
  const currentPlayer = displayController.getCurrentPlayer();
  if (contents === 'empty' && displayController.getGameInProgress()) {
    selectedBox.setAttribute('data-contents', currentPlayer.getIcon());
    selectedBox.innerText = currentPlayer.getIcon();
    gameboard.updateBoard(coords, currentPlayer.getIcon());
    gameboard.printBoardStatus();
    displayController.swapCurrentPlayer();
    
    let winner = gameboard.checkWin();
    if(winner !== false) {
      displayController.setGameInProgress(false);
      alert(winner+' wins!');
    } else if(!displayController.getCurrentPlayer().getHuman()) {
      displayController.makeAIMove();
    }

    
  }
}



// allow players to add marks to a specific spot on the game board and 
// attach it to the DOM

// check if the game is over

// and the ability to put in names including a button to start or restart the game

// create an AI

//let gameboard = [];
const playerOneToggle = document.querySelector('#human-computer-toggle-one').childNodes;
playerOneToggle.forEach((item) => item.addEventListener('click', function(){
  //console.log('forEach'+item+one);
  toggleHuman(item, 'one')}));

const playerTwoToggle = document.querySelector('#human-computer-toggle-two').childNodes;
playerTwoToggle.forEach((item) => item.addEventListener('click', function(){
  //console.log('forEach'+item+one);
  toggleHuman(item, 'two')}));

function toggleHuman(e, set) {
  //console.log(set);
  const human = document.querySelector('#human-'+set);
  const computer = document.querySelector('#computer-'+set);
  const clicked = e;
  const player = set === 'one' ? playerOne : playerTwo;
  
  //console.log(clicked);
  if (clicked === human) {
    human.classList.add('active');
    computer.classList.remove('active');
    player.setHuman(true);
  } else if (clicked === computer){
    computer.classList.add('active');
    human.classList.remove('active');
    player.setHuman(false);
  } else {
    console.log(`error, ${e} is the selected element`);
    //alert('error');
  }
  console.log(player.getName());
  console.log(player.getHuman());
  

};