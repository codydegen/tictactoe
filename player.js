// create a player using a factory

const Player = (name, icon, human, score, difficulty) => {
  const getName = () => name;
  const setName = newName => name = newName;
  const getIcon = () => icon;
  const getHuman = () => human;
  const setHuman = newHuman => human = newHuman;
  difficulty = this.difficulty || 'easy';
  const getDifficulty = () => difficulty;
  const setDifficulty = newDifficulty => difficulty = newDifficulty;
  score = this.score || 0;
  const getScore = () => score;
  const incrementScore = () => ++score;
  const resetScore = () => score = 0;

  return {
    getName,
    setName,
    getIcon,
    getHuman,
    setHuman,
    getDifficulty,
    setDifficulty,
    getScore,
    incrementScore,
    resetScore,
  }
};