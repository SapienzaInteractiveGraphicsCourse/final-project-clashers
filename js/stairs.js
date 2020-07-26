import * as collFunc from "./collisions.js";

export function setStairsHeightGoal(containerY) {
  if (containerY == -8.399999618530273) {
    stairsHeightGoal = -8.7;
  }
  if (containerY == -2.9000000953674316) {
    stairsHeightGoal = -3.2;
  }
  if (containerY == 2.5999999046325684) {
    stairsHeightGoal = 2.3;
  }
  if (containerY == 8.100000381469727) {
    stairsHeightGoal = 7.9;
  }
  if (containerY == 13.600000381469727) {
    stairsHeightGoal = 13.4;
  }
  if (containerY == 19.100000381469727) {
    stairsHeightGoal = 18.9;
  }
  if (containerY == 24.600000381469727) {
    stairsHeightGoal = 24.4;
  }
  if (containerY == 30.100000381469727) {
    stairsHeightGoal = 29.9;
  }
}

export function setEmptyBlockGeometry(emptyBlockElem) {
  var emptyBlockGeometry = new THREE.BoxGeometry(5.7, 3, 5.5);
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
  emptyBlockContainer.setCcdMotionThreshold(1);
  emptyBlockContainer.setCcdSweptSphereRadius(0.2);
  emptyBlockContainer.addEventListener("collision", collFunc.onStairsCollision);
  emptyBlockContainerArray.push(emptyBlockContainer);

  var emptyBlockGeometryTop = new THREE.BoxGeometry(5, 2.5, 6.2);
  emptyBlockContainerTop = new Physijs.BoxMesh(
    emptyBlockGeometryTop,
    geometryMaterial2,
    0
  );
  emptyBlockContainerTop.position.set(
    emptyBlockElem.position.x,
    emptyBlockElem.position.y + 2.8,
    emptyBlockElem.position.z
  );
  scene.add(emptyBlockContainerTop);
  emptyBlockContainerTop.setCcdMotionThreshold(1);
  emptyBlockContainerTop.setCcdSweptSphereRadius(0.2);
  emptyBlockContainerTop.addEventListener(
    "collision",
    collFunc.onStairsTopCollision
  );
  emptyBlockContainerTopArray.push(emptyBlockContainerTop);
}

export function setStairsGeometry(start) {
  var stairsGeometry = new THREE.BoxGeometry(5.7, 3, 5.5);
  var stairsTopGeometry = new THREE.BoxGeometry(5, 2, 7);

  for (var i = 0; i < 4; i++) {
    stairsContainer = new Physijs.BoxMesh(stairsGeometry, geometryMaterial, 0);
    stairsContainer.position.set(0, -11.2 + 5.5 * i, start + 5.5 * i);
    scene.add(stairsContainer);
    stairsContainer.addEventListener("collision", collFunc.onStairsCollision);

    stairsTopContainer = new Physijs.BoxMesh(
      stairsTopGeometry,
      geometryMaterial2,
      0
    );
    stairsTopContainer.position.set(
      0,
      -11.2 + 5.5 * i + 2.8,
      start + 5.5 * i + 0.8
    );
    scene.add(stairsTopContainer);
    stairsTopContainer.addEventListener(
      "collision",
      collFunc.onStairsTopCollision
    );
    emptyBlockContainerTopArray.push(stairsTopContainer);
    stairsTopContainer.setCcdMotionThreshold(1);
    stairsTopContainer.setCcdSweptSphereRadius(0.2);
    stairsContainer.setCcdMotionThreshold(1);
    stairsContainer.setCcdSweptSphereRadius(0.2);
  }

  var stairsBackGeometry = new THREE.BoxGeometry(5.7, 19, 2);
  stairsBackContainer = new Physijs.BoxMesh(
    stairsBackGeometry,
    geometryMaterial,
    0
  );
  stairsBackContainer.position.set(0, -4.25, start + 5 * 4);
  scene.add(stairsBackContainer);
  stairsBackContainer.addEventListener("collision", collFunc.onStairsCollision);
  stairsBackContainer.setCcdMotionThreshold(1);
  stairsBackContainer.setCcdSweptSphereRadius(0.2);

  /*scene.add(emptyBlockContainer);
  emptyBlockContainer.setCcdMotionThreshold(1);
  emptyBlockContainer.setCcdSweptSphereRadius(0.2);
  emptyBlockContainer.addEventListener("collision", collFunc.onStairsCollision);
  emptyBlockContainerArray.push(emptyBlockContainer);*/
}
