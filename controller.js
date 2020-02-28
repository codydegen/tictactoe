// controls the game function and all rendering
const displayController = ((activeBoard, ties) => {
  let _gameStatus = true;
  let _movesAllowed = true;
  let _playerOne = null;
  let _playerTwo = null;
  let _currentPlayer = null;
  let _timeoutFlag;
  let _numTies = ties || 0;
  let _activeBoard = activeBoard;

  // setters and gutters
  const getCurrentPlayer = () => _currentPlayer;

  const setCurrentPlayer = (playerOne, playerTwo) => {
    _currentPlayer = playerOne;
    _playerOne = playerOne;
    _playerTwo = playerTwo;
  };

  const getActiveBoard = () => _activeBoard;
  
  const setActiveBoard = newBoard => {
    return _activeBoard = newBoard;
  };

  const setGameInProgress = status => {
    _gameStatus = status;
  };

  const getGameInProgress = () => {
    return _gameStatus;
  };

  const _setMovesAllowed = allowed => {
    _movesAllowed = allowed;
  };
  const _getMovesAllowed = () => {
    return _movesAllowed;
  };

  // game logic
  // reset the game to allow a new game to start
  const resetGame = () => {
    clearTimeout(_timeoutFlag);
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
    document.getElementById('board-container-flipper').classList.remove('full-flip');
    if (!_currentPlayer.getHuman()) {
      makeAIMove();
    }
  };

  const swapCurrentPlayer = () => {
    _currentPlayer = _currentPlayer === playerOne ? _playerTwo : _playerOne;
  };

  // carry out the functions necessary when the start game button is hit
  const _startNewGame = () => {
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('controls-container').classList.add('hidden');
    _renderNewPlayer(_playerOne);
    _renderNewPlayer(_playerTwo);
    resetGame();
  };

  // make a move on the board, if a winner is found then execute the winning script.  
  // if not, allow the next player to make a move
  const _MakeMove = box => {
    const coords = box.classList.toString().match(/\b\w\d\w\d/)[0];
    const x = coords.charAt(1);
    const y = coords.charAt(3);
    const currentPlayer = getCurrentPlayer();
    const activeBoard = getActiveBoard().getBoardState();
    if(activeBoard[x][y] === 0 && getGameInProgress() && _getMovesAllowed()) {
      getActiveBoard().updateBoard(coords, currentPlayer.getIcon());
      swapCurrentPlayer();
      renderBoard();
      let winner = gameboard.checkEnd();
      if(winner !== false) {
        _endgameSnippet(winner);
      } else if(!getCurrentPlayer().getHuman()) {
        makeAIMove();
      }
    }
  };

  // carry out the functions associated with the game being over
  const _endgameSnippet = (winner) => {
    clearTimeout(_timeoutFlag);
    document.getElementById('board-container-flipper').classList.add('full-flip');
    if (winner === 'tie') {
      _numTies++;
      document.getElementById('tie-scorebug-container').classList.add('flip');
      updateScore('tie', false);
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
    }
    setGameInProgress(false);
    _endRender();
  };

  // make a move after a small delay to allow the game to feel more organic
  const makeAIMove = () => {
    _setMovesAllowed(false);
    _timeoutFlag = setTimeout(_aiSnippet,500);
  };

// choose a move either randomly or using the minimax algorithm
  const _aiSnippet = () => {
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
      // console.table(moveList);
      const bestMove = moveList[0];
      if(bestMove.index !== -1){
        move = document.querySelector('.'+bestMove.index);
      } else {
        return;
      }
    }
    _setMovesAllowed(true);
    clearTimeout(_timeoutFlag);
    _MakeMove(move);
  };

  // put a move in the box clicked by the human
  const makeHumanMove = e => {
    const box = e.target;
    _MakeMove(box);  
  };

  //update the score of the score blocks.  newName is a flag to determine 
  // if a new name is chosen so the score can be reset for that person
  const updateScore = (winner, newName) => {
    let scoreBlock;
    let score;
    if (winner === 'tie') {
        scoreBlock = document.getElementById('tie-score');
        score = _numTies;
    } else {
    if (winner === _playerOne) {
      scoreBlock = document.getElementById('player-one-score');
    } else if (winner === _playerTwo) {
      scoreBlock = document.getElementById('player-two-score');
    }    
    score = winner.getScore();
  }

  // this function is used both at the end of the game and if a player 's name is changed.  
  // a timeout is set to make the animation more smooth when necessary.
  let timeout = newName ? 0 : 2500;
  setTimeout(() => {scoreBlock.innerText = score;}, timeout);
};

// analyze the board for the best possible moves and show those to the player
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
      _printAnalysis(item);
    }
  });
};

  // DOM manipulation
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

  // render the new player score bug and display
  const _renderNewPlayer = player => {
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

  // swap between the gameboard and main menu
  const _returnToMainMenu = () => {
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('controls-container').classList.remove('hidden');
  }

  // print the results of the analysis of each of the possible moves
  const _printAnalysis = (item) => {
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

  // animate the full flip of individual boxes associated with printing the analysis
  const _fullFlip = box => {
    box.classList.add('full-flip');
    setTimeout(() => {
      // setTimeout(() => {
        setTimeout(() => {
          box.classList.remove('full-flip')
        }, 400)
      // }, 0);
  }, 700);
  };

  // initialize all the event listeners for the buttons
  const _eventListenerInit = () => {
    const resetButton = document.getElementById('reset-board');
    resetButton.addEventListener('click', resetGame);

    const boardAnalysis = document.getElementById('board-analysis');
    boardAnalysis.addEventListener('click', analyzeBoard);

    const startButton = document.getElementById('start-game');
    startButton.addEventListener('click', _startNewGame);
    //const 
    const mainMenu = document.getElementById('main-menu');
    mainMenu.addEventListener('click', _returnToMainMenu);

  const playerOneDifficulty = document.querySelector('#computer-difficulty-one').childNodes;
  playerOneDifficulty.forEach((item) => item.addEventListener('click', function(){
    _toggleDifficulty(item, 'one')}));

  const playerTwoDifficulty = document.querySelector('#computer-difficulty-two').childNodes;
  playerTwoDifficulty.forEach((item) => item.addEventListener('click', function(){
    _toggleDifficulty(item, 'two')}));

  const playerOneToggle = document.querySelector('#human-computer-toggle-one').childNodes;
    playerOneToggle.forEach((item) => item.addEventListener('click', function(){
      _toggleHuman(item, 'one')}));
    
  const playerTwoToggle = document.querySelector('#human-computer-toggle-two').childNodes;
    playerTwoToggle.forEach((item) => item.addEventListener('click', function(){
      _toggleHuman(item, 'two')}));


  };

  //helper function to toggle difficulty
  const _toggleDifficulty = (e, set) => {
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

  // helper function to toggle human versus computer
  const _toggleHuman = (e, set) => {
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

  // render the gameboard to start
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
        el.classList.add('flipper');
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
      clearTimeout(_timeoutFlag);
      //setGameInProgress(true);
      if(!getCurrentPlayer().getHuman()){
        makeAIMove();
      }
      // console.log('move ended');
      
    }));
    document.querySelector('.box.x0y0').addEventListener('click', () => {console.log('test');});
    _eventListenerInit();
  };

  // do the data manipulation associated with the end game
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

  // create the score blocks
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
    if (_isObject(player)) {
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
  };

  // helper method
  const _isObject = a => a != null && a.constructor === Object;

  return {
    //setters and getters
    getCurrentPlayer,
    setCurrentPlayer,
    getActiveBoard,
    setActiveBoard,
    setGameInProgress,
    getGameInProgress,

    //game logic
    resetGame,
    swapCurrentPlayer,
    makeHumanMove,
    makeAIMove,
    updateScore,

    //DOM manipulation
    renderBoard,
    render,
  };
})();

