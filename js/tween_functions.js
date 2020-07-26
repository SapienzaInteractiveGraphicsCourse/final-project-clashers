import TWEEN from "../build/tween.js-master/dist/tween.esm.js";

export function fall(character) {
  isFalling = true;
  var timeFall = 400;
  if (character.position.y == 36) {
    timeFall = 900;
  }

  if (collidedBottom && character.position.y < 10) {
    timeFall = 600;
  }

  if (
    collidedBottom &&
    character.position.y > 10 &&
    character.position.y < 36
  ) {
    timeFall = 1500;
  }
  if (character == yoshi || character == luigi) {
    tweenStartFall = {
      y: character.position.y,
      x_left: upperLeg_left.rotation.x,
      x_right: upperLeg_right.rotation.x,
      x_leftArm: upperArm_left.rotation.x,
      x_rightArm: upperArm_right.rotation.x,
      lowerLeg_right: lowerLeg_right.rotation.x,
      lowerLeg_left: lowerLeg_left.rotation.x,
      rightArm_rotation_z: (45 * Math.PI) / 180,
      rightHand_rotation_y: handRight.rotation.y,
      spine: spine.rotation.x,
      head: head.rotation.x,
    };
    tweenGoalFall = {
      y: -14.3,
      x_left: (-180 * Math.PI) / 180,
      x_right: (0 * Math.PI) / 180,
      x_leftArm: (0 * Math.PI) / 180,
      x_rightArm: (0 * Math.PI) / 180,
      lowerLeg_right: (0 * Math.PI) / 180,
      lowerLeg_left: (0 * Math.PI) / 180,

      rightArm_rotation_z: (45 * Math.PI) / 180,
      rightHand_rotation_y: (90 * Math.PI) / 180,
      spine: (0 * Math.PI) / 180,
      head: (0 * Math.PI) / 180,
    };
  }
  if (character == mario) {
    tweenStartFall = {
      y: character.position.y,
      x_left: upperLeg_left.rotation.x,
      x_right: upperLeg_right.rotation.x,
      x_leftArm: upperArm_left.rotation.x,
      x_rightArm: upperArm_right.rotation.x,
      lowerLeg_right: lowerLeg_right.rotation.x,
      lowerLeg_left: lowerLeg_left.rotation.x,
      rightHand_rotation_y: handRight.rotation.y,
      spine: spine.rotation.x,
      head: head.rotation.x,
    };
    tweenGoalFall = {
      y: -14.3,
      x_left: (0 * Math.PI) / 180,
      x_right: (0 * Math.PI) / 180,
      x_leftArm: (45 * Math.PI) / 180,
      x_rightArm: (45 * Math.PI) / 180,
      lowerLeg_right: (0 * Math.PI) / 180,
      lowerLeg_left: (0 * Math.PI) / 180,
      rightHand_rotation_y: (0 * Math.PI) / 180,
      spine: (0 * Math.PI) / 180,
      head: (0 * Math.PI) / 180,
    };
  }

  tweenFall = new TWEEN.Tween(tweenStartFall)
    .to(tweenGoalFall, timeFall)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      if (collidedTop1) {
        spine.rotation.x = (0 * Math.PI) / 180;
        head.rotation.x = (0 * Math.PI) / 180;

        lowerLeg_right.rotation.x = (0 * Math.PI) / 180;
        lowerLeg_left.rotation.x = (0 * Math.PI) / 180;

        if (character == yoshi || character == luigi) {
          upperArm_left.rotation.x = (0 * Math.PI) / 180;
          upperArm_right.rotation.x = (0 * Math.PI) / 180;
          upperLeg_left.rotation.x = (-180 * Math.PI) / 180;
          upperLeg_right.rotation.x = (0 * Math.PI) / 180;
          handRight.rotation.y = (90 * Math.PI) / 180;
          handLeft.rotation.y = (90 * Math.PI) / 180;
        }

        if (character == mario) {
          upperArm_left.rotation.x = (45 * Math.PI) / 180;
          upperArm_right.rotation.x = (45 * Math.PI) / 180;
          upperLeg_left.rotation.x = (0 * Math.PI) / 180;
          upperLeg_right.rotation.x = (0 * Math.PI) / 180;
          handRight.rotation.y = (0 * Math.PI) / 180;
          handLeft.rotation.y = (0 * Math.PI) / 180;
        }

        tweenFall.stop();
        character.position.y = 12;
        collidedTop1 = false;
      } else if (collidedTopStairs) {
        character.position.y = stairsHeightGoal;
        tweenFall.stop();
      } else {
        character.position.y = tweenStartFall.y;
        spine.rotation.x = tweenStartFall.spine;
        head.rotation.x = tweenStartFall.head;

        upperLeg_left.rotation.x = tweenStartFall.x_left;
        upperLeg_right.rotation.x = tweenStartFall.x_right;

        lowerLeg_right.rotation.x = tweenStartFall.lowerLeg_right;
        lowerLeg_left.rotation.x = tweenStartFall.lowerLeg_left;

        upperArm_left.rotation.x = tweenStartFall.x_leftArm;
        upperArm_right.rotation.x = tweenStartFall.x_rightArm;

        if (character == yoshi || character == luigi) {
          upperArm_left.rotation.z = tweenStartFall.rightArm_rotation_z;
          upperArm_right.rotation.z = tweenStartFall.rightArm_rotation_z;
        }
        camera.position.y = (character.position.y - camera.position.y) * 0.7;

        handRight.rotation.y = tweenStartFall.rightHand_rotation_y;
        handLeft.rotation.y = tweenStartFall.rightHand_rotation_y;
      }
    })
    .onStop(function () {
      collidedBottom = false;
      isJumping = false;
      isFalling = false;
      groupCollision = false;

      collidedLeft = false;
      collidedRight = false;
    })
    .onComplete(function () {
      isJumping = false;
      collidedBottom = false;
      isFalling = false;
      groupCollision = false;

      collidedLeft = false;
      collidedRight = false;
    })
    .start();
}

