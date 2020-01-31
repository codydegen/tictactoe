// create a player using a factory

const Player = (name, icon) => {
  const checkName = () => name;
  const rename = newName => name = newName;
  const checkIcon = () => icon;

  return {
    checkName,
    rename,
    checkIcon,
  }
};

// allow players to add marks to a specific spot on the game board and 
// attach it to the DOM

// check if the game is over

// and the ability to put in names including a button to start or restart the game

// create an AI

//let gameboard = [];