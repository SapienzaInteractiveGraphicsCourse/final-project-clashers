import * as tweenFunc from "./tween_functions.js";
import { setGoombaGeometry } from "./goomba.js";
import { setCoinGeometry, setPowerUpGeometry } from "./object.js";
import { setPipeGeometry } from "./pipe.js";
import { setEmptyBlockGeometry } from "./stairs.js";
import {
  setBrickGeometry,
  setQuestionBoxGeometry,
  setGroupGeometry,
} from "./bricks.js";

export function createGroup1() {
  for (var i = 0; i < 3; i++) {
    brickClone = brick.clone();
    brickClone.position.set(0, 5, -570 + 5.5 * 2.25 * i);
    scene.add(brickClone);
    group1.push(brickClone);
    setBrickGeometry(brickClone);
  }

  for (var i = 0; i < 4; i++) {
    questionBoxClone = questionBox.clone();
    questionBoxClone.position.set(0, 6.2, -562.5 + 5.5 * 2.25 * i);
    scene.add(questionBoxClone);
    group1.push(questionBoxClone);
  }
  group1[6].position.set(0, 30, -556);
  group1[3].position.set(0, 6.2, -600);
  group1[4].position.set(0, 6.2, -562.5);
  group1[5].position.set(0, 6.2, -550.1);
  for (var i = 3; i < 7; i++) {
    setQuestionBoxGeometry(group1[i]);
  }
  for (var i = 0; i < 3; i++) {
    coinClone = coin.clone();
    coinClone.position.set(0, 9, -600 + 50 * i);
    scene.add(coinClone);
    group1.push(coinClone);
  }
  group1[9].position.set(0, 33, -556);

  for (var i = 7; i < 10; i++) {
    setCoinGeometry(group1[i]);
  }

  powerUpClone = powerUp.clone();
  powerUpClone.position.set(0, 9, -562.5);
  scene.add(powerUpClone);
  group1.push(powerUpClone);
  setPowerUpGeometry(powerUpClone);

  objectArray.push(group1[7]);
  objectArray.push(group1[10]);
  objectArray.push(group1[8]);
  objectArray.push(group1[9]);

  goombaClone = goomba.clone();
  goombaClone.position.set(0, -13.3, -562.5);
  scene.add(goombaClone);
  group1.push(goombaClone);
  setGoombaGeometry(goombaClone);
  tweenFunc.goombaAnimation(goombaClone, 15);

  setGroupGeometry(6.3, 9.5, -600);
  setGroupGeometry(6.2 * 5, 9.5, -556.3);
  setGroupGeometry(6.5, 33.5, -556.1);
}

export function createGroupPipes() {
  var pipeClone;
  var goombaClone;
  for (var i = 0; i < 4; i++) {
    pipeClone = pipe.clone();
    pipeClone.position.set(-5.25, -14.1, -510 + 40 * i);
    scene.add(pipeClone);
    groupPipes.push(pipeClone);
  }

  groupPipes[0].scale.set(0.3, 0.2, 0.3);
  groupPipes[1].scale.set(0.3, 0.3, 0.3);
  groupPipes[2].scale.set(0.3, 0.4, 0.3);
  groupPipes[3].scale.set(0.3, 0.5, 0.3);

  setPipeGeometry(groupPipes[0], 9, 7.6);
  setPipeGeometry(groupPipes[1], 16.5, 11.5);
  setPipeGeometry(groupPipes[2], 24.5, 15.5);
  setPipeGeometry(groupPipes[3], 31, 19);

  for (var i = 0; i < 3; i++) {
    goombaClone = goomba.clone();
    goombaClone.position.set(0, -13.3, -460 + 45 * i);
    scene.add(goombaClone);
    groupPipes.push(goombaClone);
  }
  groupPipes[6].position.set(0, -13.3, -410);

  for (var i = 4; i < 7; i++) {
    setGoombaGeometry(groupPipes[i]);
    tweenFunc.goombaAnimation(groupPipes[i], 3);
  }
}