export function setAnimationParameters(character) {
  if (character == yoshi || character == luigi) {
    tweenStartScale = {
      x_left: upperLeg_left.rotation.x,
      x_right: upperLeg_right.rotation.x,
      x_leftArm: upperArm_left.rotation.x,
      x_rightArm: upperArm_right.rotation.x,
      lowerLeg_right: lowerLeg_right.rotation.x,
      lowerLeg_left: lowerLeg_left.rotation.x,
      rightArm_rotation_z: (45 * Math.PI) / 180,
      rightHand_rotation_y: handRight.rotation.y,
      spine: spine.rotation.x,
      head: head.rotation.x,
    };
    tweenGoalScale = {
      x_left: (-225 * Math.PI) / 180,
      x_right: (45 * Math.PI) / 180,
      x_leftArm: (45 * Math.PI) / 180,
      x_rightArm: (-45 * Math.PI) / 180,
      spine: (10 * Math.PI) / 180,
      head: (-10 * Math.PI) / 180,
    };
    tweenBackScale = {
      x_left: (-135 * Math.PI) / 180,
      x_right: (-45 * Math.PI) / 180,
      x_leftArm: (-45 * Math.PI) / 180,
      x_rightArm: (45 * Math.PI) / 180,
    };
    tweenIdle = {
      x_left: (-180 * Math.PI) / 180,
      x_right: (0 * Math.PI) / 180,
      x_leftArm: (0 * Math.PI) / 180,
      x_rightArm: (0 * Math.PI) / 180,
      lowerLeg_right: (0 * Math.PI) / 180,
      lowerLeg_left: (0 * Math.PI) / 180,

      rightArm_rotation_z: (45 * Math.PI) / 180,
      rightHand_rotation_y: (90 * Math.PI) / 180,
      spine: (0 * Math.PI) / 180,
      head: (0 * Math.PI) / 180,
    };
  }
  if (character == mario) {
    tweenStartScale = {
      x_left: upperLeg_left.rotation.x,
      x_right: upperLeg_right.rotation.x,
      lowerLeg_right: lowerLeg_right.rotation.x,
      lowerLeg_left: lowerLeg_left.rotation.x,
      x_leftArm: upperArm_left.rotation.x,
      x_rightArm: upperArm_right.rotation.x,
      z_leftArm: upperArm_left.rotation.z,
      z_rightArm: upperArm_right.rotation.z,
      rightHand_rotation_y: handRight.rotation.y,
      spine: spine.rotation.x,
      head: head.rotation.x,
    };
    tweenGoalScale = {
      x_left: (-45 * Math.PI) / 180,
      x_right: (45 * Math.PI) / 180,
      z_leftArm: (-45 * Math.PI) / 180,
      z_rightArm: (-45 * Math.PI) / 180,
      spine: (10 * Math.PI) / 180,
      head: (-10 * Math.PI) / 180,
    };
    tweenBackScale = {
      x_left: (45 * Math.PI) / 180,
      x_right: (-45 * Math.PI) / 180,
      z_leftArm: (45 * Math.PI) / 180,
      z_rightArm: (45 * Math.PI) / 180,
    };
    tweenIdle = {
      x_left: (0 * Math.PI) / 180,
      x_right: (0 * Math.PI) / 180,
      lowerLeg_right: (0 * Math.PI) / 180,
      lowerLeg_left: (0 * Math.PI) / 180,
      x_leftArm: (45 * Math.PI) / 180,
      x_rightArm: (45 * Math.PI) / 180,
      z_leftArm: (0 * Math.PI) / 180,
      z_rightArm: (0 * Math.PI) / 180,
      rightHand_rotation_y: (0 * Math.PI) / 180,
      spine: (0 * Math.PI) / 180,
      head: (0 * Math.PI) / 180,
    };
  }
}

