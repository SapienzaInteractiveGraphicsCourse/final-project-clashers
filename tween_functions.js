import TWEEN from "./build/tween.js-master/dist/tween.esm.js";

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
      if (!collidedTop) {
        //?
        yoshi.position.y = tweenStartFall.y;
      }
    })
    .onComplete(function () {
      collidedTop = false; //?
      collidedLeft = false;
      collidedRight = false;
      //setIdlePosition();
    })
    .start();
}

export function setAnimationParameters() {
  tweenStartScale = {
    x_left: upperLeg_left.rotation.x,
    x_right: upperLeg_right.rotation.x,
    x_leftArm: upperArm_left.rotation.x,
    x_rightArm: upperArm_right.rotation.x,
    rightArm_rotation_z: (45 * Math.PI) / 180,
    //rightArm_rotation_x: (0 * Math.PI) / 180,
    rightHand_rotation_y: handRight.rotation.y,
    finger_x: finger1_right.rotation.x,
    thumb1_y: thumb1_right.rotation.y,
    thumb2_x: thumb2_right.rotation.x,
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
    //y: -14.3, -> pensare se fare piegare le ginocchia e quindi anche traslare su e giu yoshi
    //spine: (0 * Math.PI) / 180,
    //head: (0 * Math.PI) / 180,
  };
  tweenIdle = {
    x_left: (-180 * Math.PI) / 180,
    x_right: (0 * Math.PI) / 180,
    x_leftArm: (0 * Math.PI) / 180,
    x_rightArm: (0 * Math.PI) / 180,

    rightArm_rotation_z: (45 * Math.PI) / 180,
    rightHand_rotation_y: (90 * Math.PI) / 180,
    finger_x: (0 * Math.PI) / 180,
    thumb1_y: (66.5 * Math.PI) / 180,
    thumb2_x: (0 * Math.PI) / 180,
    spine: (0 * Math.PI) / 180,
    head: (0 * Math.PI) / 180,
  };
}

