var group1 = new Array();
var group2 = new Array();
var group3 = new Array();
var group4 = new Array();
var group5 = new Array();
var group6 = new Array();
var stairs = new Array();
var pipes = new Array();

function createGroup1() {
  var brickClone;
  var questionBoxClone;
  var coinClone;
  for (var i = 0; i < 3; i++) {
    brickClone = brick.clone();
    brickClone.position.set(0, 5, -570 + 5.5 * 2.25 * i);
    scene.add(brickClone);
    group1.push(brickClone);
    setBrickGeometry(brickClone);
  }

  for (var i = 0; i < 2; i++) {
    questionBoxClone = questionBox.clone();
    questionBoxClone.position.set(0, 6.2, -562.5 + 5.5 * 2.25 * i);
    scene.add(questionBoxClone);
    group1.push(questionBoxClone);
    setQuestionBoxGeometry(questionBoxClone);
  }
  for (var i = 0; i < 3; i++) {
    coinClone = coin.clone();
    coinClone.position.set(0, 8.5, -568.8 + 5.5 * 2.25 * i);
    scene.add(coinClone);
    group1.push(coinClone);
  }
}

function createGroupPipes() {
  var pipeClone;
  for (var i = 0; i < 4; i++) {
    pipeClone = pipe.clone();
    pipeClone.position.set(-5.25, -14.1, -510 + 40 * i);
    scene.add(pipeClone);
    pipes.push(pipeClone);
  }
  pipes[0].scale.set(0.3, 0.2, 0.3);
  pipes[1].scale.set(0.3, 0.3, 0.3);
  pipes[2].scale.set(0.3, 0.4, 0.3);
  pipes[3].scale.set(0.3, 0.5, 0.3);

  setPipeGeometry(pipes[0], 9.7);
  setPipeGeometry(pipes[1], 17.2);
  setPipeGeometry(pipes[2], 25.2);
  setPipeGeometry(pipes[3], 33);
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
    questionBoxClone.position.set(0, 6.2, -360.5 + 5.5 * 8.72 * i);
    scene.add(questionBoxClone);
    group2.push(questionBoxClone);
    setQuestionBoxGeometry(questionBoxClone);
  }
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
  group4[7].position.set(0, 24, -102.5 + 18.15);
  group4[10].position.set(0, 25.2, -94.9);
  group4[11].position.set(0, 25.2, -94.9 + 5.5);

  for (var i = 0; i < 8; i++) {
    setBrickGeometry(group4[i]);
  }

  for (var i = 8; i < 12; i++) {
    setQuestionBoxGeometry(group4[i]);
  }
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

  group5[1].position.set(0, 5, -95.5);
  group5[2].position.set(0, 5, -95.5 + 5.5);

  for (var i = 0; i < 3; i++) {
    setBrickGeometry(group5[i]);
  }
  for (var i = 3; i < 6; i++) {
    setQuestionBoxGeometry(group5[i]);
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
    pipes.push(pipeClone);
    setPipeGeometry(pipeClone, 17.2);
  }
  for (var i = 0; i < 3; i++) {
    brickClone = brick.clone();
    brickClone.position.set(0, 5, 135 + 5.5 * i);
    scene.add(brickClone);
    group6.push(brickClone);
  }
  group6[2].position.set(0, 5, 153);
  questionBoxClone = questionBox.clone();
  questionBoxClone.position.set(0, 6.2, 148);
  scene.add(questionBoxClone);
  group6.push(questionBoxClone);

  for (var i = 0; i < 3; i++) {
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
  );
  questionBoxContainer.position.set(
    questionBoxElem.position.x,
    questionBoxElem.position.y + 3.1,
    questionBoxElem.position.z
  );
  scene.add(questionBoxContainer);
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

function setPipeGeometry(pipeElem, y) {
  var pipeGeometry = new THREE.BoxGeometry(10.5, y, 10.7);
  pipeContainer = new Physijs.BoxMesh(pipeGeometry, geometryMaterial, 0);
  pipeContainer.position.set(
    pipeElem.position.x + 5,
    pipeElem.position.y + 3.2,
    pipeElem.position.z - 5.3
  );
  scene.add(pipeContainer);
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
