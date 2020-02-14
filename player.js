// create a player using a factory

const Player = (name, icon, human, score) => {
  const getName = () => name;
  const setName = newName => name = newName;
  const getIcon = () => icon;
  const getHuman = () => human;
  const setHuman = newHuman => human = newHuman;
  score = this.score || 0;
  const getScore = () => score;
  const incrementScore = () => ++score;

  return {
    getName,
    setName,
    getIcon,
    getHuman,
    setHuman,
    getScore,
    incrementScore,
  }
};