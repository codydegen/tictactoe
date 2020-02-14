// create a game board using a factory
class Board {
  constructor(boardState) {
    if(boardState === undefined){
      this.boardState = [[0, 0, 0],
                         [0, 0, 0],
                         [0, 0, 0]];
    } else {
      this.boardState = JSON.parse(JSON.stringify(boardState));;
    }
  }

  getBoardState() {
    return this.boardState;
  }

  setBoardState( value ) {
    this.boardState = value;
  }

  updateBoard(coords, icon) {
    const x = coords.charAt(1);
    const y = coords.charAt(3);
    this.boardState[x][y] = icon;
  }

  resetBoard() {
    // for(let i = 0; i < 3; i++) {
    //   for(let j = 0; j < 3; j++) {
    //     _boardState[i][j] = 0;
    //   }
    // }
  _boardState = [[0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]];
  };

}


const Board2 = (boardInp) => {
  let _boardState;
  if(boardInp === undefined){
    _boardState = [[0, 0, 0],
                       [0, 0, 0],
                       [0, 0, 0]];
  } else {
    _boardState = JSON.parse(JSON.stringify(boardInp));;
  }
  
  // let _boardState = JSON.parse(JSON.stringify(boardInp)) || [[0, 0, 0],
  // [0, 0, 0],
  // [0, 0, 0]];
  const getBoardState = () => _boardState;
  const setBoardState = inp => _boardState = inp; 
  const updateBoard = (coords, icon) => {
    const x = coords.charAt(1);
    const y = coords.charAt(3);
    _boardState[x][y] = icon;
  };
  const boardState = _boardState;

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
          //console.log('horiz win, row '+i);
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
          //console.log('vert win, column '+i);
          return winningPlayer;
        }
      }
    }
    return false;
  }

  const resetBoard = () => {
    // for(let i = 0; i < 3; i++) {
    //   for(let j = 0; j < 3; j++) {
    //     _boardState[i][j] = 0;
    //   }
    // }
  _boardState = [[0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]];
  };

  return {
    // getName,
    // setName,
    // getIcon,
    // getHuman,
    // setHuman,
    _boardState,
    // boardState,
    getBoardState,
    setBoardState,
    updateBoard,
    getValidMoves,
    checkWin,
    resetBoard,

  }
};