export function performAnimation(direction, character) {
  dir = direction;
  groupCollision = false;
  isCoin = false;
  setAnimationParameters(character);

  tween = new TWEEN.Tween(tweenStartScale, groupRun)
    .to(tweenGoalScale, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      upperLeg_left.rotation.x = tweenStartScale.x_left;
      upperLeg_right.rotation.x = tweenStartScale.x_right;

      spine.rotation.x = tweenStartScale.spine;
      head.rotation.x = tweenStartScale.head;

      if (character == yoshi || character == luigi) {
        upperArm_left.rotation.x = tweenStartScale.x_leftArm;
        upperArm_right.rotation.x = tweenStartScale.x_rightArm;
      }

      if (character == mario) {
        upperArm_left.rotation.z = tweenStartScale.z_leftArm;
        upperArm_right.rotation.z = tweenStartScale.z_rightArm;
      }

      if (direction == "right" && !collidedLeft) {
        character.position.z += 0.2;
        dirLight.position.z += 0.2;
      }

      if (collidedLeft) {
        character.position.z = currentPosition;
      }

      if (collidedRight) {
        character.position.z = currentPosition;
      }

      if (direction == "left" && !collidedRight) {
        character.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }
      camera.position.z += character.position.z - camera.position.z;
    })
    .start();

  tweenBack = new TWEEN.Tween(tweenStartScale, groupRun)
    .to(tweenBackScale, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      upperLeg_left.rotation.x = tweenStartScale.x_left;
      upperLeg_right.rotation.x = tweenStartScale.x_right;

      spine.rotation.x = tweenStartScale.spine;
      head.rotation.x = tweenStartScale.head;

      if (character == yoshi || character == luigi) {
        upperArm_left.rotation.x = tweenStartScale.x_leftArm;
        upperArm_right.rotation.x = tweenStartScale.x_rightArm;
      }

      if (character == mario) {
        upperArm_left.rotation.z = tweenStartScale.z_leftArm;
        upperArm_right.rotation.z = tweenStartScale.z_rightArm;
      }

      if (direction == "right" && !collidedLeft) {
        character.position.z += 0.2;
        dirLight.position.z += 0.2;
      }

      if (direction == "left" && !collidedRight) {
        character.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }
      camera.position.z += character.position.z - camera.position.z;
    })
    .yoyo(true)
    .repeat(Infinity);
  tween.chain(tweenBack);
}