export function createGroup2() {
  var brickClone;
  var questionBoxClone;
  for (var i = 0; i < 2; i++) {
    brickClone = brick.clone();
    brickClone.position.set(0, 5, -320 + 5.5 * 2.25 * i);
    scene.add(brickClone);
    group2.push(brickClone);
    setBrickGeometry(brickClone);
  }
  for (var i = 0; i < 2; i++) {
    questionBoxClone = questionBox.clone();
    questionBoxClone.position.set(0, 6.2, -360.5 + 47.96 * i);
    scene.add(questionBoxClone);
    group2.push(questionBoxClone);
    setQuestionBoxGeometry(questionBoxClone);
  }

  coinClone = coin.clone();
  coinClone.position.set(0, 9, -360.5);
  scene.add(coinClone);
  group2.push(coinClone);
  setCoinGeometry(coinClone);

  objectArray.push(coinClone);

  powerUpClone = powerUp.clone();
  powerUpClone.position.set(0, 9, -312.5);
  scene.add(powerUpClone);
  group2.push(powerUpClone);
  setPowerUpGeometry(powerUpClone);

  objectArray.push(powerUpClone);

  setGroupGeometry(6.5, 9.5, -360.5);
  setGroupGeometry(6.3 * 3, 9.5, -312.5);
}

export function createGroup3() {
  var brickClone;
  for (var i = 0; i < 8; i++) {
    brickClone = brick.clone();
    brickClone.position.set(0, 28.8, -300 + 5.5 * i);
    scene.add(brickClone);
    group3.push(brickClone);
    setBrickGeometry(brickClone);
  }

  setGroupGeometry(5.6 * 8, 33.5, -279.5);

  for (var i = 0; i < 2; i++) {
    goombaClone = goomba.clone();
    goombaClone.position.set(0, 36.8, -292 + 10 * i);
    scene.add(goombaClone);
    group3.push(goombaClone);
    setGoombaGeometry(goombaClone);
    tweenFunc.goombaAnimation(goombaClone, 3);
  }
}

export function createGroup4() {
  var brickClone;
  var questionBoxClone;
  for (var i = 0; i < 8; i++) {
    brickClone = brick.clone();
    scene.add(brickClone);
    group4.push(brickClone);
  }
  for (var i = 0; i < 4; i++) {
    questionBoxClone = questionBox.clone();
    scene.add(questionBoxClone);
    group4.push(questionBoxClone);
  }
  group4[0].position.set(0, 28.8, -240);
  group4[1].position.set(0, 28.8, -240 + 5.5);
  group4[2].position.set(0, 28.8, -240 + 5.5 * 2);
  group4[8].position.set(0, 30, -238 + 5.5 * 3);

  group4[9].position.set(0, 30, -182);

  group4[3].position.set(0, 28.8, -142.5);
  group4[4].position.set(0, 28.8, -142.5 + 5.5);
  group4[5].position.set(0, 28.8, -142.5 + 5.5 * 2);

  group4[6].position.set(0, 28.8, -102.5);
  group4[7].position.set(0, 28.8, -84);
  group4[10].position.set(0, 30, -94.8);
  group4[11].position.set(0, 30, -94.8 + 5.8);

  for (var i = 0; i < 8; i++) {
    setBrickGeometry(group4[i]);
  }

  for (var i = 8; i < 12; i++) {
    setQuestionBoxGeometry(group4[i]);
  }

  for (var i = 0; i < 3; i++) {
    coinClone = coin.clone();
    coinClone.position.set(0, 33, -221.5 + 126.7 * i);
    scene.add(coinClone);
    group4.push(coinClone);
  }
  group4[14].position.set(0, 33, -89.3);

  for (var i = 12; i < 15; i++) {
    setCoinGeometry(group4[i]);
  }

  powerUpClone = powerUp.clone();
  powerUpClone.position.set(0, 33, -182);
  scene.add(powerUpClone);
  group4.push(powerUpClone);
  setPowerUpGeometry(powerUpClone);

  objectArray.push(group4[12]);
  objectArray.push(group4[15]);
  objectArray.push(group4[13]);
  objectArray.push(group4[14]);

  setGroupGeometry(6.1 * 4, 33.5, -230);
  setGroupGeometry(6.5, 33.5, -182);
  setGroupGeometry(5.6 * 3, 33.5, -135.8);
  setGroupGeometry(6.3 * 4, 33.5, -92);
}

