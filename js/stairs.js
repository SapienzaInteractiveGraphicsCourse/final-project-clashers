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
