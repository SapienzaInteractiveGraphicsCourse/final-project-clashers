import TWEEN from "./build/tween.js-master/dist/tween.esm.js";
//mettere character ++++++++++++++++++++++++++++++++++++++++++++++

export function fall() {
  console.log("falling");
  tweenStartFall = {
    y: yoshi.position.y,
  };
  tweenGoalFall = {
    y: -14.3,
  };
  tweenFall = new TWEEN.Tween(tweenStartFall)
    .to(tweenGoalFall, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      //if (!collidedTop) {
      //?
      yoshi.position.y = tweenStartFall.y;
      //}
    })
    .onComplete(function () {
      collidedTop = false; //?
      collidedLeft = false;
      collidedRight = false;

      //isOnObjectTop = true;
      //setIdlePosition();
    })
    .start();
}

export function setAnimationParameters(character) {
  if (character == yoshi || character == luigi) {
    //+++++++++++++++++++++++++++
    tweenStartScale = {
      x_left: upperLeg_left.rotation.x,
      x_right: upperLeg_right.rotation.x,
      x_leftArm: upperArm_left.rotation.x,
      x_rightArm: upperArm_right.rotation.x,
      rightArm_rotation_z: (45 * Math.PI) / 180,
      //rightArm_rotation_x: (0 * Math.PI) / 180,
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
      //Braccia su x

      x_leftArm: upperArm_left.rotation.x,
      x_rightArm: upperArm_right.rotation.x,

      //Braccia su z
      z_leftArm: upperArm_left.rotation.z,
      z_rightArm: upperArm_right.rotation.z,
      //rightArm_rotation_z: (45 * Math.PI) / 180,
      //rightArm_rotation_x: (0 * Math.PI) / 180,
      rightHand_rotation_y: handRight.rotation.y,
      spine: spine.rotation.x,
      head: head.rotation.x,
    };
    tweenGoalScale = {
      x_left: (-45 * Math.PI) / 180,
      x_right: (45 * Math.PI) / 180,
      //Braccia su x non serve su mario
      /*
      x_leftArm: (45 * Math.PI) / 180,
      x_rightArm: (45 * Math.PI) / 180,
      */
      //Braccia su z
      z_leftArm: (-45 * Math.PI) / 180,
      z_rightArm: (-45 * Math.PI) / 180,

      spine: (10 * Math.PI) / 180,
      head: (-10 * Math.PI) / 180,
    };
    tweenBackScale = {
      x_left: (45 * Math.PI) / 180,
      x_right: (-45 * Math.PI) / 180,
      //Braccia su x non serve su mario
      /*
      x_leftArm: (45 * Math.PI) / 180,
      x_rightArm: (45 * Math.PI) / 180,
      */
      //Braccia su z
      z_leftArm: (45 * Math.PI) / 180,
      z_rightArm: (45 * Math.PI) / 180,
    };
    tweenIdle = {
      x_left: (0 * Math.PI) / 180,
      x_right: (0 * Math.PI) / 180,
      //Braccia su x
      x_leftArm: (45 * Math.PI) / 180,
      x_rightArm: (45 * Math.PI) / 180,
      //Braccia su z
      z_leftArm: (0 * Math.PI) / 180,
      z_rightArm: (0 * Math.PI) / 180,
      //rightArm_rotation_z: (45 * Math.PI) / 180,
      rightHand_rotation_y: (0 * Math.PI) / 180,
      spine: (0 * Math.PI) / 180,
      head: (0 * Math.PI) / 180,
    };
  }
}

export function performAnimation(direction, character) {
  dir = direction;
  setAnimationParameters(character); //rinominare setTweenParameter!

  tween = new TWEEN.Tween(tweenStartScale, groupRun)
    .to(tweenGoalScale, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      upperLeg_left.rotation.x = tweenStartScale.x_left;
      upperLeg_right.rotation.x = tweenStartScale.x_right;

      spine.rotation.x = tweenStartScale.spine;
      head.rotation.x = tweenStartScale.head;

      if (character == yoshi || character == luigi) {
        //Braccia su x
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
      controls.update();
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
        //Braccia su x
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
      controls.update();
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
        //yoshiBox.__dirtyPosition = true;
        //yoshiBox.__dirtyRotation = false;
      })
      .start();
  }
  if (direction == "right") {
    var tweenRight = new TWEEN.Tween(tweenStartRight, groupRotate)
      .to(tweenGoalRight, 400)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function () {
        torso.rotation.y = tweenStartRight.y_rightRotation;
        //yoshiBox.__dirtyPosition = true;
        //yoshiBox.__dirtyRotation = false;
      })
      .start();
  }
}

/*function setTweenJumpParameters() {
  //metterci tweenstartjump, tweengoaljump, tweengoaljumpback
}*/

