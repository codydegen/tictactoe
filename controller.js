// set up event listener for human versus computer toggle


// create a display controller using a module
const displayController = ((activeBoard, ties) => {
  let _allowMoves = true;
  let _playerOne = null;
  let _playerTwo = null;
  let _currentPlayer = null;
  let _numTies = ties || 0;
  let _activeBoard = activeBoard;

  const resetGame = () => {
    _currentPlayer = _playerOne;
    _allowMoves = true;
    _activeBoard.resetBoard();
    renderBoard();
    if (!_currentPlayer.getHuman()) {
      makeAIMove();
    }
  };

  const startNewGame = () => {
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('controls-container').classList.add('hidden');
    _renderNewPlayer(_playerOne);
    _renderNewPlayer(_playerTwo);
    resetGame();
  }

  _renderNewPlayer = player => {
    let name;
    let id;
    let displayID;
    if (player === _playerOne) {
      id = 'player-one-input';
      displayID = 'player-one-name';
      name = document.getElementById(id).value;
      if (name !== _playerOne.getName()) {
        _playerOne.setName(name);
        _playerOne.resetScore();
        document.getElementById(displayID).textContent = `${name}'s score:`;
      }
    } else {
      id = 'player-two-input';
      displayID = 'player-two-name';
      name = document.getElementById(id).value;
      if (name !== _playerTwo.getName()) {
        _playerTwo.setName(name);
        _playerTwo.resetScore();
        document.getElementById(displayID).textContent = `${name}'s score:`;
    }
  }
    updateScore(player);
  };

  const returnToMainMenu = () => {
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('controls-container').classList.remove('hidden');
  }

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
    let move;
    setTimeout(function() {
      if (_currentPlayer.getDifficulty() === 'easy') {
        const validMoves = gameboard.getValidMoves();
        const randomValue = Math.floor(Math.random()*validMoves.length);
        move = document.querySelector('.'+validMoves[randomValue]);
      } else {
        let isXPlayer = getCurrentPlayer().getIcon() === 'x';
        const moveList = minimax(gameboard, 100, isXPlayer, true);
        console.table(moveList);
        const bestMove = moveList[0];
        move = document.querySelector('.'+bestMove.index);
      }
      displayController.setGameInProgress(true);
      MakeMove(move);
    },500)
  };
  // set up reset button
  const resetButton = document.getElementById('reset-board');
  resetButton.addEventListener('click', resetGame);

  const statusButton = document.getElementById('scoring-status');
  statusButton.addEventListener('click', () => {
    let isXPlayer = getCurrentPlayer().getIcon() === 'x';
    let testBoard = Board(gameboard.getBoardState());
    //testBoard.resetBoard();
    //console.log(gameboard.getValidMoves());
    console.time('b');
    //console.table(minimax(testBoard,100,isXPlayer,true));
    console.timeEnd('b');
  });

  const startButton = document.getElementById('start-game');
  startButton.addEventListener('click', startNewGame);
  //const 
  const mainMenu = document.getElementById('main-menu');
  mainMenu.addEventListener('click', returnToMainMenu);

  const updateScore = winner => {
    let scoreBlock;
    let score;
    if (winner === 'tie') {
        scoreBlock = document.getElementById('tie-score');
        //console.log(winner);
        score = _numTies;
    } else {
    if (winner === _playerOne) {
      scoreBlock = document.getElementById('player-one-score');
      //console.log('player one');
    } else if (winner === _playerTwo) {
      scoreBlock = document.getElementById('player-two-score');
      //console.log('player two');
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
    //console.log(boxes);
    boxes.forEach((item) => item.addEventListener('click', makeHumanMove));

  }

  const makeHumanMove = e => {
    //console.log(e);
    const box = e.target;
    //console.log(box);
    MakeMove(box);  
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
    resetGame,
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





const playerOneToggle = document.querySelector('#human-computer-toggle-one').childNodes;
playerOneToggle.forEach((item) => item.addEventListener('click', function(){
  toggleHuman(item, 'one')}));

const playerTwoToggle = document.querySelector('#human-computer-toggle-two').childNodes;
playerTwoToggle.forEach((item) => item.addEventListener('click', function(){
  toggleHuman(item, 'two')}));

function toggleHuman(e, set) {
  const human = document.querySelector('#human-'+set);
  const computer = document.querySelector('#computer-'+set);
  const ai = document.querySelector('#computer-difficulty-'+set);
  const clicked = e;
  const player = set === 'one' ? playerOne : playerTwo;

  if (clicked === human) {
    human.classList.add('active');
    computer.classList.remove('active');
    player.setHuman(true);
    ai.classList.add('hide');
    ai.classList.remove('first-trans');
  } else if (clicked === computer){
    computer.classList.add('active');
    human.classList.remove('active');
    player.setHuman(false);
    if(ai.classList.contains('first-trans')) {
      ai.classList.remove('first-trans');
      ai.classList.add('trans');
    }
    ai.classList.remove('hide');
  } else {
    console.log(`error, ${e} is the selected element`);
  }
};

const playerOneDifficulty = document.querySelector('#computer-difficulty-one').childNodes;
playerOneDifficulty.forEach((item) => item.addEventListener('click', function(){
  toggleDifficulty(item, 'one')}));

const playerTwoDifficulty = document.querySelector('#computer-difficulty-two').childNodes;
playerTwoDifficulty.forEach((item) => item.addEventListener('click', function(){
  toggleDifficulty(item, 'two')}));

function toggleDifficulty(e, set) {
  const easy = document.querySelector('#computer-easy-'+set);
  const hard = document.querySelector('#computer-hard-'+set);
  const clicked = e;
  const player = set === 'one' ? playerOne : playerTwo;
  if (clicked === easy) {
    easy.classList.add('active');
    hard.classList.remove('active');
    player.setDifficulty('easy');
  } else if (clicked === hard) {
    easy.classList.remove('active');
    hard.classList.add('active');
    player.setDifficulty('hard');
  }
};