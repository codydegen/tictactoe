// set up event listener for human versus computer toggle


// create a display controller using a module
const displayController = ((activeBoard, ties) => {
  let _allowMoves = true;
  let _playerOne = null;
  let _playerTwo = null;
  let _currentPlayer = null;
  let _numTies = ties || 0;
  let _activeBoard = activeBoard;

  const startNewGame = () => {
    _currentPlayer = _playerOne;
    _allowMoves = true;
    _activeBoard.resetBoard();
    renderBoard();
    if (!_currentPlayer.getHuman()) {
      makeAIMove();
    }
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

  const getActiveBoard = () => _activeBoard;
  const setActiveBoard = newBoard => _activeBoard = newBoard;
  const renderBoard = () => {
    let tempBoard = _activeBoard.getBoardState();
    let coords;
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        coords = `x${i}y${j}`;
        const selectedBox = document.querySelector(`.${coords}`);
        selectedBox.setAttribute('data-contents', tempBoard[i][j]);
        if(tempBoard[i][j] !== 0){
          selectedBox.innerText = tempBoard[i][j];
        } else {
          selectedBox.innerText = '';
        }
      }
    }
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
      //console.log(validMoves[randomValue]);
      let isXPlayer = getCurrentPlayer().getIcon() === 'x';
      const moveList = minimax(gameboard, 1000, isXPlayer, true);
      console.table(moveList);
      const bestMove = moveList[0];
      const box = document.querySelector('.'+validMoves[randomValue]);
      const smartBox = document.querySelector('.'+bestMove.index);
      console.log(box);
      displayController.setGameInProgress(true);
      MakeMove(smartBox);
    },500)
  };
  // set up reset button
  const resetButton = document.getElementById('reset-board');
  resetButton.addEventListener('click', startNewGame);

  const statusButton = document.getElementById('check-status');
  statusButton.addEventListener('click', () => {
    let isXPlayer = getCurrentPlayer().getIcon() === 'x';
    let testBoard = Board(gameboard.getBoardState());
    //testBoard.resetBoard();
    //console.log(gameboard.getValidMoves());
    console.time('b');
    console.table(minimax(testBoard,100,isXPlayer,true));
    console.timeEnd('b');
  });

  //const 

  const updateScore = winner => {
    let scoreBlock;
    let score;
    if (winner === 'tie') {
        scoreBlock = document.getElementById('tie-score');
        console.log(winner);
        score = _numTies;
    } else {
    if (winner === _playerOne) {
      scoreBlock = document.getElementById('player-one-score');
      console.log('player one');
    } else if (winner === _playerTwo) {
      scoreBlock = document.getElementById('player-two-score');
      console.log('player two');
    }
    score = winner.getScore();
  }
  scoreBlock.innerText = score;
}

  const isObject = a => a != null && a.constructor === Object;


  const _createScoreBlock = (player) => {
    let element = document.createElement('div');
    let nameElement = document.createElement('div');
    let scoreElement = document.createElement('div');
    let nameElementId;
    let scoreElementId;
    let elementId;
    let name;
    let score;
    if (isObject(player)) {
      if (player.getIcon() === 'x') {
        elementId = 'player-one-scorebug';
        nameElementId = 'player-one-name';
        scoreElementId = 'player-one-score';
      } else {
        elementId = 'player-two-scorebug';
        nameElementId = 'player-two-name';
        scoreElementId = 'player-two-score';
      }
      score = player.getScore();
      name = player.getHuman() ? player.getName() : 'AI';
      nameElement.innerText = `${name}\'s score:`;
    } else {
      elementId = 'tie-scorebug';
      nameElementId = 'tie-name';
        scoreElementId = 'tie-score';
      name = 'Ties';
      nameElement.innerText = `${name}:`;
      score = 0;
    }
    element.setAttribute('id', elementId);
    nameElement.setAttribute('id', nameElementId);
    scoreElement.setAttribute('id', scoreElementId);
    element.setAttribute('class', 'score-block');

    scoreElement.innerText = score;
    element.appendChild(nameElement);
    element.appendChild(scoreElement);
    return element;
  }

  const render = () => {
    const container = document.getElementById('board-container');
    const scoreBug = document.getElementById('score-container');
    // scoreBug.appendChild(_createScoreBlock('player-one-score'));
    scoreBug.appendChild(_createScoreBlock(_playerOne));
    scoreBug.appendChild(_createScoreBlock('tie-score'));
    scoreBug.appendChild(_createScoreBlock(_playerTwo));

    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
  
        let el = document.createElement('div');
        el.classList.add('box');
        el.classList.add('x'+i+'y'+j);
        el.setAttribute('data-contents', '0');
        // do some stuff
        container.appendChild(el);
      }
    }
    const boxes = document.querySelectorAll('.box');
    console.log(boxes);
    boxes.forEach((item) => item.addEventListener('click', makeHumanMove));

  }

  const makeHumanMove = e => {
    console.log(e);
    const box = e.target;
    console.log(box);
    MakeMove(box);
    
    //console.log(contents);
  
  }

  const MakeMove = box => {
    const coords = box.classList[1];
    const x = coords.charAt(1);
    const y = coords.charAt(3);
    const currentPlayer = displayController.getCurrentPlayer();
    const activeBoard = displayController.getActiveBoard().getBoardState();
    if(activeBoard[x][y] === 0 & displayController.getGameInProgress()) {
      displayController.getActiveBoard().updateBoard(coords, currentPlayer.getIcon());
      displayController.swapCurrentPlayer();
      displayController.renderBoard();
      let winner = gameboard.checkEnd();
      if(winner !== false) {
        if (winner === 'tie') {
          _numTies++;
          updateScore('tie');
          alert('you tied.');
        } else {
        if(winner === _playerOne.getIcon()) {
          _playerOne.incrementScore();
          updateScore(_playerOne);
        } else {
          _playerTwo.incrementScore();
          updateScore(_playerTwo);
        }
        alert(winner+ ' wins!');
      }
        displayController.setGameInProgress(false);
        
      } else if(!displayController.getCurrentPlayer().getHuman()) {
        displayController.makeAIMove();
      }
    }
  }

  return {
    startNewGame,
    getCurrentPlayer,
    setCurrentPlayer,
    getActiveBoard,
    setActiveBoard,
    renderBoard,
    swapCurrentPlayer,
    setGameInProgress,
    getGameInProgress,
    makeHumanMove,
    makeAIMove,
    updateScore,
    render,
  };
})();
// write a JavaScript function that will render the contents of 
// the gameboard array to the webpage




// function makeMove(box) {
//   const coords = box.classList[1];
//   const selectedBox = document.querySelector('.'+coords);
//   const contents = box.getAttribute('data-contents');
//   const currentPlayer = displayController.getCurrentPlayer();
//   if (contents === '0' && displayController.getGameInProgress()) {
//     selectedBox.setAttribute('data-contents', currentPlayer.getIcon());
//     selectedBox.innerText = currentPlayer.getIcon();
//     gameboard.updateBoard(coords, currentPlayer.getIcon());
//     gameboard.printBoardStatus();
//     displayController.swapCurrentPlayer();
    
//     let winner = gameboard.checkWin();
//     if(winner !== false) {
//       displayController.setGameInProgress(false);
//       alert(winner+' wins!');
//     } else if(!displayController.getCurrentPlayer().getHuman()) {
//       displayController.makeAIMove();
//     }

    
//   }
// }

//function 


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