export function jump(character) {
  if (character == yoshi || character == luigi) {
    tweenStartJump = {
      y: character.position.y,
      rightArm_rotation_z: (45 * Math.PI) / 180,
      rightHand_rotation_y: handRight.rotation.y,
      upperLeg_right: (-45 * Math.PI) / 180,
      upperLeg_left: (-225 * Math.PI) / 180,
      lowerLeg: (75 * Math.PI) / 180,
      spine: (30 * Math.PI) / 180,
      head: (-15 * Math.PI) / 180,
    };
    tweenGoalJump = {
      y: tweenStartJump.y + 29.3, //-3, -15
      rightArm_rotation_z: (-60 * Math.PI) / 180,
      rightHand_rotation_y: (0 * Math.PI) / 180,
      upperLeg_right: (0 * Math.PI) / 180,
      lowerLeg: (0 * Math.PI) / 180,
      spine: (0 * Math.PI) / 180,
      head: (0 * Math.PI) / 180,
      upperLeg_left: (-180 * Math.PI) / 180,
    };
    tweenGoalJumpBack = {
      y: -14.3,
      rightArm_rotation_z: (45 * Math.PI) / 180,
      rightHand_rotation_y: (90 * Math.PI) / 180,
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
      y: tweenStartJump.y + 29.3, //-3, -15
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
      y: -14.6,
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
      if (!collidedTop) {
        character.position.y = tweenStartFlex.y;
      }
    })
    .start();
  /*var tweenFlexBack = new TWEEN.Tween(tweenStartFlex, groupJump)
    .to(tweenGoalFlexBack, 300)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function () {
      upperLeg_right.rotation.x = tweenStartFlex.upperLeg_right;
      upperLeg_left.rotation.x = tweenStartFlex.upperLeg_left;
      lowerLeg_right.rotation.x = tweenStartFlex.lowerLeg;
      lowerLeg_left.rotation.x = tweenStartFlex.lowerLeg;
      spine.rotation.x = tweenStartFlex.spine;
      head.rotation.x = tweenStartFlex.head;
      yoshi.position.y = tweenStartFlex.y;
    });
  tweenFlex.chain(tweenFlexBack);*/
  tweenJump = new TWEEN.Tween(tweenStartJump, groupJump)
    .to(tweenGoalJump, 1000) //400
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function () {
      if (!collidedTop || isOnObjectTop) {
        character.position.y = tweenStartJump.y;
      }
      if (keysPressed[68] && !collidedLeft) {
        character.position.z += 0.3;
        dirLight.position.z += 0.3;
      }
      if (keysPressed[65] && !collidedRight) {
        character.position.z -= 0.3;
        dirLight.position.z -= 0.3;
      }

      upperLeg_right.rotation.x = tweenStartJump.upperLeg_right;
      upperLeg_left.rotation.x = tweenStartJump.upperLeg_left;
      lowerLeg_right.rotation.x = tweenStartJump.lowerLeg;
      lowerLeg_left.rotation.x = tweenStartJump.lowerLeg;
      spine.rotation.x = tweenStartJump.spine;
      head.rotation.x = tweenStartJump.head;
      if (isRotatedRight && isJumpingRight) {
        if (character == yoshi || character == luigi) {
          upperArm_right.rotation.x = (0 * Math.PI) / 180;
          upperArm_right.rotation.z = tweenStartJump.rightArm_rotation_z;
        }
        if (character == mario) {
          upperArm_right.rotation.x = (-90 * Math.PI) / 180;
        }
        handRight.rotation.y = tweenStartJump.rightHand_rotation_y;
      }
      if (!isRotatedRight && isJumpingLeft) {
        if (character == yoshi || character == luigi) {
          upperArm_left.rotation.x = (0 * Math.PI) / 180;
          upperArm_left.rotation.z = tweenStartJump.rightArm_rotation_z;
        }
        if (character == mario) {
          upperArm_left.rotation.x = (-90 * Math.PI) / 180;
        }
        handLeft.rotation.y = tweenStartJump.rightHand_rotation_y;
      }
    });
  tweenFlex.chain(tweenJump);
  tweenJumpBack = new TWEEN.Tween(tweenStartJump, groupJump)
    .to(tweenGoalJumpBack, 1000) //400
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function () {
      if (!collidedTop || isOnObjectTop) {
        character.position.y = tweenStartJump.y;
      }
      if (keysPressed[68] && !collidedLeft) {
        character.position.z += 0.3;
        dirLight.position.z += 0.3;
      }
      if (keysPressed[65] && !collidedRight) {
        character.position.z -= 0.3;
        dirLight.position.z -= 0.3;
      }

      upperLeg_right.rotation.x = tweenStartJump.upperLeg_right;
      upperLeg_left.rotation.x = tweenStartJump.upperLeg_left;
      lowerLeg_right.rotation.x = tweenStartJump.lowerLeg;
      lowerLeg_left.rotation.x = tweenStartJump.lowerLeg;
      spine.rotation.x = tweenStartJump.spine;
      head.rotation.x = tweenStartJump.head;

      if (isRotatedRight && isJumpingRight) {
        if (character == yoshi || character == luigi) {
          upperArm_right.rotation.x = (0 * Math.PI) / 180;
          upperArm_right.rotation.z = tweenStartJump.rightArm_rotation_z;
        }
        if (character == mario) {
          upperArm_right.rotation.x = (-90 * Math.PI) / 180;
        }
        handRight.rotation.y = tweenStartJump.rightHand_rotation_y;
      }
      if (!isRotatedRight && isJumpingLeft) {
        if (character == yoshi || character == luigi) {
          upperArm_left.rotation.x = (0 * Math.PI) / 180;
          upperArm_left.rotation.z = tweenStartJump.rightArm_rotation_z;
        }
        if (character == mario) {
          upperArm_left.rotation.x = (-90 * Math.PI) / 180;
        }
        handLeft.rotation.y = tweenStartJump.rightHand_rotation_y;
      }
    })
    .onStop(function () {
      isJumpingRight = false;
      isJumpingLeft = false;
      isJumping = false;
      //setIdlePosition();
      isOnObjectTop = true;
    })
    .onComplete(function () {
      isJumpingRight = false;
      isJumpingLeft = false;
      isJumping = false;
      //setIdlePosition();
      isOnObjectTop = true;
    });
  tweenJump.chain(tweenJumpBack);
}

