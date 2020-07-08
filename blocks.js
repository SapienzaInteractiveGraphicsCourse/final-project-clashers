var group1 = new Array();
var group2 = new Array();
var group3 = new Array();
var group4 = new Array();
var group5 = new Array();
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
    //fare il push nell'array
  }
  for (var i = 0; i < 2; i++) {
    questionBoxClone = questionBox.clone();
    questionBoxClone.position.set(0, 6.2, -562.5 + 5.5 * 2.25 * i);
    scene.add(questionBoxClone);
    group1.push(questionBoxClone);
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
    //fare il push nell'array
  }
  pipes[0].scale.set(0.3, 0.2, 0.3);
  pipes[1].scale.set(0.3, 0.3, 0.3);
  pipes[2].scale.set(0.3, 0.4, 0.3);
  pipes[3].scale.set(0.3, 0.5, 0.3);
}

function createGroup2() {
  var brickClone;
  var questionBoxClone;
  for (var i = 0; i < 2; i++) {
    brickClone = brick.clone();
    brickClone.position.set(0, 5, -320 + 5.5 * 2.25 * i);
    scene.add(brickClone);
    group2.push(brickClone);
    //fare il push nell'array
  }
  for (var i = 0; i < 2; i++) {
    questionBoxClone = questionBox.clone();
    questionBoxClone.position.set(0, 6.2, -360.5 + 5.5 * 8.72 * i);
    scene.add(questionBoxClone);
    group2.push(questionBoxClone);
  }
}

function createGroup3() {
  var brickClone;
  for (var i = 0; i < 8; i++) {
    brickClone = brick.clone();
    brickClone.position.set(0, 24, -300 + 5.5 * i);
    scene.add(brickClone);
    group3.push(brickClone);
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
    //fare il push nell'array
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

  group4[9].position.set(0, 25.2, -188);

  group4[3].position.set(0, 24, -142.5);
  group4[4].position.set(0, 24, -142.5 + 5.5);
  group4[5].position.set(0, 24, -142.5 + 5.5 * 2);

  group4[6].position.set(0, 24, -102.5);
  group4[7].position.set(0, 24, -102.5 + 5.5 * 4.5);
  group4[10].position.set(0, 25.2, -150 + 5.5 * 4.5 * 2);
  group4[11].position.set(0, 25.2, -150 + 5.5 * 11);
}

function createGroup5() {
  var brickClone;
  var questionBoxClone;
  for (var i = 0; i < 6; i++) {
    brickClone = brick.clone();
    scene.add(brickClone);
    group5.push(brickClone);
    //fare il push nell'array
  }
  for (var i = 0; i < 3; i++) {
    questionBoxClone = questionBox.clone();
    scene.add(questionBoxClone);
    group5.push(questionBoxClone);
  }
  group5[0].position.set(0, 5, -221.5);
}