export function rotateTorso(direction) {
  tweenStartLeft = {
    y_leftRotation: torso.rotation.y,
  };
  tweenGoalLeft = {
    y_leftRotation: (-180 * Math.PI) / 180,
  };
  tweenStartRight = {
    y_rightRotation: torso.rotation.y,
  };
  tweenGoalRight = {
    y_rightRotation: (0 * Math.PI) / 180,
  };
  if (direction == "left") {
    var tweenLeft = new TWEEN.Tween(tweenStartLeft, groupRotate)
      .to(tweenGoalLeft, 400)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function () {
        torso.rotation.y = tweenStartLeft.y_leftRotation;
      })
      .start();
  }
  if (direction == "right") {
    var tweenRight = new TWEEN.Tween(tweenStartRight, groupRotate)
      .to(tweenGoalRight, 400)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function () {
        torso.rotation.y = tweenStartRight.y_rightRotation;
      })
      .start();
  }
}

export function jump(character) {
  isCoin = false;
  collidedTopPipe = false;
  collidedTopStairs = false;
  jumpSound.currentTime = 0;
  jumpSound.play();
  var timeJumpBack = 1000;
  if (character.position.y == 36) {
    timeJumpBack = 1500;
  }
  if (isCoin) {
    timeJumpBack = 3000;
  }
  if (character == yoshi || character == luigi) {
    tweenStartJump = {
      y: character.position.y,

      upperLeg_right: (-45 * Math.PI) / 180,
      upperLeg_left: (-225 * Math.PI) / 180,
      lowerLeg: (75 * Math.PI) / 180,
      spine: (30 * Math.PI) / 180,
      head: (-15 * Math.PI) / 180,
    };
    tweenGoalJump = {
      y: tweenStartJump.y + 29.3,

      upperLeg_right: (0 * Math.PI) / 180,
      lowerLeg: (0 * Math.PI) / 180,
      spine: (0 * Math.PI) / 180,
      head: (0 * Math.PI) / 180,
      upperLeg_left: (-180 * Math.PI) / 180,
    };
    tweenGoalJumpBack = {
      y: -14.3,

      upperLeg_right: (0 * Math.PI) / 180,
      lowerLeg: (0 * Math.PI) / 180,
      upperLeg_left: (-180 * Math.PI) / 180,
      spine: (0 * Math.PI) / 180,
      head: (0 * Math.PI) / 180,
    };
    tweenStartFlex = {
      upperLeg_right: upperLeg_right.rotation.x,
      upperLeg_left: upperLeg_left.rotation.x,
      lowerLeg: lowerLeg_right.rotation.x,
      spine: spine.rotation.x,
      head: head.rotation.x,
      y: character.position.y,
    };
    tweenGoalFlex = {
      upperLeg_right: (-45 * Math.PI) / 180,
      upperLeg_left: (-225 * Math.PI) / 180,
      lowerLeg: (75 * Math.PI) / 180,
      spine: (30 * Math.PI) / 180,
      head: (-15 * Math.PI) / 180,
      y: -14.6,
    };
    tweenStartRaise = {
      rightArm_rotation_z: (45 * Math.PI) / 180,
      rightHand_rotation_y: handRight.rotation.y,
    };
    tweenGoalRaise = {
      rightArm_rotation_z: (-60 * Math.PI) / 180,
      rightHand_rotation_y: (0 * Math.PI) / 180,
    };
    tweenGoalLower = {
      rightArm_rotation_z: (45 * Math.PI) / 180,
      rightHand_rotation_y: (90 * Math.PI) / 180,
    };
  }
  if (character == mario) {
    tweenStartJump = {
      y: character.position.y,
      rightArm_rotation_x: upperArm_right.rotation.x,
      rightHand_rotation_y: handRight.rotation.y,
      upperLeg_right: (-75 * Math.PI) / 180,
      upperLeg_left: (-75 * Math.PI) / 180,
      lowerLeg: (-75 * Math.PI) / 180,
      spine: (30 * Math.PI) / 180,
      head: (-15 * Math.PI) / 180,
    };
    tweenGoalJump = {
      y: tweenStartJump.y + 29.3,
      rightArm_rotation_x: (-90 * Math.PI) / 180,
      rightHand_rotation_y: (90 * Math.PI) / 180,
      upperLeg_right: (0 * Math.PI) / 180,
      lowerLeg: (0 * Math.PI) / 180,
      spine: (0 * Math.PI) / 180,
      head: (0 * Math.PI) / 180,
      upperLeg_left: (0 * Math.PI) / 180,
    };
    tweenGoalJumpBack = {
      y: -14.3,
      rightArm_rotation_x: (45 * Math.PI) / 180,
      rightHand_rotation_y: (0 * Math.PI) / 180,
      upperLeg_right: (0 * Math.PI) / 180,
      lowerLeg: (0 * Math.PI) / 180,
      upperLeg_left: (0 * Math.PI) / 180,
      spine: (0 * Math.PI) / 180,
      head: (0 * Math.PI) / 180,
    };
    tweenStartFlex = {
      upperLeg_right: upperLeg_right.rotation.x,
      upperLeg_left: upperLeg_left.rotation.x,
      lowerLeg: lowerLeg_right.rotation.x,
      spine: spine.rotation.x,
      head: head.rotation.x,
      y: character.position.y,
    };
    tweenGoalFlex = {
      upperLeg_right: (-75 * Math.PI) / 180,
      upperLeg_left: (-75 * Math.PI) / 180,
      lowerLeg: (-75 * Math.PI) / 180,
      spine: (30 * Math.PI) / 180,
      head: (-15 * Math.PI) / 180,
      y: tweenStartJump.y - 0.3,
    };
    tweenStartRaise = {
      rightArm_rotation_x: upperArm_right.rotation.x,
      rightHand_rotation_y: handRight.rotation.y,
    };
    tweenGoalRaise = {
      rightArm_rotation_x: (-90 * Math.PI) / 180,
      rightHand_rotation_y: (90 * Math.PI) / 180,
    };
    tweenGoalLower = {
      rightArm_rotation_x: (45 * Math.PI) / 180,
      rightHand_rotation_y: (0 * Math.PI) / 180,
    };
  }
  tweenFlex = new TWEEN.Tween(tweenStartFlex, groupJump)
    .to(tweenGoalFlex, 200)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      upperLeg_right.rotation.x = tweenStartFlex.upperLeg_right;
      upperLeg_left.rotation.x = tweenStartFlex.upperLeg_left;
      lowerLeg_right.rotation.x = tweenStartFlex.lowerLeg;
      lowerLeg_left.rotation.x = tweenStartFlex.lowerLeg;
      spine.rotation.x = tweenStartFlex.spine;
      head.rotation.x = tweenStartFlex.head;
    })
    .start();

  tweenJump = new TWEEN.Tween(tweenStartJump, groupJump)
    .to(tweenGoalJump, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function () {
      character.position.y = tweenStartJump.y;

      if (keysPressed[68] && !collidedLeft && !collidedTop1 && !collidedTop2) {
        character.position.z += 0.2;
        dirLight.position.z += 0.2;
      }

      if (keysPressed[65] && !collidedRight && !collidedTop1 && !collidedTop2) {
        character.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }
      camera.position.y = (character.position.y - camera.position.y) * 0.7;

      upperLeg_right.rotation.x = tweenStartJump.upperLeg_right;
      upperLeg_left.rotation.x = tweenStartJump.upperLeg_left;
      lowerLeg_right.rotation.x = tweenStartJump.lowerLeg;
      lowerLeg_left.rotation.x = tweenStartJump.lowerLeg;
      spine.rotation.x = tweenStartJump.spine;
      head.rotation.x = tweenStartJump.head;
    })
    .onStop(function () {
      isJumping = false;

      if (keysPressed[68]) {
        collidedRight = false;
      }
      if (keysPressed[65]) {
        collidedLeft = false;
      }
    });

  tweenFlex.chain(tweenJump);
  tweenJumpBack = new TWEEN.Tween(tweenStartJump, groupJump)
    .to(tweenGoalJumpBack, timeJumpBack)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function () {
      if (collidedTop1) {
        character.position.y = 12;
        collidedTop1 = false;
        tweenJump.stop();
      } else if (collidedTop2) {
        character.position.y = 36;
        collidedTop2 = false;
        tweenJump.stop();
      } else if (collidedTopPipe) {
        character.position.y = pipeHeightGoal;
        tweenJump.stop();
      } else if (collidedTopStairs) {
        character.position.y = stairsHeightGoal;
        tweenJump.stop();
      } else {
        character.position.y = tweenStartJump.y;
      }

      if (keysPressed[68] && !collidedLeft && !collidedTop1 && !collidedTop2) {
        character.position.z += 0.2;
        dirLight.position.z += 0.2;
      }

      if (keysPressed[65] && !collidedRight && !collidedTop1 && !collidedTop2) {
        character.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }
      camera.position.y = (character.position.y - camera.position.y) * 0.7;

      upperLeg_right.rotation.x = tweenStartJump.upperLeg_right;
      upperLeg_left.rotation.x = tweenStartJump.upperLeg_left;
      lowerLeg_right.rotation.x = tweenStartJump.lowerLeg;
      lowerLeg_left.rotation.x = tweenStartJump.lowerLeg;
      spine.rotation.x = tweenStartJump.spine;
      head.rotation.x = tweenStartJump.head;
    })
    .onStop(function () {
      isJumping = false;

      if (keysPressed[68]) {
        collidedRight = false;
      }
      if (keysPressed[65]) {
        collidedLeft = false;
      }
    })
    .onComplete(function () {
      isJumpingRight = false;
      isJumpingLeft = false;
      isJumping = false;
      if (!groupCollision) {
        if (keysPressed[68]) {
          collidedRight = false;
        }
        if (keysPressed[65]) {
          collidedLeft = false;
        }
      } else {
        collidedLeft = false;
        collidedRight = false;
        groupCollision = false;
      }
    });
  tweenJump.chain(tweenJumpBack);

  tweenRaiseUpHand = new TWEEN.Tween(tweenStartRaise, groupJump)
    .to(tweenGoalRaise, 500)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function () {
      if (isRotatedRight && isJumpingRight) {
        if (character == yoshi || character == luigi) {
          upperArm_right.rotation.x = (0 * Math.PI) / 180;
          upperArm_right.rotation.z = tweenStartRaise.rightArm_rotation_z;
        }
        if (character == mario) {
          upperArm_right.rotation.x = tweenStartRaise.rightArm_rotation_x;
        }
        handRight.rotation.y = tweenStartRaise.rightHand_rotation_y;
      }
      if (!isRotatedRight && isJumpingLeft) {
        if (character == yoshi || character == luigi) {
          upperArm_left.rotation.x = (0 * Math.PI) / 180;
          upperArm_left.rotation.z = tweenStartRaise.rightArm_rotation_z;
        }
        if (character == mario) {
          upperArm_left.rotation.x = tweenStartRaise.rightArm_rotation_x;
          upperArm_left.rotation.y = (0 * Math.PI) / 180;
        }
        handLeft.rotation.y = tweenStartRaise.rightHand_rotation_y;
      }
    })
    .start();
  tweenLowerHand = new TWEEN.Tween(tweenStartRaise, groupJump)
    .to(tweenGoalLower, 700)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function () {
      if (isRotatedRight && isJumpingRight) {
        if (character == yoshi || character == luigi) {
          upperArm_right.rotation.x = (0 * Math.PI) / 180;
          upperArm_right.rotation.z = tweenStartRaise.rightArm_rotation_z;
        }
        if (character == mario) {
          upperArm_right.rotation.x = tweenStartRaise.rightArm_rotation_x;
          upperArm_left.rotation.y = (0 * Math.PI) / 180;
        }
        handRight.rotation.y = tweenStartRaise.rightHand_rotation_y;
      }
      if (!isRotatedRight && isJumpingLeft) {
        if (character == yoshi || character == luigi) {
          upperArm_left.rotation.x = (0 * Math.PI) / 180;
          upperArm_left.rotation.z = tweenStartRaise.rightArm_rotation_z;
        }
        if (character == mario) {
          upperArm_left.rotation.x = tweenStartRaise.rightArm_rotation_x;
        }
        handLeft.rotation.y = tweenStartRaise.rightHand_rotation_y;
      }
    });
  tweenRaiseUpHand.chain(tweenLowerHand);
}

