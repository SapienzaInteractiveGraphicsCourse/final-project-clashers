import * as collFunc from "./collisions.js";

export function setQuestionBoxGeometry(questionBoxElem) {
  var questionBoxGeometry = new THREE.BoxGeometry(5, 1.5, 4);
  questionBoxContainer = new Physijs.BoxMesh(
    questionBoxGeometry,
    geometryMaterial1,
    0
  ); //mass 0
  questionBoxContainer.position.set(
    questionBoxElem.position.x,
    questionBoxElem.position.y,
    questionBoxElem.position.z
  );
  scene.add(questionBoxContainer);
  //questionBoxContainer.__dirtyPosition = true;
  //questionBoxContainer.__dirtyRotation = false;

  questionBoxArray.push(questionBoxContainer);
  questionBoxContainer.addEventListener(
    "collision",
    collFunc.onBottomCollision
  );
}

export function setBrickGeometry(brickElem) {
  var brickGeometry = new THREE.BoxGeometry(4, 1.5, 4);
  brickContainer = new Physijs.BoxMesh(brickGeometry, geometryMaterial1, 0);
  brickContainer.position.set(
    brickElem.position.x,
    brickElem.position.y + 1.3,
    brickElem.position.z + 1.2
  );
  scene.add(brickContainer);
  brickContainer.addEventListener("collision", collFunc.onBottomCollision);
}

export function setGroupGeometry(groupWidth, y, z) {
  var groupGeometry = new THREE.BoxGeometry(6.3, 3, groupWidth);
  groupContainer = new Physijs.BoxMesh(groupGeometry, geometryMaterial, 0);
  groupContainer.position.set(0, y, z);
  scene.add(groupContainer);
  groupContainer.addEventListener(
    "collision",
    collFunc.onGroupContainerCollision
  );

  var groupGeometryTop = new THREE.BoxGeometry(6.3, 1.5, groupWidth - 0.5);
  groupContainerTop = new Physijs.BoxMesh(
    groupGeometryTop,
    geometryMaterial2,
    0
  );
  groupContainerTop.position.set(0, y + 3, z);
  scene.add(groupContainerTop);

  if (y == 9.5) {
    //associo il listener relativo al "primo piano"
    groupContainerTop.addEventListener(
      "collision",
      collFunc.onGroupContainerTopCollision1
    );
  }
  if (y == 33.5) {
    //associo il listener relativo al "secondo piano"
    groupContainerTop.addEventListener(
      "collision",
      collFunc.onGroupContainerTopCollision2
    );
  }
}
