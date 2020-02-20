function minimax(board, depth, maximizingPlayer, topLevel) {
  let endState = board.checkEnd();
  let vm = board.getValidMoves().length;
  if (depth === 0 || vm === 0 || endState !== false) {
    if (endState === 'tie') {
      return {score: 0};
    } else if (endState === 'x') {
      return {score: 10}; 
    } else if (endState === 'o') {
      return {score: -10};
    } else {
      alert('depth reached');
    }
  }
  const validMoves = board.getValidMoves();
  let moves = [];

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
  let bestMoveList = [];
  let bestMove = {};
  if (maximizingPlayer) {
    bestMove.score = -Infinity;
    bestMove.index = '';
    for(let  i=0; i<moves.length; i++) {
      if(moves[i].score > bestMove.score){
        bestMoveList = [];
        bestMove.score = moves[i].score;
        bestMove.index = moves[i].index;
        bestMoveList.push(bestMove);
      } else if (moves[i].score === bestMove.score) {
        bestMoveList.push(moves[i]);
      }
    }
  } else {
    bestMove.score = Infinity;
    bestMove.index = '';
    for(let  i=0; i<moves.length; i++) {
      if(moves[i].score < bestMove.score){
        bestMoveList = [];
        bestMove.score = moves[i].score;
        bestMove.index = moves[i].index;
        bestMoveList.push(bestMove);
      } else if (moves[i].score === bestMove.score) {
        bestMoveList.push(moves[i]);
      }
    }
  }
  const randomBestMove = bestMoveList[Math.floor(Math.random()*bestMoveList.length)];
  if(topLevel) {
    console.log(bestMoveList);
    moves.unshift(randomBestMove);
    return moves;
  } else {
  return randomBestMove;
  }
};