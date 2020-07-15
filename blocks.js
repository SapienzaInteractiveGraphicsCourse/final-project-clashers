var group1 = new Array();
var group2 = new Array();
var group3 = new Array();
var group4 = new Array();
var group5 = new Array();
var group6 = new Array();
var stairs = new Array();
var groupPipes = new Array();

function createGroup1() {
  var brickClone;
  var questionBoxClone;
  var coinClone;
  var powerUpClone;
  var goombaClone;
  for (var i = 0; i < 3; i++) {
    brickClone = brick.clone();
    brickClone.position.set(0, 5, -570 + 5.5 * 2.25 * i);
    scene.add(brickClone);
    group1.push(brickClone);
    setBrickGeometry(brickClone);
  }

  for (var i = 0; i < 4; i++) {
    questionBoxClone = questionBox.clone();
    questionBoxClone.position.set(0, 6.2, -562.5 + 5.5 * 2.25 * i); //-562.5 + 5.5 * 2.25 * i
    scene.add(questionBoxClone);
    group1.push(questionBoxClone);
  }
  group1[5].position.set(0, 25.2, -556);
  group1[6].position.set(0, 6.2, -600);
  for (var i = 3; i < 7; i++) {
    setQuestionBoxGeometry(group1[i]);
  }
  for (var i = 0; i < 3; i++) {
    coinClone = coin.clone();
    coinClone.position.set(0, 16.5, -600 + 50 * i); //8.5
    scene.add(coinClone);
    group1.push(coinClone);
  }
  group1[9].position.set(0, 35, -556);

  for (var i = 7; i < 10; i++) {
    setCoinGeometry(group1[i]);
  }

  powerUpClone = powerUp.clone();
  powerUpClone.position.set(0, 16.5, -562.5); //16.5
  scene.add(powerUpClone);
  group1.push(powerUpClone);
  setPowerUpGeometry(powerUpClone);

  goombaClone = goomba.clone();
  goombaClone.position.set(0, -13.3, -562.5);
  scene.add(goombaClone);
  group1.push(goombaClone);
  setGoombaGeometry(goombaClone);
}

function createGroupPipes() {
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

  for (var i = 0; i < 3; i++) {
    goombaClone = goomba.clone();
    goombaClone.position.set(-5.25, -13.3, -460 + 45 * i);
    scene.add(goombaClone);
    groupPipes.push(goombaClone);
  }
  groupPipes[6].position.set(-5.25, -13.3, -410);

  for (var i = 4; i < 7; i++) {
    setGoombaGeometry(groupPipes[i]);
  }

  setPipeGeometry(groupPipes[0], 7.5, 7.6);
  setPipeGeometry(groupPipes[1], 17.2, 7.6);
  setPipeGeometry(groupPipes[2], 25.2, 7.6);
  setPipeGeometry(groupPipes[3], 33, 7.6);
}

function createGroup2() {
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
  coinClone.position.set(0, 16.5, -360.5);
  scene.add(coinClone);
  group2.push(coinClone);
  setCoinGeometry(coinClone);

  powerUpClone = powerUp.clone();
  powerUpClone.position.set(0, 16.5, -312.5);
  scene.add(powerUpClone);
  group2.push(powerUpClone);
  setPowerUpGeometry(powerUpClone);
}

function createGroup3() {
  var brickClone;
  for (var i = 0; i < 8; i++) {
    brickClone = brick.clone();
    brickClone.position.set(0, 24, -300 + 5.5 * i);
    scene.add(brickClone);
    group3.push(brickClone);
    setBrickGeometry(brickClone);
  }
  for (var i = 0; i < 2; i++) {
    goombaClone = goomba.clone();
    goombaClone.position.set(0, 32.5, -292 + 10 * i);
    scene.add(goombaClone);
    group3.push(goombaClone);
    setGoombaGeometry(goombaClone);
  }
}