export function setIdlePosition(character) {
  setAnimationParameters(character);
  tween_idle = new TWEEN.Tween(tweenStartScale)
    .to(tweenIdle, 500)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      spine.rotation.x = tweenStartScale.spine;
      head.rotation.x = tweenStartScale.head;

      upperLeg_left.rotation.x = tweenStartScale.x_left;
      upperLeg_right.rotation.x = tweenStartScale.x_right;

      lowerLeg_right.rotation.x = tweenStartScale.lowerLeg_right;
      lowerLeg_left.rotation.x = tweenStartScale.lowerLeg_left;

      upperArm_left.rotation.x = tweenStartScale.x_leftArm;
      upperArm_right.rotation.x = tweenStartScale.x_rightArm;

      if (character == mario) {
        upperArm_left.rotation.z = tweenStartScale.z_leftArm;
        upperArm_right.rotation.z = tweenStartScale.z_rightArm;
      }

      if (character == yoshi || character == luigi) {
        upperArm_left.rotation.z = tweenStartScale.rightArm_rotation_z;
        upperArm_right.rotation.z = tweenStartScale.rightArm_rotation_z;
      }

      handRight.rotation.y = tweenStartScale.rightHand_rotation_y;
      handLeft.rotation.y = tweenStartScale.rightHand_rotation_y;
    })
    .start();
}

