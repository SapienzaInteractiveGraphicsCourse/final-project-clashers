export function setPipeHeightGoal(i) {
  if (i == 0) {
    pipeHeightGoal = -6.3;
  } else if (i == 1 || i == 4 || i == 5) {
    pipeHeightGoal = -2.4;
  } else if (i == 2) {
    pipeHeightGoal = 1.7;
  } else if (i == 3) {
    pipeHeightGoal = 5.3;
  }
}