function createGroup4() {
  //livello in alto seconda parte
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
  group4[0].position.set(0, 24, -240);
  group4[1].position.set(0, 24, -240 + 5.5);
  group4[2].position.set(0, 24, -240 + 5.5 * 2);
  group4[8].position.set(0, 25.2, -238 + 5.5 * 3);

  group4[9].position.set(0, 25.2, -182);

  group4[3].position.set(0, 24, -142.5);
  group4[4].position.set(0, 24, -142.5 + 5.5);
  group4[5].position.set(0, 24, -142.5 + 5.5 * 2);

  group4[6].position.set(0, 24, -102.5);
  group4[7].position.set(0, 24, -84);
  group4[10].position.set(0, 25.2, -94.8);
  group4[11].position.set(0, 25.2, -94.8 + 5.8);

  for (var i = 0; i < 8; i++) {
    setBrickGeometry(group4[i]);
  }

  for (var i = 8; i < 12; i++) {
    setQuestionBoxGeometry(group4[i]);
  }

  for (var i = 0; i < 3; i++) {
    coinClone = coin.clone();
    coinClone.position.set(0, 35, -221.5 + 126.7 * i); //8.5
    scene.add(coinClone);
    group4.push(coinClone);
  }
  group4[14].position.set(0, 35, -89.3);

  for (var i = 12; i < 15; i++) {
    setCoinGeometry(group4[i]);
  }

  powerUpClone = powerUp.clone();
  powerUpClone.position.set(0, 35, -182);
  scene.add(powerUpClone);
  group4.push(powerUpClone);
  setPowerUpGeometry(powerUpClone);
}

function createGroup5() {
  //livello in basso seconda parte
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

  for (var i = 0; i < 4; i++) {
    coinClone = coin.clone();
    coinClone.position.set(0, 16.5, -220.25 + 23.25 * i); //8.5
    scene.add(coinClone);
    group5.push(coinClone);
  }

  group5[8].position.set(0, 16.5, -182);
  group5[9].position.set(0, 16.5, -167);

  for (var i = 6; i < 10; i++) {
    setCoinGeometry(group5[i]);
  }

  for (var i = 0; i < 6; i++) {
    goombaClone = goomba.clone();
    goombaClone.position.set(0, -13.3, -220 + 10 * i);
    scene.add(goombaClone);
    group5.push(goombaClone);
  }

  group5[12].position.set(0, -13.3, -120);
  group5[13].position.set(0, -13.3, -110);
  group5[14].position.set(0, -13.3, -100);
  group5[15].position.set(0, -13.3, -90);

  for (var i = 0; i < 3; i++) {
    setBrickGeometry(group5[i]);
  }
  for (var i = 3; i < 6; i++) {
    setQuestionBoxGeometry(group5[i]);
  }

  for (var i = 10; i < 16; i++) {
    setGoombaGeometry(group5[i]);
  }
}