export function createGroup5() {
  var brickClone;
  var questionBoxClone;
  for (var i = 0; i < 3; i++) {
    brickClone = brick.clone();
    scene.add(brickClone);
    group5.push(brickClone);
  }
  for (var i = 0; i < 3; i++) {
    questionBoxClone = questionBox.clone();
    scene.add(questionBoxClone);
    group5.push(questionBoxClone);
  }
  group5[0].position.set(0, 5, -221.5);

  group5[3].position.set(0, 6.2, -197);
  group5[4].position.set(0, 6.2, -182);
  group5[5].position.set(0, 6.2, -167);

  group5[1].position.set(0, 5, -95.8);
  group5[2].position.set(0, 5, -95.8 + 5.5);

  for (var i = 0; i < 3; i++) {
    coinClone = coin.clone();
    coinClone.position.set(0, 9, -197 + 23.25 * i);
    scene.add(coinClone);
    group5.push(coinClone);
  }

  group5[7].position.set(0, 9, -182);
  group5[8].position.set(0, 9, -167);

  for (var i = 6; i < 9; i++) {
    setCoinGeometry(group5[i]);
  }

  objectArray.push(group5[6]);
  objectArray.push(group5[7]);
  objectArray.push(group5[8]);

  for (var i = 0; i < 6; i++) {
    goombaClone = goomba.clone();
    goombaClone.position.set(0, -13.3, -220 + 10 * i);
    scene.add(goombaClone);
    group5.push(goombaClone);
  }

  group5[11].position.set(0, -13.3, -120);
  group5[12].position.set(0, -13.3, -110);
  group5[13].position.set(0, -13.3, -100);
  group5[14].position.set(0, -13.3, -90);

  for (var i = 9; i < 15; i++) {
    setGoombaGeometry(group5[i]);
    tweenFunc.goombaAnimation(group5[i], 15);
  }

  for (var i = 0; i < 3; i++) {
    setBrickGeometry(group5[i]);
  }
  for (var i = 3; i < 6; i++) {
    setQuestionBoxGeometry(group5[i]);
  }

  setGroupGeometry(6, 9.5, -220);
  setGroupGeometry(6.5, 9.5, -197);
  setGroupGeometry(6.5, 9.5, -182);
  setGroupGeometry(6.5, 9.5, -167);
  setGroupGeometry(5.7 * 2, 9.5, -92);
}

