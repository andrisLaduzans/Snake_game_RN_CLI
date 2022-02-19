export const spawnApple = (matrixSize: number) => {
  return {
    x: Math.floor(Math.random() * matrixSize),
    y: Math.floor(Math.random() * matrixSize),
  };
};
