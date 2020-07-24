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

//AUDIO ----------
coinSound = new Audio("audio/coinSound.mp3");
coinSound.volume = 0.4;

itemSound = new Audio("audio/itemSound.mp3");
itemSound.volume = 0.4;

jumpSound = new Audio("audio/jumpSound.mp3");
jumpSound.volume = 0.4;

loseLifeSound = new Audio("audio/loseLifeSound.mp3");
loseLifeSound.volume = 0.4;

gameOverSound = new Audio("audio/gameOverSound.mp3");
gameOverSound.volume = 0.4;

levelSound = new Audio("audio/levelSound.mp3");
levelSound.volume = 0.2;