/*function fall() {
  tweenStartFall = {
    y: yoshi.position.y,
  };
  tweenGoalFall = {
    y: -14.3,
  };
  tweenFall = new TWEEN.Tween(tweenStartFall)
    .to(tweenGoalFall, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      yoshi.position.y = tweenStartFall.y;
    })
    .onComplete(function () {
      collidedTop = false; //?
      //setIdlePosition();
    })
    .start();
}*/

export function setIdlePosition(character) {
  tween_idle = new TWEEN.Tween(tweenStartScale)
    .to(tweenIdle, 500)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      spine.rotation.x = tweenStartScale.spine;
      head.rotation.x = tweenStartScale.head;

      upperLeg_left.rotation.x = tweenStartScale.x_left;
      upperLeg_right.rotation.x = tweenStartScale.x_right;

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

export function goombaAnimation(goombaElem) {
  left_foot = goombaElem.getObjectByName("Left_Foot");
  right_foot = goombaElem.getObjectByName("Right_Foor");
  headGoomba = goombaElem.getObjectByName("Head");

  tweenStartGoomba = {
    foot_left: left_foot.rotation.y,
    foot_right: right_foot.rotation.y,
    head: headGoomba.rotation.x,
    z: goombaElem.position.z,
  };
  tweenGoalGoomba = {
    foot_left: (30 * Math.PI) / 180,
    foot_right: (30 * Math.PI) / 180,
    head: (85 * Math.PI) / 180,
  };
  tweenBackGoomba = {
    foot_left: (-30 * Math.PI) / 180,
    foot_right: (-30 * Math.PI) / 180,
    head: (95 * Math.PI) / 180,
  };

  tweenWalkGoal = {
    z: goombaElem.position.z + 15,
  };

  tweenWalkBack = {
    z: goombaElem.position.z - 15,
  };

  tweenGoomba = new TWEEN.Tween(tweenStartGoomba)
    .to(tweenGoalGoomba, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      left_foot.rotation.y = tweenStartGoomba.foot_left;
      right_foot.rotation.y = tweenStartGoomba.foot_right;
      //goombaElem.position.z = tweenStartGoomba.z;
      headGoomba.rotation.x = tweenStartGoomba.head;
    })
    .start();

  tweenBackGoomba = new TWEEN.Tween(tweenStartGoomba)
    .to(tweenBackGoomba, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      left_foot.rotation.y = tweenStartGoomba.foot_left;
      right_foot.rotation.y = tweenStartGoomba.foot_right;
      //goombaElem.position.z = tweenStartGoomba.z;
      headGoomba.rotation.x = tweenStartGoomba.head;
    })
    .yoyo(true)
    .repeat(Infinity);
  tweenGoomba.chain(tweenBackGoomba);

  tweenWalkGoomba = new TWEEN.Tween(tweenStartGoomba)
    .to(tweenWalkGoal, 5000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      goombaElem.position.z = tweenStartGoomba.z;
    })
    .start();

  tweenWalkBackGoomba = new TWEEN.Tween(tweenStartGoomba)
    .to(tweenWalkBack, 5000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      goombaElem.position.z = tweenStartGoomba.z;
    })
    .yoyo(true)
    .repeat(Infinity);
  tweenWalkGoomba.chain(tweenWalkBackGoomba);
}
