// create a game board using a factory
const Board = (boardInp) => {
  let _boardState;
  if(boardInp === undefined){
    _boardState = [[0, 0, 0],
                       [0, 0, 0],
                       [0, 0, 0]];
  } else {
    _boardState = JSON.parse(JSON.stringify(boardInp));;
  }
  
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

  const checkEnd = () => {
    if(_checkWinDiag('player') !== false) return _checkWinDiag('player');
    if(_checkWinHoriz('player') !== false ) return _checkWinHoriz('player');
    if(_checkWinVert('player') !== false) return _checkWinVert('player');
    if(_checkTie() !== false) return _checkTie();
    return false;
    //check if a player has won
  };

  const _checkWinDiag = (mode) => {
    const winningPlayer = _boardState[1][1];
    if(winningPlayer === 0) return false;
    if(_boardState[0][0] === _boardState[2][2] && _boardState[0][0] === winningPlayer){
      if(mode === 'player') {
        return winningPlayer;
      } else {
        let moves = [`x0y0`, `x1y1`, `x2y2`];
        return moves;
      }
    } else if (_boardState[2][0] === _boardState[0][2] && _boardState[2][0] === winningPlayer){
      if(mode === 'player') {
        return winningPlayer;
      } else {
        let moves = [`x2y0`, `x1y1`, `x0y2`];
        return moves;
      }
    } else return false;
  };

  const _checkWinHoriz = (mode) => {
    let winningPlayer = 0;
    for(let i = 0; i < 3; i++) {
      winningPlayer = _boardState[i][0];
      if(winningPlayer !== 0) {
        if(winningPlayer === _boardState[i][1] && winningPlayer === _boardState[i][2]) {
          //console.log('horiz win, row '+i);
          if(mode === 'player') {
            return winningPlayer;
          } else {
            let moves = [`x${i}y0`, `x${i}y1`, `x${i}y2`];
            return moves;
          }
        }
      }
    }
    return false;
  }

  const _checkWinVert = (mode) => {
    let winningPlayer = 0;
    for(let i = 0; i < 3; i++) {
      winningPlayer = _boardState[0][i];
      if(winningPlayer !== 0) {
        if(winningPlayer === _boardState[1][i] && winningPlayer === _boardState[2][i]) {
          //console.log('vert win, column '+i);
          if(mode === 'player') {
            return winningPlayer;
          } else {
            let moves = [`x0y${i}`, `x1y${i}`, `x2y${i}`];
            return moves;
          }
        }
      }
    }
    return false;
  }

  const _checkTie = () => {
    return getValidMoves().length === 0 ? 'tie' : false;
  }

  const getWinningMoves = () => {
    let winningMoves = [];
    if(!checkEnd()) return winningMoves;
    if(_checkWinDiag('player') !== false) return _checkWinDiag('moves');
    if(_checkWinHoriz('player') !== false ) return _checkWinHoriz('moves');
    if(_checkWinVert('player') !== false) return _checkWinVert('moves');
    return winningMoves;
  };

  const resetBoard = () => {
  _boardState = [[0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]];
  };

  return {
    getBoardState,
    setBoardState,
    updateBoard,
    getValidMoves,
    checkEnd,
    resetBoard,
    getWinningMoves,
  }
};

