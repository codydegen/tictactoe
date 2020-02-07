
function minimax(board, depth, maximizingPlayer) {
  if (depth === 0 || board.getValidMoves().length === 0 || board.checkWin() !== false) {
    if (board.checkWin() === false) {
      return 0;
    } else if (board.checkWin() === 'x') {
      return 10; 
    } else if (board.checkWin() === 'o') {
      return -10;
    } else {
      alert('depth reached');

    }
  }
  const validMoves = board.getValidMoves();
  if (maximizingPlayer) {
    let maxEval = -Infinity;
    // for each child
    for (let  i=0; i<validMoves.length; i++){
      let testBoard = Board(board.getBoardState());
      currentPlayer = (validMoves.length+i) % 2 === 0 ? 'o' : 'x';
      testBoard.updateBoard(validMoves[i], currentPlayer);
      let eval = minimax(testBoard, depth-1, false);
      maxEval = Math.max(maxEval, eval);
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    // for each child
    for (let  i=0; i<validMoves.length; i++){
      let testBoard = Board(board.getBoardState());
      currentPlayer = (validMoves.length+i) % 2 === 0 ? 'o' : 'x';
      testBoard.updateBoard(validMoves[i], currentPlayer);
    let eval = minimax(testBoard, depth-1, true);
    minEval = Math.min(minEval, eval);
    }
    return minEval;
  }
};

// 