var bricks = new Array();
var pipes = new Array();

function createGroup1() {
  var brickClone;
  var questionBoxClone;
  var coinClone;
  for (var i = 0; i < 3; i++) {
    brickClone = brick.clone();
    brickClone.position.set(0, 5, -570 + 5.5 * 2.25 * i);
    scene.add(brickClone);
    //fare il push nell'array
  }
  for (var i = 0; i < 2; i++) {
    questionBoxClone = questionBox.clone();
    questionBoxClone.position.set(0, 6.2, -562.5 + 5.5 * 2.25 * i);
    scene.add(questionBoxClone);
  }
  for (var i = 0; i < 3; i++) {
    coinClone = coin.clone();
    coinClone.position.set(0, 8.5, -568.8 + 5.5 * 2.25 * i);
    scene.add(coinClone);
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