function createGroupStairs(start, width) {
  //blocchi messi a scaletta
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
    setEmptyBlockGeometry(emptyBlockClone2);
    setEmptyBlockGeometry(emptyBlockClone3);
    setEmptyBlockGeometry(emptyBlockClone4);
    setEmptyBlockGeometry(emptyBlockClone5);
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
    setEmptyBlockGeometry(emptyBlockClone2);
    setEmptyBlockGeometry(emptyBlockClone3);
    setEmptyBlockGeometry(emptyBlockClone4);
    setEmptyBlockGeometry(emptyBlockClone5);
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
    setEmptyBlockGeometry(emptyBlockClone2);
    setEmptyBlockGeometry(emptyBlockClone3);
    setEmptyBlockGeometry(emptyBlockClone4);
    setEmptyBlockGeometry(emptyBlockClone5);
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
    setEmptyBlockGeometry(emptyBlockClone2);
    setEmptyBlockGeometry(emptyBlockClone3);
    setEmptyBlockGeometry(emptyBlockClone4);
    setEmptyBlockGeometry(emptyBlockClone5);
  }

  if (width == 5) {
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
      setEmptyBlockGeometry(emptyBlockClone2);
      setEmptyBlockGeometry(emptyBlockClone3);
      setEmptyBlockGeometry(emptyBlockClone4);
      setEmptyBlockGeometry(emptyBlockClone5);
    }
  }

  if (width == 9) {
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
      setEmptyBlockGeometry(emptyBlockClone2);
      setEmptyBlockGeometry(emptyBlockClone3);
      setEmptyBlockGeometry(emptyBlockClone4);
      setEmptyBlockGeometry(emptyBlockClone5);
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
      setEmptyBlockGeometry(emptyBlockClone2);
      setEmptyBlockGeometry(emptyBlockClone3);
      setEmptyBlockGeometry(emptyBlockClone4);
      setEmptyBlockGeometry(emptyBlockClone5);
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
      setEmptyBlockGeometry(emptyBlockClone2);
      setEmptyBlockGeometry(emptyBlockClone3);
      setEmptyBlockGeometry(emptyBlockClone4);
      setEmptyBlockGeometry(emptyBlockClone5);
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
      setEmptyBlockGeometry(emptyBlockClone2);
      setEmptyBlockGeometry(emptyBlockClone3);
      setEmptyBlockGeometry(emptyBlockClone4);
      setEmptyBlockGeometry(emptyBlockClone5);
    }
    for (var i = 7; i < width; i++) {
      emptyBlockClone1 = emptyBlock.clone();
      emptyBlockClone2 = emptyBlock.clone();
      emptyBlockClone3 = emptyBlock.clone();
      emptyBlockClone4 = emptyBlock.clone();
      emptyBlockClone5 = emptyBlock.clone();
      emptyBlockClone1.position.set(0, -11.2 + 5.5 * 7, start + 5.5 * i);
      emptyBlockClone2.position.set(-5.5, -11.2 + 5.5 * 7, start + 5.5 * i);
      emptyBlockClone3.position.set(5.5, -11.2 + 5.5 * 7, start + 5.5 * i);
      emptyBlockClone4.position.set(-11, -11.2 + 5.5 * 7, start + 5.5 * i);
      emptyBlockClone5.position.set(11, -11.2 + 5.5 * 7, start + 5.5 * i);
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
      setEmptyBlockGeometry(emptyBlockClone2);
      setEmptyBlockGeometry(emptyBlockClone3);
      setEmptyBlockGeometry(emptyBlockClone4);
      setEmptyBlockGeometry(emptyBlockClone5);
    }
  }
}

function createGroupStairsReverse(start, width) {
  //blocchi messi a scaletta
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
    setEmptyBlockGeometry(emptyBlockClone2);
    setEmptyBlockGeometry(emptyBlockClone3);
    setEmptyBlockGeometry(emptyBlockClone4);
    setEmptyBlockGeometry(emptyBlockClone5);
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
    setEmptyBlockGeometry(emptyBlockClone2);
    setEmptyBlockGeometry(emptyBlockClone3);
    setEmptyBlockGeometry(emptyBlockClone4);
    setEmptyBlockGeometry(emptyBlockClone5);
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
    setEmptyBlockGeometry(emptyBlockClone2);
    setEmptyBlockGeometry(emptyBlockClone3);
    setEmptyBlockGeometry(emptyBlockClone4);
    setEmptyBlockGeometry(emptyBlockClone5);
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
    setEmptyBlockGeometry(emptyBlockClone2);
    setEmptyBlockGeometry(emptyBlockClone3);
    setEmptyBlockGeometry(emptyBlockClone4);
    setEmptyBlockGeometry(emptyBlockClone5);
  }

  if (width == 5) {
    for (var i = 0; i < width - 3; i++) {
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
      setEmptyBlockGeometry(emptyBlockClone2);
      setEmptyBlockGeometry(emptyBlockClone3);
      setEmptyBlockGeometry(emptyBlockClone4);
      setEmptyBlockGeometry(emptyBlockClone5);
    }
  }
}