export function goombaAnimation(goombaElem, increase) {
  var left_foot = goombaElem.getObjectByName("Left_Foot");
  var right_foot = goombaElem.getObjectByName("Right_Foor");
  var headGoomba = goombaElem.getObjectByName("Head");

  var tweenStartGoomba = {
    foot_left: left_foot.rotation.y,
    foot_right: right_foot.rotation.y,
    head: headGoomba.rotation.x,
    z: goombaElem.position.z,
  };

  var tweenGoalGoomba = {
    foot_left: (30 * Math.PI) / 180,
    foot_right: (30 * Math.PI) / 180,
    head: (85 * Math.PI) / 180,
  };
  var tweenBackGoomba = {
    foot_left: (-30 * Math.PI) / 180,
    foot_right: (-30 * Math.PI) / 180,
    head: (95 * Math.PI) / 180,
  };

  var tweenWalkGoal = {
    z: goombaElem.position.z + increase,
  };

  var tweenWalkBack = {
    z: goombaElem.position.z - increase,
  };

  var tweenGoomba = new TWEEN.Tween(tweenStartGoomba)
    .to(tweenGoalGoomba, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      left_foot.rotation.y = tweenStartGoomba.foot_left;
      right_foot.rotation.y = tweenStartGoomba.foot_right;

      headGoomba.rotation.x = tweenStartGoomba.head;
    })
    .start();

  tweenGoombaFeetArray.push(tweenGoomba);

  var tweenBackGoomba = new TWEEN.Tween(tweenStartGoomba)
    .to(tweenBackGoomba, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      left_foot.rotation.y = tweenStartGoomba.foot_left;
      right_foot.rotation.y = tweenStartGoomba.foot_right;

      headGoomba.rotation.x = tweenStartGoomba.head;
    })
    .yoyo(true)
    .repeat(Infinity);
  tweenGoomba.chain(tweenBackGoomba);

  var tweenWalkGoomba = new TWEEN.Tween(tweenStartGoomba)
    .to(tweenWalkGoal, 5000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      goombaElem.position.z = tweenStartGoomba.z;
    })
    .start();

  tweenWalkGoombaArray.push(tweenWalkGoomba);

  var tweenWalkBackGoomba = new TWEEN.Tween(tweenStartGoomba)
    .to(tweenWalkBack, 5000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      goombaElem.position.z = tweenStartGoomba.z;
    })
    .yoyo(true)
    .repeat(Infinity);
  tweenWalkGoomba.chain(tweenWalkBackGoomba);
}

