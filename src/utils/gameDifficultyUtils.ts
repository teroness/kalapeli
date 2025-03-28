
export const updateDifficulty = (
  score: number,
  difficulty: number,
  setDifficulty: (difficulty: number) => void
): void => {
  if (score > 0 && score % 500 === 0 && difficulty < 10) {
    const newDifficulty = Math.min(difficulty + 1, 10);
    setDifficulty(newDifficulty);
  }
};
