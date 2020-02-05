// create a player using a factory

const Player = (name, icon, human) => {
  const getName = () => name;
  const setName = newName => name = newName;
  const getIcon = () => icon;
  const getHuman = () => human;
  const setHuman = newHuman => human = newHuman;

  return {
    getName,
    setName,
    getIcon,
    getHuman,
    setHuman,
  }
};

// allow players to add marks to a specific spot on the game board and 
// attach it to the DOM

// check if the game is over

// and the ability to put in names including a button to start or restart the game

// create an AI

//let gameboard = [];