function createGroup6() {
  var pipeClone;
  var brickClone;
  var questionBoxClone;
  for (var i = 0; i < 2; i++) {
    pipeClone = pipe.clone();
    pipeClone.position.set(-5.25, -14.1, 120 + 80 * i);
    scene.add(pipeClone);
    group6.push(pipeClone);
    setPipeGeometry(pipeClone, 17.2, 7.6); //da modificare
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
  coinClone.position.set(0, 16.5, 148); //8.5
  scene.add(coinClone);
  group6.push(coinClone);
  setCoinGeometry(coinClone);

  for (var i = 0; i < 2; i++) {
    goombaClone = goomba.clone();
    goombaClone.position.set(0, -13.3, 170 + 10 * i);
    scene.add(goombaClone);
    group6.push(goombaClone);
    setGoombaGeometry(goombaClone);
  }

  for (var i = 2; i < 5; i++) {
    setBrickGeometry(group6[i]);
  }

  setQuestionBoxGeometry(questionBoxClone);
}

function setQuestionBoxGeometry(questionBoxElem) {
  var questionBoxGeometry = new THREE.BoxGeometry(6.3, 6.3, 6.3);
  questionBoxContainer = new Physijs.BoxMesh(
    questionBoxGeometry,
    geometryMaterial,
    0
  ); //mass 0
  questionBoxContainer.position.set(
    questionBoxElem.position.x,
    questionBoxElem.position.y + 3.1,
    questionBoxElem.position.z
  );
  scene.add(questionBoxContainer);
  questionBoxContainer.__dirtyPosition = true;
  questionBoxContainer.__dirtyRotation = false;
  //questionBoxContainer.addEventListener("collision", onCollision);
}

function setBrickGeometry(brickElem) {
  var brickGeometry = new THREE.BoxGeometry(6.3, 6.2, 5.8);
  brickContainer = new Physijs.BoxMesh(brickGeometry, geometryMaterial, 0);
  brickContainer.position.set(
    brickElem.position.x,
    brickElem.position.y + 4.3,
    brickElem.position.z + 1.2
  );
  scene.add(brickContainer);
}

function setPipeGeometry(pipeElem, y, y_top) {
  var pipeGeometry = new THREE.BoxGeometry(10.5, y, 10.5);
  pipeContainer = new Physijs.BoxMesh(pipeGeometry, geometryMaterial, 0);
  pipeContainer.position.set(
    pipeElem.position.x + 5,
    pipeElem.position.y + 3.2,
    pipeElem.position.z - 5.3
  );
  var pipeGeometryTop = new THREE.BoxGeometry(10, 1.8, 10);
  pipeContainerTop = new Physijs.BoxMesh(pipeGeometryTop, geometryMaterial2, 0);
  pipeContainerTop.position.set(
    pipeElem.position.x + 5,
    pipeElem.position.y + y_top,
    pipeElem.position.z - 5.3
  );

  scene.add(pipeContainer);
  scene.add(pipeContainerTop);
  pipeContainerTop.setCcdMotionThreshold(1);
  pipeContainer.addEventListener("collision", onPipeCollision);
  pipeContainerTop.addEventListener("collision", onPipeTopCollision);
}

function setEmptyBlockGeometry(emptyBlockElem) {
  var emptyBlockGeometry = new THREE.BoxGeometry(5.7, 5.7, 5.7);
  emptyBlockContainer = new Physijs.BoxMesh(
    emptyBlockGeometry,
    geometryMaterial,
    0
  );
  emptyBlockContainer.position.set(
    emptyBlockElem.position.x,
    emptyBlockElem.position.y,
    emptyBlockElem.position.z
  );
  scene.add(emptyBlockContainer);
}

function setCoinGeometry(coinElem) {
  var coinGeometry = new THREE.BoxGeometry(2, 4, 4);
  coinContainer = new Physijs.BoxMesh(coinGeometry, geometryMaterial, 0);
  coinContainer.position.set(
    coinElem.position.x,
    coinElem.position.y,
    coinElem.position.z
  );
  scene.add(coinContainer);
}

function setPowerUpGeometry(powerUpElem) {
  var powerUpGeometry = new THREE.BoxGeometry(4.7, 4.5, 4.7);
  powerUpContainer = new Physijs.BoxMesh(powerUpGeometry, geometryMaterial, 0);
  powerUpContainer.position.set(
    powerUpElem.position.x,
    powerUpElem.position.y,
    powerUpElem.position.z
  );
  scene.add(powerUpContainer);
}

function setGoombaGeometry(goombaElem) {
  var goombaGeometry = new THREE.BoxGeometry(4.7, 5.2, 4.8);
  goombaContainer = new Physijs.BoxMesh(goombaGeometry, geometryMaterial, 0);
  goombaContainer.position.set(
    goombaElem.position.x,
    goombaElem.position.y + 1.8,
    goombaElem.position.z
  );
  scene.add(goombaContainer);
}
