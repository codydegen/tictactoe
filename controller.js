// set up event listener for human versus computer toggle


// create a display controller using a module
const displayController = ((activeBoard, ties) => {
  let _gameStatus = true;
  let _movesAllowed = true;
  let _playerOne = null;
  let _playerTwo = null;
  let _currentPlayer = null;
  let x;
  let _numTies = ties || 0;
  let _activeBoard = activeBoard;

  const resetGame = () => {
    clearTimeout(x);
    let scoreNodes = Array.from(document.getElementById('score-container').children);
    scoreNodes.forEach((item) => {
      item.classList.remove('flip-delay');
      item.classList.remove('flip');
      setTimeout(() => {
        item.classList.toggle('flip-delay');
      }, 2000);
    });
    _currentPlayer = _playerOne;
    setGameInProgress(true);
    _setMovesAllowed(true);
    _activeBoard.resetBoard();
    renderBoard();
    //setTimeout(function() {console.log('reset')}, 4000);
    // sleep(2000);
    document.getElementById('board-container-flipper').classList.remove('full-flip');
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
      if (name !== _playerOne.getName() && name !== '') {
        name = name || 'Player One';
        _playerOne.setName(name);
        _playerOne.resetScore();
        document.getElementById(displayID).textContent = `${name}'s score:`;
      }
    } else {
      id = 'player-two-input';
      displayID = 'player-two-name';
      name = document.getElementById(id).value;
      if (name !== _playerTwo.getName() && name !== '') {
        name = name || 'Player Two';
        _playerTwo.setName(name);
        _playerTwo.resetScore();
        document.getElementById(displayID).textContent = `${name}'s score:`;
    }
  }
    updateScore(player, true);
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
          //selectedBox.
          selectedBox.classList.add('flip');
          selectedBox.classList.add('flipper');
          selectedBox.children[0].innerText = tempBoard[i][j];
          //selectedBox.innerText = tempBoard[i][j];
        } else {
          selectedBox.classList.remove('flip');
          // selectedBox.classList.remove('flipper');
          selectedBox.children[0].innerText = '';
          if(selectedBox.children[1].innerText !== '') {
            _fullFlip(selectedBox);
            selectedBox.children[1].setAttribute('data-move-quality', '');
          }

          // if(selectedBox.children[0].getAttribute('data-move-quality') === 'good' || selectedBox.children[0].getAttribute('data-move-quality') === 'neutral'){
            selectedBox.children[0].setAttribute('data-move-quality', '');
            selectedBox.children[1].setAttribute('data-move-quality', '');

          // }
          selectedBox.children[1].innerText = '';
        }
      }
    }
  };

  const setGameInProgress = status => {
    _gameStatus = status;
  }
  const getGameInProgress = () => {
    return _gameStatus;
  }

  const _setMovesAllowed = allowed => {
    _movesAllowed = allowed;
  }
  const _getMovesAllowed = () => {
    return _movesAllowed;
  }

  const makeAIMove = () => {
    _setMovesAllowed(false);
    // sleep(600);
    //let move;
    
    x = setTimeout(_aiSnippet,500);
  };

  _aiSnippet = () => {
    //clearInterval(_aiSnippet);
    if (_currentPlayer.getDifficulty() === 'easy') {
      const validMoves = gameboard.getValidMoves();
      if(validMoves.length === 0) {
        console.log('game over');
        return;
      }
      const randomValue = Math.floor(Math.random()*validMoves.length);
      move = document.querySelector('.'+validMoves[randomValue]);
    } else {
      let isXPlayer = getCurrentPlayer().getIcon() === 'x';
      const moveList = minimax(gameboard, 100, isXPlayer, true);
      console.table(moveList);
      const bestMove = moveList[0];
      if(bestMove.index !== -1){
      move = document.querySelector('.'+bestMove.index);
    } else {
      return;
    }
    }
    _setMovesAllowed(true);
    clearTimeout(x);
    MakeMove(move);
    
    
    
  };
  const analyzeBoard = () => {
    let isXPlayer = getCurrentPlayer().getIcon() === 'x';
    let testBoard = Board(gameboard.getBoardState());
    const depth = 100;
    let a = minimax(testBoard,depth,isXPlayer,true);
    let status;
    let remainingMoves;
    let rel;
    let highScore = a[1].score;
    let lowScore = a[a.length-1].score;
    a.forEach((item) => {
      
      if (item.score === 0) {
        remainingMoves = Math.ceil((a.length-1)/2);
        status = `Tie in ${remainingMoves} turn`;
        rel = 'neutral';
      } else if (item.score > 0) {
        remainingMoves = Math.ceil((1000 + depth - item.score)/2);
        status = `X wins in ${remainingMoves} turn`;
        if(isXPlayer){
          if(item.score < highScore) {
            rel = 'good';
          } else {
            rel = 'best';
          }
         } else {
            if(item.score < highScore) {
              rel = 'bad';
            } else {
              rel = 'worst';
            }
          }
      } else {
        remainingMoves = Math.ceil((1000 + depth + item.score)/2);
        status = `O wins in ${remainingMoves} turn`;
        if(!isXPlayer){
          if(item.score > lowScore) {
            rel = 'good';
          } else {
            rel = 'best';
          }
         } else {
            if(item.score > lowScore) {
              rel = 'bad';
            } else {
              rel = 'worst';
            }
          }
      }

      if (remainingMoves !== 1) {
        status+='s';
      }
      item.status = status;
      item.rel = rel;
      // console.log(item, remainingMoves);
      if(item.index !== -1){
        printAnalysis(item);
      }
    });
  }

  const printAnalysis = (item) => {
    const coords = item.index;
    const selectedBox = document.querySelector(`.${coords}`);
    selectedBox.classList.add('flipper');

    selectedBox.classList.add('full-flip');
    selectedBox.children[1].setAttribute('data-move-quality', item.rel);
    setTimeout(() => {
      // setTimeout(() => {
        setTimeout(() => {
          selectedBox.classList.remove('full-flip')
        }, 400)
        selectedBox.children[1].innerText = item.status;
      // }, 0);
  }, 700);
    // selectedBox.classList.remove('full-flip');
  };

  // set up reset button
  const resetButton = document.getElementById('reset-board');
  resetButton.addEventListener('click', resetGame);

  const boardAnalysis = document.getElementById('board-analysis');
  boardAnalysis.addEventListener('click', analyzeBoard);

  const startButton = document.getElementById('start-game');
  startButton.addEventListener('click', startNewGame);
  //const 
  const mainMenu = document.getElementById('main-menu');
  mainMenu.addEventListener('click', returnToMainMenu);



  const updateScore = (winner, newName) => {
    //newName = this.newName || false;
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
  let timeout = newName ? 0 : 2500;
  
  setTimeout(() => {scoreBlock.innerText = score;}, timeout)
  
}

  const isObject = a => a != null && a.constructor === Object;


  const _createScoreBlock = (player) => {
    let backElement = document.createElement('div');
    let containerElement = document.createElement('div');
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
      backElement.innerText = `${name} Wins!`;
    } else {
      elementId = 'tie-scorebug';
      nameElementId = 'tie-name';
        scoreElementId = 'tie-score';
      name = 'Ties';
      nameElement.innerText = `${name}:`;
      score = 0;
      backElement.innerText = `You Tied.`;
    }
    backElement.setAttribute('id', elementId+'-back');
    backElement.classList.add('back');
    
    element.classList.add('front');
    containerElement.setAttribute('id', elementId+'-container');
    containerElement.setAttribute('class', 'flipper flip-delay');
    element.setAttribute('id', elementId);
    nameElement.setAttribute('id', nameElementId);
    scoreElement.setAttribute('id', scoreElementId);
    containerElement.classList.add('score-block');

    scoreElement.innerText = score;
    element.appendChild(nameElement);
    element.appendChild(scoreElement);
    containerElement.appendChild(backElement);
    containerElement.appendChild(element);
    return containerElement;
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
        let front = document.createElement('div');
        let back = document.createElement('div');
        el.classList.add('box');
        el.classList.add('x'+i+'y'+j);
        front.classList.add('x'+i+'y'+j);
        back.classList.add('x'+i+'y'+j);
        front.classList.add('front');
        //front.innerText = 'hello';
        back.classList.add('back');
        el.setAttribute('data-contents', '0');
        // do some stuff
        el.appendChild(back);
        el.appendChild(front);
        container.appendChild(el);
        el.appendChild(front);
      }
    }
    const boxes = document.querySelectorAll('.box');
    //console.log(boxes);
    boxes.forEach((item) => {item.addEventListener('click', makeHumanMove,); /*console.log('added click listener to '+ item);*/});
    boxes.forEach((item) => item.addEventListener('transitionstart', () => {
      if(!getCurrentPlayer().getHuman()){
        _setMovesAllowed(false);
      }
      
    }));
    boxes.forEach((item) => item.addEventListener('transitionend', () => {
      //if game is in progress
      _setMovesAllowed(true);
      clearTimeout(x);
      //setGameInProgress(true);
      if(!getCurrentPlayer().getHuman()){
        makeAIMove();
      }
      // console.log('move ended');
      
    }));
    document.querySelector('.box.x0y0').addEventListener('click', () => {console.log('test');});
  }

  const makeHumanMove = e => {
    // console.log(e);
    const box = e.target;
    //console.log(box);
    MakeMove(box);  
  }

  const MakeMove = box => {
    //box.classList.
    const coords = box.classList.toString().match(/\b\w\d\w\d/)[0];
    //const match = coords.match(/\b\w\d\w\d/)[0];
    const x = coords.charAt(1);
    const y = coords.charAt(3);
    const currentPlayer = displayController.getCurrentPlayer();
    const activeBoard = displayController.getActiveBoard().getBoardState();
    if(activeBoard[x][y] === 0 && displayController.getGameInProgress() && _getMovesAllowed()) {
      displayController.getActiveBoard().updateBoard(coords, currentPlayer.getIcon());
      displayController.swapCurrentPlayer();
      displayController.renderBoard();
      let winner = gameboard.checkEnd();
      if(winner !== false) {
        clearTimeout(x);
        document.getElementById('board-container-flipper').classList.add('full-flip');

        // scoreBlock.classList.add('flip-delay');

        if (winner === 'tie') {
          _numTies++;
          updateScore('tie', false);
          document.getElementById('tie-scorebug-container').classList.add('flip');
          // alert('You tied.');
          //document.getElementById('board-container-flipper').classList.toggle('full-flip');
          
          //document.getElementById('board-container-flipper').classList.toggle('full-flip');
        } else {
        if(winner === _playerOne.getIcon()) {
          _playerOne.incrementScore();
          document.getElementById('player-one-scorebug-container').classList.add('flip');
          updateScore(_playerOne, false);
        } else {
          _playerTwo.incrementScore();
          document.getElementById('player-two-scorebug-container').classList.add('flip');
          updateScore(_playerTwo, false);
        }
        // alert(winner+ ' wins!');
      }
        displayController.setGameInProgress(false);
        _endRender();
      } else if(!displayController.getCurrentPlayer().getHuman()) {
        displayController.makeAIMove();
      }
    }
  }

  const _fullFlip = box => {
    box.classList.add('full-flip');
    setTimeout(() => {
      // setTimeout(() => {
        setTimeout(() => {
          box.classList.remove('full-flip')
        }, 400)
      // }, 0);
  }, 700);
  }

  const _endRender = () => {
    for(let i = 0; i <= 2; i++){
      for(let j = 0; j <= 2; j++){
        let allCoords = `x${i}y${j}`;
        let allBox = document.querySelector(`.${allCoords}`);
        allBox.children[0].setAttribute('data-move-quality', 'neutral');
        allBox.children[1].setAttribute('data-move-quality', 'neutral');
      }
    }

    let winningMoves = gameboard.getWinningMoves();
        winningMoves.forEach((item) => {
          const selectedBox = document.querySelector(`.${item}`);
          selectedBox.children[0].setAttribute('data-move-quality', 'good');
        });
  };

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
