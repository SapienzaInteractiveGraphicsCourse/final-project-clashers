export function resetStartingPosition(character) {
  character.position.set(0, -14.3, -620);
  dirLight.position.set(0, 100, -620);
  camera.position.set(-100, 0, -620);
  torso.rotation.y = 0;

  dPressed = false;
  aPressed = false;
  spacePressed = false;
  isRotatedRight = true;
  isWalking = false;
  isJumping = false;
  isJumpingLeft = false;
  isJumpingRight = false;

  isFalling = false;

  collidedLeft = false;
  collidedRight = false;
  collidedTop1 = false;
  collidedTop2 = false;
  collidedBottom = false;
  collidedSide = false;
  collidedTopPipe = false;
  collidedTopStairs = false;

  groupRun.removeAll();
  groupRotate.removeAll();
  groupJump.removeAll();
}
