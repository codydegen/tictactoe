/* 
Board is the gameboard that's being analyzed,
depth is the number of moves that are being searched.  For tic-tac-toe this is a trivial amount but for a larger game it may be of concern.
Maximizing player is the player who is currently trying to make the best move
topLevel is a check to see if this is the outermost loop or a recursive loop. The outermost loop returns additional information.
*/
function minimax(board, depth, maximizingPlayer, topLevel) {
  let endState = board.checkEnd();
  let vm = board.getValidMoves().length;
  // check if the board analyzed is an end state
  if (depth === 0 || vm === 0 || endState !== false) {
    let finalScore;
    if (endState === 'tie') {
      finalScore = {score: 0};
    } else if (endState === 'x') {
      finalScore = {score: 1000+depth}; 
    } else if (endState === 'o') {
      finalScore = {score: -1000-depth};
    } else {
      // shouldn't ever be hit but if i reuse this for more complicated game it may be
      alert('depth reached');
    }
    finalScore.index = -1;
    if(topLevel) return [finalScore];
    return finalScore;
  }
  const validMoves = board.getValidMoves();
  let moves = [];
// use recursion to analyze every possible move and its end state
  if (maximizingPlayer) {
    let maxEval = -Infinity;
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

  // once the moves are all analyzed, determine the best move and return that.
  // if multiple moves have the same value, return a random one from that set
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
    // console.log(bestMoveList);
    moves.sort((a,b) => (a.score < b.score) ? 1 : -1);
    moves.unshift(randomBestMove);

    return moves;
  } else {
  return randomBestMove;
  }
};