export function performAnimation(direction, character) {
  dir = direction;
  setAnimationParameters(); //rinominare setTweenParameter!

  tween = new TWEEN.Tween(tweenStartScale, groupRun)
    .to(tweenGoalScale, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      upperLeg_left.rotation.x = tweenStartScale.x_left;
      upperLeg_right.rotation.x = tweenStartScale.x_right;
      upperArm_left.rotation.x = tweenStartScale.x_leftArm;
      upperArm_right.rotation.x = tweenStartScale.x_rightArm;
      //yoshi.position.y = tweenStartScale.y;
      spine.rotation.x = tweenStartScale.spine;
      head.rotation.x = tweenStartScale.head;
      //if (!collision) {
      if (direction == "right" && !collidedLeft) {
        character.position.z += 0.2;
        dirLight.position.z += 0.2;
      }
      if (direction == "left" && !collidedRight) {
        character.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }
      //}
      //yoshiBox.__dirtyPosition = true;
      //yoshiBox.__dirtyRotation = false;
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
      upperArm_left.rotation.x = tweenStartScale.x_leftArm;
      upperArm_right.rotation.x = tweenStartScale.x_rightArm;
      //yoshi.position.y = tweenStartScale.y;
      spine.rotation.x = tweenStartScale.spine;
      head.rotation.x = tweenStartScale.head;
      //if (!collision) {
      if (direction == "right" && !collidedLeft) {
        character.position.z += 0.2;
        dirLight.position.z += 0.2;
      }
      if (direction == "left" && !collidedRight) {
        character.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }
      //}
      //yoshiBox.__dirtyPosition = true;
      //yoshiBox.__dirtyRotation = false;
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
  tweenStartJump = {
    y: character.position.y,
    //rightArm_rotation_z: upperArm_right.rotation.z,
    rightArm_rotation_z: (45 * Math.PI) / 180,
    //rightArm_rotation_x: (0 * Math.PI) / 180,
    rightHand_rotation_y: handRight.rotation.y,
    finger_x: finger1_right.rotation.x,
    thumb1_y: thumb1_right.rotation.y,
    thumb2_x: thumb2_right.rotation.x,
    /*upperLeg_right: upperLeg_right.rotation.x,
    upperLeg_left: upperLeg_left.rotation.x,
    lowerLeg: lowerLeg_right.rotation.x,
    spine: spine.rotation.x,
    head: head.rotation.x,*/
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
    finger_x: (-90 * Math.PI) / 180,
    thumb1_y: (135 * Math.PI) / 180,
    thumb2_x: (90 * Math.PI) / 180,
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
    finger_x: (0 * Math.PI) / 180,
    thumb1_y: (66.5 * Math.PI) / 180,
    thumb2_x: (0 * Math.PI) / 180,

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
  /*var tweenGoalFlexBack = {
    upperLeg_right: (0 * Math.PI) / 180,
    lowerLeg: (0 * Math.PI) / 180,
    spine: (0 * Math.PI) / 180,
    head: (0 * Math.PI) / 180,
    upperLeg_left: (-180 * Math.PI) / 180,
    y: -14.3,
  };*/
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
      //yoshiBox.__dirtyPosition = true;
      //yoshiBox.__dirtyRotation = false;
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
        upperArm_right.rotation.x = (0 * Math.PI) / 180;
        upperArm_right.rotation.z = tweenStartJump.rightArm_rotation_z;
        handRight.rotation.y = tweenStartJump.rightHand_rotation_y;
        finger1_right.rotation.x = tweenStartJump.finger_x;
        finger1_2_right.rotation.x = tweenStartJump.finger_x;
        finger2_right.rotation.x = tweenStartJump.finger_x;
        finger2_2_right.rotation.x = tweenStartJump.finger_x;
        finger3_right.rotation.x = tweenStartJump.finger_x;
        finger3_2_right.rotation.x = tweenStartJump.finger_x;
        thumb2_right.rotation.x = tweenStartJump.finger_x;
        thumb1_right.rotation.y = tweenStartJump.thumb1_y;
      }
      if (!isRotatedRight && isJumpingLeft) {
        upperArm_left.rotation.x = (0 * Math.PI) / 180;
        upperArm_left.rotation.z = tweenStartJump.rightArm_rotation_z;
        handLeft.rotation.y = tweenStartJump.rightHand_rotation_y;
        finger1_left.rotation.x = tweenStartJump.finger_x;
        finger1_2_left.rotation.x = tweenStartJump.finger_x;
        finger2_left.rotation.x = tweenStartJump.finger_x;
        finger2_2_left.rotation.x = tweenStartJump.finger_x;
        finger3_left.rotation.x = tweenStartJump.finger_x;
        finger3_2_left.rotation.x = tweenStartJump.finger_x;
        thumb2_left.rotation.x = tweenStartJump.finger_x;
        thumb1_left.rotation.y = tweenStartJump.thumb1_y;
      }
      //yoshiBox.__dirtyPosition = true;
      //yoshiBox.__dirtyRotation = false;
      //fix arm x rotation
      //upperArm_right.rotation.x = (0 * Math.PI) / 180;
    });
  //.start();
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
        upperArm_right.rotation.x = (0 * Math.PI) / 180;
        upperArm_right.rotation.z = tweenStartJump.rightArm_rotation_z;
        handRight.rotation.y = tweenStartJump.rightHand_rotation_y;
        finger1_right.rotation.x = tweenStartJump.finger_x;
        finger1_2_right.rotation.x = tweenStartJump.finger_x;
        finger2_right.rotation.x = tweenStartJump.finger_x;
        finger2_2_right.rotation.x = tweenStartJump.finger_x;
        finger3_right.rotation.x = tweenStartJump.finger_x;
        finger3_2_right.rotation.x = tweenStartJump.finger_x;
        thumb2_right.rotation.x = tweenStartJump.finger_x;
        thumb1_right.rotation.y = tweenStartJump.thumb1_y;
      }
      if (!isRotatedRight && isJumpingLeft) {
        upperArm_left.rotation.x = (0 * Math.PI) / 180;
        upperArm_left.rotation.z = tweenStartJump.rightArm_rotation_z;
        handLeft.rotation.y = tweenStartJump.rightHand_rotation_y;
        finger1_left.rotation.x = tweenStartJump.finger_x;
        finger1_2_left.rotation.x = tweenStartJump.finger_x;
        finger2_left.rotation.x = tweenStartJump.finger_x;
        finger2_2_left.rotation.x = tweenStartJump.finger_x;
        finger3_left.rotation.x = tweenStartJump.finger_x;
        finger3_2_left.rotation.x = tweenStartJump.finger_x;
        thumb2_left.rotation.x = tweenStartJump.finger_x;
        thumb1_left.rotation.y = tweenStartJump.thumb1_y;
      }
      //yoshiBox.__dirtyPosition = true;
      //yoshiBox.__dirtyRotation = false;
      //upperArm_right.rotation.x = (0 * Math.PI) / 180;
    })
    .onComplete(function () {
      isJumpingRight = false;
      isJumpingLeft = false;
      isJumping = false;
      collidedRight = false;
      collidedLeft = false;
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

export function setIdlePosition() {
  //groupRun.removeAll();
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
      //mettere a posto anche le dita

      //parametri modificati durante il salto
      upperArm_right.rotation.z = tweenStartScale.rightArm_rotation_z;
      handRight.rotation.y = tweenStartScale.rightHand_rotation_y;
      finger1_right.rotation.x = tweenStartScale.finger_x;
      finger1_2_right.rotation.x = tweenStartScale.finger_x;
      finger2_right.rotation.x = tweenStartScale.finger_x;
      finger2_2_right.rotation.x = tweenStartScale.finger_x;
      finger3_right.rotation.x = tweenStartScale.finger_x;
      finger3_2_right.rotation.x = tweenStartScale.finger_x;
      thumb2_right.rotation.x = tweenStartScale.finger_x;
      thumb1_right.rotation.y = tweenStartScale.thumb1_y;

      upperArm_left.rotation.z = tweenStartScale.rightArm_rotation_z;
      handLeft.rotation.y = tweenStartScale.rightHand_rotation_y;
      finger1_left.rotation.x = tweenStartScale.finger_x;
      finger1_2_left.rotation.x = tweenStartScale.finger_x;
      finger2_left.rotation.x = tweenStartScale.finger_x;
      finger2_2_left.rotation.x = tweenStartScale.finger_x;
      finger3_left.rotation.x = tweenStartScale.finger_x;
      finger3_2_left.rotation.x = tweenStartScale.finger_x;
      thumb2_left.rotation.x = tweenStartScale.finger_x;
      thumb1_left.rotation.y = tweenStartScale.thumb1_y;

      //yoshiBox.__dirtyPosition = true;
      //yoshiBox.__dirtyRotation = false;
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
