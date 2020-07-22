export function setStairsHeightGoal(containerY) {
  if (containerY >= -9 && containerY <= -7) {
    stairsHeightGoal = -9.6;
  }
  if (containerY >= -2 && containerY <= -1.5) {
    stairsHeightGoal = -4;
  }
  if (containerY >= 2 && containerY <= 3) {
    stairsHeightGoal = 1.3;
  }
  if (containerY >= 7.5 && containerY <= 8.5) {
    stairsHeightGoal = 6.4;
  }
  if (containerY >= 13 && containerY <= 14) {
    stairsHeightGoal = 11;
  }
  if (containerY >= 18.5 && containerY <= 19.5) {
    stairsHeightGoal = 17;
  }
  if (containerY >= 24 && containerY <= 25) {
    stairsHeightGoal = 22;
  }
  if (containerY >= 29.5 && containerY <= 30.5) {
    stairsHeightGoal = 29;
  } else {
    stairsHeightGoal = 0;
  }
}