export function objectAnimation(object, i) {
  if (object.position.y >= 9 && object.position.y < 16.5) {
    var flag1 = true;
    var flag2 = false;
    itemSound.play();
  }

  if (object.position.y >= 32 && object.position.y < 40.5) {
    var flag2 = true;
    var flag1 = false;
    itemSound.play();
  }

  var tweenStartObject = {
    y: object.position.y,
  };

  if (flag1) {
    var tweenGoalObject = {
      y: 16.5,
    };
  }

  if (flag2) {
    var tweenGoalObject = {
      y: 40.5,
    };
  }

  var tweenObject = new TWEEN.Tween(tweenStartObject)
    .to(tweenGoalObject, 6000)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate(function () {
      object.position.y = tweenStartObject.y;
    })
    .start();

  var tweenRotation = new TWEEN.Tween()
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      object.rotation.y += 0.1;
    })
    .yoyo(true)
    .repeat(Infinity)
    .start();
}

export function gameOver(character) {
  tweenStartGameOver = {
    y: character.position.y,
    torso: torso.rotation.y,
  };

  tweenGoalGameOver = {
    y: -7,
    torso: (-90 * Math.PI) / 180,
  };

  tweenBackGameOver = {
    y: -30,
  };

  tweenGameOver = new TWEEN.Tween(tweenStartGameOver)
    .to(tweenGoalGameOver, 1000)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function () {
      character.position.y = tweenStartGameOver.y;
      torso.rotation.y = tweenStartGameOver.torso;
      camera.position.y = (character.position.y - camera.position.y) * 0.7;
    })
    .start();

  tweenGameOverBack = new TWEEN.Tween(tweenStartGameOver)
    .to(tweenBackGameOver, 1000)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function () {
      character.position.y = tweenStartGameOver.y;
      camera.position.y = (character.position.y - camera.position.y) * 0.7;
    })
    .onComplete(function () {
      keyboardDisabled = false;
    });
  tweenGameOver.chain(tweenGameOverBack);
}

