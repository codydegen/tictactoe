// create a game boardusing a module

const gameboard = (() => {
  // some functions
  const _boardStatus = [[0, 0, 0],
                       [0, 0, 0],
                       [0, 0, 0]];

  const updateBoard = (x, y, icon) => {
    _boardStatus[x][y] = icon;
  }
  const printBoardStatus = () => console.dir(_boardStatus);
  const addIcon = (icon, loc) => console.log('b');
  return {
    //boardStatus,
    updateBoard,
    printBoardStatus,
    addIcon,

    // those functions again
  };
})();

// create a display controller using a module

const displayController = (() => {

  // some functions

  return {
    // public functions go here
  };
})();

// create a player using a factory

const Player = (name, icon) => {
  const checkName = () => name;
  const rename = newName => name = newName;

  return {
    checkName,
    rename,
  }
};

let playerOne = Player('bob', 'x');
let playerTwo = Player('fred', 'o');

playerOne.rename('john');
console.log(playerOne.checkName());
gameboard.printBoardStatus();
//console.log(gameboard._boardStatus);


// write a JavaScript function that will render the contents of 
// the gameboard array to the webpage
function renderArray(){
  const container = document.getElementById('boardContainer');
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){

      let el = document.createElement('div');
      el.classList.add('box');
      // do some stuff
      container.appendChild(el);
    }
  }
  const boxes = document.querySelectorAll('.box');
  boxes.forEach((item) => item.addEventListener('click', placeHolderFunction));
}

function placeHolderFunction(){
  
}

renderArray();
// allow players to add marks to a specific spot on the game board and 
// attach it to the DOM

// check if the game is over

// and the ability to put in names including a button to start or restart the game

// create an AI

//let gameboard = [];