export function createGroupStairs(start, width) {
  var emptyBlockClone1;
  var emptyBlockClone2;
  var emptyBlockClone3;
  var emptyBlockClone4;
  var emptyBlockClone5;
  for (var i = 0; i < width; i++) {
    emptyBlockClone1 = emptyBlock.clone();
    emptyBlockClone2 = emptyBlock.clone();
    emptyBlockClone3 = emptyBlock.clone();
    emptyBlockClone4 = emptyBlock.clone();
    emptyBlockClone5 = emptyBlock.clone();
    emptyBlockClone1.position.set(0, -11.2, start + 5.5 * i);
    emptyBlockClone2.position.set(-5.5, -11.2, start + 5.5 * i);
    emptyBlockClone3.position.set(5.5, -11.2, start + 5.5 * i);
    emptyBlockClone4.position.set(-11, -11.2, start + 5.5 * i);
    emptyBlockClone5.position.set(11, -11.2, start + 5.5 * i);
    scene.add(emptyBlockClone1);
    scene.add(emptyBlockClone2);
    scene.add(emptyBlockClone3);
    scene.add(emptyBlockClone4);
    scene.add(emptyBlockClone5);
    stairs.push(emptyBlockClone1);
    stairs.push(emptyBlockClone2);
    stairs.push(emptyBlockClone3);
    stairs.push(emptyBlockClone4);
    stairs.push(emptyBlockClone5);

    setEmptyBlockGeometry(emptyBlockClone1);
  }
  for (var i = 1; i < width; i++) {
    emptyBlockClone1 = emptyBlock.clone();
    emptyBlockClone2 = emptyBlock.clone();
    emptyBlockClone3 = emptyBlock.clone();
    emptyBlockClone4 = emptyBlock.clone();
    emptyBlockClone5 = emptyBlock.clone();
    emptyBlockClone1.position.set(0, -11.2 + 5.5, start + 5.5 * i);
    emptyBlockClone2.position.set(-5.5, -11.2 + 5.5, start + 5.5 * i);
    emptyBlockClone3.position.set(5.5, -11.2 + 5.5, start + 5.5 * i);
    emptyBlockClone4.position.set(-11, -11.2 + 5.5, start + 5.5 * i);
    emptyBlockClone5.position.set(11, -11.2 + 5.5, start + 5.5 * i);
    scene.add(emptyBlockClone1);
    scene.add(emptyBlockClone2);
    scene.add(emptyBlockClone3);
    scene.add(emptyBlockClone4);
    scene.add(emptyBlockClone5);
    stairs.push(emptyBlockClone1);
    stairs.push(emptyBlockClone2);
    stairs.push(emptyBlockClone3);
    stairs.push(emptyBlockClone4);
    stairs.push(emptyBlockClone5);

    setEmptyBlockGeometry(emptyBlockClone1);
  }
  for (var i = 2; i < width; i++) {
    emptyBlockClone1 = emptyBlock.clone();
    emptyBlockClone2 = emptyBlock.clone();
    emptyBlockClone3 = emptyBlock.clone();
    emptyBlockClone4 = emptyBlock.clone();
    emptyBlockClone5 = emptyBlock.clone();
    emptyBlockClone1.position.set(0, -11.2 + 5.5 * 2, start + 5.5 * i);
    emptyBlockClone2.position.set(-5.5, -11.2 + 5.5 * 2, start + 5.5 * i);
    emptyBlockClone3.position.set(5.5, -11.2 + 5.5 * 2, start + 5.5 * i);
    emptyBlockClone4.position.set(-11, -11.2 + 5.5 * 2, start + 5.5 * i);
    emptyBlockClone5.position.set(11, -11.2 + 5.5 * 2, start + 5.5 * i);
    scene.add(emptyBlockClone1);
    scene.add(emptyBlockClone2);
    scene.add(emptyBlockClone3);
    scene.add(emptyBlockClone4);
    scene.add(emptyBlockClone5);
    stairs.push(emptyBlockClone1);
    stairs.push(emptyBlockClone2);
    stairs.push(emptyBlockClone3);
    stairs.push(emptyBlockClone4);
    stairs.push(emptyBlockClone5);

    setEmptyBlockGeometry(emptyBlockClone1);
  }
  if (width == 4) {
    emptyBlockClone1 = emptyBlock.clone();
    emptyBlockClone2 = emptyBlock.clone();
    emptyBlockClone3 = emptyBlock.clone();
    emptyBlockClone4 = emptyBlock.clone();
    emptyBlockClone5 = emptyBlock.clone();
    emptyBlockClone1.position.set(0, -11.2 + 5.5 * 3, start + 5.5 * 3);
    emptyBlockClone2.position.set(-5.5, -11.2 + 5.5 * 3, start + 5.5 * 3);
    emptyBlockClone3.position.set(5.5, -11.2 + 5.5 * 3, start + 5.5 * 3);
    emptyBlockClone4.position.set(-11, -11.2 + 5.5 * 3, start + 5.5 * 3);
    emptyBlockClone5.position.set(11, -11.2 + 5.5 * 3, start + 5.5 * 3);
    scene.add(emptyBlockClone1);
    scene.add(emptyBlockClone2);
    scene.add(emptyBlockClone3);
    scene.add(emptyBlockClone4);
    scene.add(emptyBlockClone5);
    stairs.push(emptyBlockClone1);
    stairs.push(emptyBlockClone2);
    stairs.push(emptyBlockClone3);
    stairs.push(emptyBlockClone4);
    stairs.push(emptyBlockClone5);

    setEmptyBlockGeometry(emptyBlockClone1);
  }

  if (width == 8) {
    for (var i = 3; i < width; i++) {
      emptyBlockClone1 = emptyBlock.clone();
      emptyBlockClone2 = emptyBlock.clone();
      emptyBlockClone3 = emptyBlock.clone();
      emptyBlockClone4 = emptyBlock.clone();
      emptyBlockClone5 = emptyBlock.clone();
      emptyBlockClone1.position.set(0, -11.2 + 5.5 * 3, start + 5.5 * i);
      emptyBlockClone2.position.set(-5.5, -11.2 + 5.5 * 3, start + 5.5 * i);
      emptyBlockClone3.position.set(5.5, -11.2 + 5.5 * 3, start + 5.5 * i);
      emptyBlockClone4.position.set(-11, -11.2 + 5.5 * 3, start + 5.5 * i);
      emptyBlockClone5.position.set(11, -11.2 + 5.5 * 3, start + 5.5 * i);
      scene.add(emptyBlockClone1);
      scene.add(emptyBlockClone2);
      scene.add(emptyBlockClone3);
      scene.add(emptyBlockClone4);
      scene.add(emptyBlockClone5);
      stairs.push(emptyBlockClone1);
      stairs.push(emptyBlockClone2);
      stairs.push(emptyBlockClone3);
      stairs.push(emptyBlockClone4);
      stairs.push(emptyBlockClone5);

      setEmptyBlockGeometry(emptyBlockClone1);
    }
    for (var i = 4; i < width; i++) {
      emptyBlockClone1 = emptyBlock.clone();
      emptyBlockClone2 = emptyBlock.clone();
      emptyBlockClone3 = emptyBlock.clone();
      emptyBlockClone4 = emptyBlock.clone();
      emptyBlockClone5 = emptyBlock.clone();
      emptyBlockClone1.position.set(0, -11.2 + 5.5 * 4, start + 5.5 * i);
      emptyBlockClone2.position.set(-5.5, -11.2 + 5.5 * 4, start + 5.5 * i);
      emptyBlockClone3.position.set(5.5, -11.2 + 5.5 * 4, start + 5.5 * i);
      emptyBlockClone4.position.set(-11, -11.2 + 5.5 * 4, start + 5.5 * i);
      emptyBlockClone5.position.set(11, -11.2 + 5.5 * 4, start + 5.5 * i);
      scene.add(emptyBlockClone1);
      scene.add(emptyBlockClone2);
      scene.add(emptyBlockClone3);
      scene.add(emptyBlockClone4);
      scene.add(emptyBlockClone5);
      stairs.push(emptyBlockClone1);
      stairs.push(emptyBlockClone2);
      stairs.push(emptyBlockClone3);
      stairs.push(emptyBlockClone4);
      stairs.push(emptyBlockClone5);

      setEmptyBlockGeometry(emptyBlockClone1);
    }
    for (var i = 5; i < width; i++) {
      emptyBlockClone1 = emptyBlock.clone();
      emptyBlockClone2 = emptyBlock.clone();
      emptyBlockClone3 = emptyBlock.clone();
      emptyBlockClone4 = emptyBlock.clone();
      emptyBlockClone5 = emptyBlock.clone();
      emptyBlockClone1.position.set(0, -11.2 + 5.5 * 5, start + 5.5 * i);
      emptyBlockClone2.position.set(-5.5, -11.2 + 5.5 * 5, start + 5.5 * i);
      emptyBlockClone3.position.set(5.5, -11.2 + 5.5 * 5, start + 5.5 * i);
      emptyBlockClone4.position.set(-11, -11.2 + 5.5 * 5, start + 5.5 * i);
      emptyBlockClone5.position.set(11, -11.2 + 5.5 * 5, start + 5.5 * i);
      scene.add(emptyBlockClone1);
      scene.add(emptyBlockClone2);
      scene.add(emptyBlockClone3);
      scene.add(emptyBlockClone4);
      scene.add(emptyBlockClone5);
      stairs.push(emptyBlockClone1);
      stairs.push(emptyBlockClone2);
      stairs.push(emptyBlockClone3);
      stairs.push(emptyBlockClone4);
      stairs.push(emptyBlockClone5);

      setEmptyBlockGeometry(emptyBlockClone1);
    }
    for (var i = 6; i < width; i++) {
      emptyBlockClone1 = emptyBlock.clone();
      emptyBlockClone2 = emptyBlock.clone();
      emptyBlockClone3 = emptyBlock.clone();
      emptyBlockClone4 = emptyBlock.clone();
      emptyBlockClone5 = emptyBlock.clone();
      emptyBlockClone1.position.set(0, -11.2 + 5.5 * 6, start + 5.5 * i);
      emptyBlockClone2.position.set(-5.5, -11.2 + 5.5 * 6, start + 5.5 * i);
      emptyBlockClone3.position.set(5.5, -11.2 + 5.5 * 6, start + 5.5 * i);
      emptyBlockClone4.position.set(-11, -11.2 + 5.5 * 6, start + 5.5 * i);
      emptyBlockClone5.position.set(11, -11.2 + 5.5 * 6, start + 5.5 * i);
      scene.add(emptyBlockClone1);
      scene.add(emptyBlockClone2);
      scene.add(emptyBlockClone3);
      scene.add(emptyBlockClone4);
      scene.add(emptyBlockClone5);
      stairs.push(emptyBlockClone1);
      stairs.push(emptyBlockClone2);
      stairs.push(emptyBlockClone3);
      stairs.push(emptyBlockClone4);
      stairs.push(emptyBlockClone5);

      setEmptyBlockGeometry(emptyBlockClone1);
    }

    emptyBlockClone1 = emptyBlock.clone();
    emptyBlockClone2 = emptyBlock.clone();
    emptyBlockClone3 = emptyBlock.clone();
    emptyBlockClone4 = emptyBlock.clone();
    emptyBlockClone5 = emptyBlock.clone();
    emptyBlockClone1.position.set(0, -11.2 + 5.5 * 7, start + 5.5 * 7);
    emptyBlockClone2.position.set(-5.5, -11.2 + 5.5 * 7, start + 5.5 * 7);
    emptyBlockClone3.position.set(5.5, -11.2 + 5.5 * 7, start + 5.5 * 7);
    emptyBlockClone4.position.set(-11, -11.2 + 5.5 * 7, start + 5.5 * 7);
    emptyBlockClone5.position.set(11, -11.2 + 5.5 * 7, start + 5.5 * 7);
    scene.add(emptyBlockClone1);
    scene.add(emptyBlockClone2);
    scene.add(emptyBlockClone3);
    scene.add(emptyBlockClone4);
    scene.add(emptyBlockClone5);
    stairs.push(emptyBlockClone1);
    stairs.push(emptyBlockClone2);
    stairs.push(emptyBlockClone3);
    stairs.push(emptyBlockClone4);
    stairs.push(emptyBlockClone5);

    setEmptyBlockGeometry(emptyBlockClone1);
  }
}