export function win(character) {
  if (character == yoshi || character == luigi) {
    tweenStartWin = {
      arm: upperArm_left.rotation.z,
      hand: handLeft.rotation.y,
      torso: torso.rotation.y,
    };

    tweenGoalWin = {
      arm: (-60 * Math.PI) / 180,
      hand: (0 * Math.PI) / 180,
      torso: (-90 * Math.PI) / 180,
    };
  }

  if (character == mario) {
    tweenStartWin = {
      arm: upperArm_left.rotation.x,
      hand: handLeft.rotation.y,
      torso: torso.rotation.y,
    };

    tweenGoalWin = {
      arm: (-90 * Math.PI) / 180,
      hand: (90 * Math.PI) / 180,
      torso: (-180 * Math.PI) / 180,
    };
  }

  tweenWin = new TWEEN.Tween(tweenStartWin)
    .to(tweenGoalWin, 100)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function () {
      if (character == yoshi || character == luigi) {
        upperArm_left.rotation.x = (0 * Math.PI) / 180;
        upperArm_left.rotation.z = tweenStartWin.arm;
      }
      if (character == mario) {
        upperArm_left.rotation.x = tweenStartWin.arm;
      }

      handLeft.rotation.y = tweenStartWin.hand;
      torso.rotation.y = tweenStartWin.torso;
      camera.position.y = (character.position.y - camera.position.y) * 0.7;
    })
    .onComplete(function () {
      keyboardDisabled = false;
    })
    .start();
}
