import TWEEN from "./build/tween.js-master/dist/tween.esm.js";

export function fall(character) {
  var timeFall = 400;
  if (character.position.y == 31) {
    timeFall = 700;
    console.log("Setting timeFall = 700");
  }
  console.log("falling");
  tweenStartFall = {
    y: character.position.y,
  };
  tweenGoalFall = {
    y: -14.3,
  };

  /*if (collidedTop1) {
    tweenGoalFall = {
      y: -14.3,
    };
  } else if (collidedTop2) {
    tweenGoalFall = {
      y: 12,
    };
  } else {
    // se non collide nè al primo piano né al secondo piano continua il salto normalmente
    tweenGoalFall = {
      y: -14.3,
    };
  }*/

  /*if (!collidedTop1 && !collideTop2) {
    tweenGoalFall = {
      y: -14.3,
    };
  } else {
    if (character.position.y > 11.5 && character.position.y < 13) {
      tweenGoalFall = {
        y: -14.3,
      };
    }
    if (character.position.y > 30 && character.position.y < 32) {
      tweenGoalFall = {
        y: 12,
      };
    }
  }*/

  tweenFall = new TWEEN.Tween(tweenStartFall)
    .to(tweenGoalFall, timeFall)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      if (collidedTop1) {
        tweenFall.stop();
        console.log("Setting Character position to 12");
        character.position.y = 12;
      } else {
        character.position.y = tweenStartFall.y;
      }
    })
    .onStop(function () {
      collidedSide = false; //serve per farlo ricominciare a camminare quando cade per terra
      //character.position.y = 12;
    })
    .onComplete(function () {
      collidedSide = false; //serve per farlo ricominciare a camminare quando cade per terra
      //collidedTop = false; //serve per dire che quando cade smete di collidere col top
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
      rightHand_rotation_y: handRight.rotation.y,
      spine: spine.rotation.x,
      head: head.rotation.x,
    };
    tweenGoalScale = {
      x_left: (-45 * Math.PI) / 180,
      x_right: (45 * Math.PI) / 180,
      //Braccia su z
      z_leftArm: (-45 * Math.PI) / 180,
      z_rightArm: (-45 * Math.PI) / 180,

      spine: (10 * Math.PI) / 180,
      head: (-10 * Math.PI) / 180,
    };
    tweenBackScale = {
      x_left: (45 * Math.PI) / 180,
      x_right: (-45 * Math.PI) / 180,

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

      if (direction == "right" && !collidedSide) {
        character.position.z += 0.2;
        dirLight.position.z += 0.2;
      }

      if (direction == "left" && !collidedSide) {
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

      if (direction == "right" && !collidedSide) {
        character.position.z += 0.2;
        dirLight.position.z += 0.2;
      }

      if (direction == "left" && !collidedSide) {
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
      y: tweenStartJump.y + 29.3, //-3, -15

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
      y: tweenStartJump.y - 0.3, //-14.6
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
    .to(tweenGoalJump, 1000) //400
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function () {
      character.position.y = tweenStartJump.y;

      if (keysPressed[68] && !collidedSide && !collidedTop1 && !collidedTop2) {
        character.position.z += 0.2;
        dirLight.position.z += 0.2;
      }

      if (keysPressed[65] && !collidedSide && !collidedTop1 && !collidedTop2) {
        character.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }

      upperLeg_right.rotation.x = tweenStartJump.upperLeg_right;
      upperLeg_left.rotation.x = tweenStartJump.upperLeg_left;
      lowerLeg_right.rotation.x = tweenStartJump.lowerLeg;
      lowerLeg_left.rotation.x = tweenStartJump.lowerLeg;
      spine.rotation.x = tweenStartJump.spine;
      head.rotation.x = tweenStartJump.head;
    });

  tweenFlex.chain(tweenJump);
  tweenJumpBack = new TWEEN.Tween(tweenStartJump, groupJump)
    .to(tweenGoalJumpBack, 1000) //400
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function () {
      //se collide al primo piano imposta la posizione del personaggio a 12
      //(perché altrimenti rimarrebbe random in base a quando è stata rilevata la collisione)
      //e stoppiamo il tween non appena impostiamo la posizione, altrimenti facendolo non appena rileva la collisione
      //sarebbe potuto succedere che il tween si bloccava prima di poter fare il controllo qui dentro
      //stessa cosa per l'else if solo che facciamo il controllo per il secondo piano
      if (collidedTop1) {
        console.log("Setting Yoshi position to 12");
        character.position.y = 12;
        collidedTop1 = false;
        tweenJump.stop(); //questo serve per fare iniziare la camminata appena atterra sul cubo dopo il salto
        //tweenJumpBack.stop();
      } else if (collidedTop2) {
        console.log("Setting Yoshi position to 31");
        character.position.y = 31;
        collidedTop2 = false;
        tweenJump.stop(); //questo serve per fare iniziare la camminata appena atterra sul cubo dopo il salto
        //tweenJumpBack.stop();
      } else {
        // se non collide nè al primo piano né al secondo piano continua il salto normalmente
        character.position.y = tweenStartJump.y;
      }

      if (keysPressed[68] && !collidedSide && !collidedTop1 && !collidedTop2) {
        //collidedside serve per non farlo traslare quando collide di lato;
        //collidedtop serve per non fargli fare lo speedboost quando atterra
        character.position.z += 0.2;
        dirLight.position.z += 0.2;
      }

      if (keysPressed[65] && !collidedSide && !collidedTop1 && !collidedTop2) {
        character.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }

      upperLeg_right.rotation.x = tweenStartJump.upperLeg_right;
      upperLeg_left.rotation.x = tweenStartJump.upperLeg_left;
      lowerLeg_right.rotation.x = tweenStartJump.lowerLeg;
      lowerLeg_left.rotation.x = tweenStartJump.lowerLeg;
      spine.rotation.x = tweenStartJump.spine;
      head.rotation.x = tweenStartJump.head;
    })
    .onStop(function () {
      isJumping = false; //serve perchè sennò non ti fa risaltare da sopra le cose
    })
    .onComplete(function () {
      isJumpingRight = false;
      isJumpingLeft = false;
      isJumping = false;

      collidedSide = false;
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
    z: goombaElem.position.z + 15,
  };

  var tweenWalkBack = {
    z: goombaElem.position.z - 15,
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