export function createGroupStairsReverse(start, width) {
  var emptyBlockClone1;
  var emptyBlockClone2;
  var emptyBlockClone3;
  var emptyBlockClone4;
  var emptyBlockClone5;
  for (var i = 0; i < width; i++) {
    emptyBlockClone1 = emptyBlock.clone();
    emptyBlockClone2 = emptyBlock.clone();
    emptyBlockClone3 = emptyBlock.clone();
    emptyBlockClone4 = emptyBlock.clone();
    emptyBlockClone5 = emptyBlock.clone();
    emptyBlockClone1.position.set(0, -11.2, start + 5.5 * i);
    emptyBlockClone2.position.set(-5.5, -11.2, start + 5.5 * i);
    emptyBlockClone3.position.set(5.5, -11.2, start + 5.5 * i);
    emptyBlockClone4.position.set(-11, -11.2, start + 5.5 * i);
    emptyBlockClone5.position.set(11, -11.2, start + 5.5 * i);
    scene.add(emptyBlockClone1);
    scene.add(emptyBlockClone2);
    scene.add(emptyBlockClone3);
    scene.add(emptyBlockClone4);
    scene.add(emptyBlockClone5);
    stairs.push(emptyBlockClone1);
    stairs.push(emptyBlockClone2);
    stairs.push(emptyBlockClone3);
    stairs.push(emptyBlockClone4);
    stairs.push(emptyBlockClone5);

    setEmptyBlockGeometry(emptyBlockClone1);
  }
  for (var i = 0; i < width - 1; i++) {
    emptyBlockClone1 = emptyBlock.clone();
    emptyBlockClone2 = emptyBlock.clone();
    emptyBlockClone3 = emptyBlock.clone();
    emptyBlockClone4 = emptyBlock.clone();
    emptyBlockClone5 = emptyBlock.clone();
    emptyBlockClone1.position.set(0, -11.2 + 5.5, start + 5.5 * i);
    emptyBlockClone2.position.set(-5.5, -11.2 + 5.5, start + 5.5 * i);
    emptyBlockClone3.position.set(5.5, -11.2 + 5.5, start + 5.5 * i);
    emptyBlockClone4.position.set(-11, -11.2 + 5.5, start + 5.5 * i);
    emptyBlockClone5.position.set(11, -11.2 + 5.5, start + 5.5 * i);
    scene.add(emptyBlockClone1);
    scene.add(emptyBlockClone2);
    scene.add(emptyBlockClone3);
    scene.add(emptyBlockClone4);
    scene.add(emptyBlockClone5);
    stairs.push(emptyBlockClone1);
    stairs.push(emptyBlockClone2);
    stairs.push(emptyBlockClone3);
    stairs.push(emptyBlockClone4);
    stairs.push(emptyBlockClone5);

    setEmptyBlockGeometry(emptyBlockClone1);
  }
  for (var i = 0; i < width - 2; i++) {
    emptyBlockClone1 = emptyBlock.clone();
    emptyBlockClone2 = emptyBlock.clone();
    emptyBlockClone3 = emptyBlock.clone();
    emptyBlockClone4 = emptyBlock.clone();
    emptyBlockClone5 = emptyBlock.clone();
    emptyBlockClone1.position.set(0, -11.2 + 5.5 * 2, start + 5.5 * i);
    emptyBlockClone2.position.set(-5.5, -11.2 + 5.5 * 2, start + 5.5 * i);
    emptyBlockClone3.position.set(5.5, -11.2 + 5.5 * 2, start + 5.5 * i);
    emptyBlockClone4.position.set(-11, -11.2 + 5.5 * 2, start + 5.5 * i);
    emptyBlockClone5.position.set(11, -11.2 + 5.5 * 2, start + 5.5 * i);
    scene.add(emptyBlockClone1);
    scene.add(emptyBlockClone2);
    scene.add(emptyBlockClone3);
    scene.add(emptyBlockClone4);
    scene.add(emptyBlockClone5);
    stairs.push(emptyBlockClone1);
    stairs.push(emptyBlockClone2);
    stairs.push(emptyBlockClone3);
    stairs.push(emptyBlockClone4);
    stairs.push(emptyBlockClone5);

    setEmptyBlockGeometry(emptyBlockClone1);
  }

  if (width == 4) {
    emptyBlockClone1 = emptyBlock.clone();
    emptyBlockClone2 = emptyBlock.clone();
    emptyBlockClone3 = emptyBlock.clone();
    emptyBlockClone4 = emptyBlock.clone();
    emptyBlockClone5 = emptyBlock.clone();
    emptyBlockClone1.position.set(0, -11.2 + 5.5 * 3, start);
    emptyBlockClone2.position.set(-5.5, -11.2 + 5.5 * 3, start);
    emptyBlockClone3.position.set(5.5, -11.2 + 5.5 * 3, start);
    emptyBlockClone4.position.set(-11, -11.2 + 5.5 * 3, start);
    emptyBlockClone5.position.set(11, -11.2 + 5.5 * 3, start);
    scene.add(emptyBlockClone1);
    scene.add(emptyBlockClone2);
    scene.add(emptyBlockClone3);
    scene.add(emptyBlockClone4);
    scene.add(emptyBlockClone5);
    stairs.push(emptyBlockClone1);
    stairs.push(emptyBlockClone2);
    stairs.push(emptyBlockClone3);
    stairs.push(emptyBlockClone4);
    stairs.push(emptyBlockClone5);

    setEmptyBlockGeometry(emptyBlockClone1);
  }
}

