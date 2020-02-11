// create a game board using a factory

const Board = (boardState) => {
  // some functions
  let _boardStatus = boardState || [[0, 0, 0],
                                      [0, 0, 0],
                                      [0, 0, 0]];

  const getBoardState = () => _boardStatus;
  const setBoardState = boardState => _boardStatus = boardState;

  const updateBoard = (coords, icon) => {
    const x = coords.charAt(1);
    const y = coords.charAt(3);
    _boardStatus[x][y] = icon;
  };

  const getValidMoves = () => {
    // const boxes = document.querySelectorAll('.box');
    // let validMoves = [];
    // boxes.forEach((item) => {
    //   if (item.getAttribute('data-contents') === 'empty') {
    //     validMoves.push(item.classList[1]);
    //   }
    // });
    // return validMoves;
    let validMoves = [];
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if (_boardStatus[i][j] === 0) {
          validMoves.push('x'+i+'y'+j);
        }
      }
    }
    return validMoves;
  };



  const printBoardStatus = () => console.dir(_boardStatus);
  const addIcon = (icon, loc) => console.log('b');
  const checkWin = () => {
    if(_checkWinDiag() !== false) return _checkWinDiag();
    if(_checkWinHoriz() !== false ) return _checkWinHoriz();
    if(_checkWinVert() !== false) return _checkWinVert();
    return false;
    //check if a player has won
  };
  const _checkWinDiag = () => {
    const winningPlayer = _boardStatus[1][1];
    if(winningPlayer === 0) return false;
    if(_boardStatus[0][0] === _boardStatus[2][2] && _boardStatus[0][0] === winningPlayer){
      return winningPlayer;
    } else if (_boardStatus[2][0] === _boardStatus[0][2] && _boardStatus[2][0] === winningPlayer){
      return winningPlayer;
    } else return false;
  };

  const _checkWinHoriz = () => {
    let winningPlayer = 0;
    for(let i = 0; i < 3; i++) {
      winningPlayer = _boardStatus[i][0];
      if(winningPlayer !== 0) {
        if(winningPlayer === _boardStatus[i][1] && winningPlayer === _boardStatus[i][2]) {
          console.log('horiz win, row '+i);
          return winningPlayer;
        }
      }
    }
    return false;
  }

  const _checkWinVert = () => {
    let winningPlayer = 0;
    for(let i = 0; i < 3; i++) {
      winningPlayer = _boardStatus[0][i];
      if(winningPlayer !== 0) {
        if(winningPlayer === _boardStatus[1][i] && winningPlayer === _boardStatus[2][i]) {
          console.log('vert win, column '+i);
          return winningPlayer;
        }
      }
    }
    return false;
  }

  const resetInternalBoard = () => {
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        _boardStatus[i][j] = 0;
      }
    }
  };

  const resetBoard = () => {
    
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        const boxes = document.querySelectorAll('.box');
        boxes.forEach((item) => {
          item.setAttribute('data-contents', 'empty');
          item.innerText = '';
        });
        _boardStatus[i][j] = 0;

      }
    }
  }

  return {
    //boardStatus,
    getBoardState,
    setBoardState,
    updateBoard,
    printBoardStatus,
    addIcon,
    getValidMoves,
    checkWin,
    resetInternalBoard,
    resetBoard,
    // those public functions again
  };
};

// allow players to add marks to a specific spot on the game board and 
// attach it to the DOM

// check if the game is over

// and the ability to put in names including a button to start or restart the game

// create an AI

//let gameboard = [];

const Board2 = (boardInp) => {
  let _boardState = boardInp || [[0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]];
  const getBoardState = () => _boardState;
  const setBoardState = inp => _boardState = inp; 
  const updateBoard = (coords, icon) => {
    const x = coords.charAt(1);
    const y = coords.charAt(3);
    _boardState[x][y] = icon;
  };

  const getValidMoves = () => {
    let validMoves = [];
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if (_boardState[i][j] === 0) {
          validMoves.push('x'+i+'y'+j);
        }
      }
    }
    return validMoves;
  };

  const checkWin = () => {
    if(_checkWinDiag() !== false) return _checkWinDiag();
    if(_checkWinHoriz() !== false ) return _checkWinHoriz();
    if(_checkWinVert() !== false) return _checkWinVert();
    return false;
    //check if a player has won
  };
  const _checkWinDiag = () => {
    const winningPlayer = _boardState[1][1];
    if(winningPlayer === 0) return false;
    if(_boardState[0][0] === _boardState[2][2] && _boardState[0][0] === winningPlayer){
      return winningPlayer;
    } else if (_boardState[2][0] === _boardState[0][2] && _boardState[2][0] === winningPlayer){
      return winningPlayer;
    } else return false;
  };

  const _checkWinHoriz = () => {
    let winningPlayer = 0;
    for(let i = 0; i < 3; i++) {
      winningPlayer = _boardState[i][0];
      if(winningPlayer !== 0) {
        if(winningPlayer === _boardState[i][1] && winningPlayer === _boardState[i][2]) {
          console.log('horiz win, row '+i);
          return winningPlayer;
        }
      }
    }
    return false;
  }

  const _checkWinVert = () => {
    let winningPlayer = 0;
    for(let i = 0; i < 3; i++) {
      winningPlayer = _boardState[0][i];
      if(winningPlayer !== 0) {
        if(winningPlayer === _boardState[1][i] && winningPlayer === _boardState[2][i]) {
          console.log('vert win, column '+i);
          return winningPlayer;
        }
      }
    }
    return false;
  }

  const resetBoard = () => {
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        _boardState[i][j] = 0;
      }
    }
  };

  return {
    // getName,
    // setName,
    // getIcon,
    // getHuman,
    // setHuman,
    getBoardState,
    setBoardState,
    updateBoard,
    getValidMoves,
    checkWin,
    resetBoard,

  }
};

