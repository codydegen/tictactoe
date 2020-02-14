
function minimax(board, depth, maximizingPlayer, topLevel) {
  if (depth === 0 || board.getValidMoves().length === 0 || board.checkWin() !== false) {
    if (board.checkWin() === false) {
      return {score: 0};
    } else if (board.checkWin() === 'x') {
      return {score: 10}; 
    } else if (board.checkWin() === 'o') {
      return {score: -10};
    } else {
      alert('depth reached');

    }
  }
  const validMoves = board.getValidMoves();
  let moves = []

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    // for each child
    for (let  i=0; i<validMoves.length; i++){
      let move = {};
      move.index = validMoves[i];
      let testBoard = Board(board.getBoardState());
      currentPlayer = (validMoves.length) % 2 === 0 ? 'o' : 'x';
      testBoard.updateBoard(validMoves[i], currentPlayer);
      let result = minimax(testBoard, depth-1, false, false);
      move.score = Math.max(maxEval, result.score);
      //console.log(move);
      moves.push(move);
    }
  } else {
    let minEval = Infinity;
    // for each child
    for (let  i=0; i<validMoves.length; i++){
      let move = {};
      move.index = validMoves[i];
      let testBoard = Board(board.getBoardState());
      currentPlayer = (validMoves.length) % 2 === 0 ? 'o' : 'x';
      testBoard.updateBoard(validMoves[i], currentPlayer);
      
    let result = minimax(testBoard, depth-1, true, false);
    move.score = Math.min(minEval, result.score);
    //console.log(move);
    moves.push(move);
    }
  }
  //console.table(moves);
  let bestMove = {};
  if (maximizingPlayer) {
    bestMove.score = -Infinity;
    bestMove.index = '';
    for(let  i=0; i<moves.length; i++) {
      if(moves[i].score > bestMove.score){
        bestMove.score = moves[i].score;
        bestMove.index = moves[i].index;
      }
    }
  } else {
    bestMove.score = Infinity;
    bestMove.index = '';
    for(let  i=0; i<moves.length; i++) {
      if(moves[i].score < bestMove.score){
        bestMove.score = moves[i].score;
        bestMove.index = moves[i].index;
      }
    }
  }
  if(topLevel) {
    moves.unshift(bestMove);
    return moves;
  } else {
  return bestMove;
  }
};