export function createGroup6() {
  var pipeClone;
  var brickClone;
  var questionBoxClone;
  for (var i = 0; i < 2; i++) {
    pipeClone = pipe.clone();
    pipeClone.position.set(-5.25, -14.1, 120 + 80 * i);
    scene.add(pipeClone);
    group6.push(pipeClone);
    setPipeGeometry(pipeClone, 16.5, 11.5);
  }
  for (var i = 0; i < 3; i++) {
    brickClone = brick.clone();
    brickClone.position.set(0, 5, 135 + 5.5 * i);
    scene.add(brickClone);
    group6.push(brickClone);
  }
  group6[4].position.set(0, 5, 153);

  questionBoxClone = questionBox.clone();
  questionBoxClone.position.set(0, 6.2, 148);
  scene.add(questionBoxClone);
  group6.push(questionBoxClone);

  coinClone = coin.clone();
  coinClone.position.set(0, 9, 148);
  scene.add(coinClone);
  group6.push(coinClone);
  setCoinGeometry(coinClone);
  objectArray.push(coinClone);

  for (var i = 0; i < 2; i++) {
    goombaClone = goomba.clone();
    goombaClone.position.set(0, -13.3, 170 + 10 * i);
    scene.add(goombaClone);
    group6.push(goombaClone);
    setGoombaGeometry(goombaClone);
    tweenFunc.goombaAnimation(goombaClone, 6);
  }

  for (var i = 2; i < 5; i++) {
    setBrickGeometry(group6[i]);
  }

  setQuestionBoxGeometry(questionBoxClone);

  setGroupGeometry(6.1 * 4, 9.5, 145.3);
}
