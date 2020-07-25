import * as collFunc from "./collisions.js";

export function setPipeHeightGoal(i) {
  if (i == 0) {
    pipeHeightGoal = -6.3;
  } else if (i == 1 || i == 4 || i == 5) {
    pipeHeightGoal = -2.4;
  } else if (i == 2) {
    pipeHeightGoal = 1.7;
  } else if (i == 3) {
    pipeHeightGoal = 5.3;
  }
}

export function setPipeGeometry(pipeElem, y, y_top) {
  var pipeGeometry = new THREE.BoxGeometry(10.5, y - 5, 11);
  pipeContainer = new Physijs.BoxMesh(pipeGeometry, geometryMaterial, 0);
  pipeContainer.position.set(
    pipeElem.position.x + 5,
    pipeElem.position.y + 3.2,
    pipeElem.position.z - 5
  );
  var pipeGeometryTop = new THREE.BoxGeometry(10, 3, 12);
  pipeContainerTop = new Physijs.BoxMesh(pipeGeometryTop, geometryMaterial2, 0);
  pipeContainerTop.position.set(
    pipeElem.position.x + 5,
    pipeElem.position.y + y_top + 0.5,
    pipeElem.position.z - 5
  );

  scene.add(pipeContainer);
  scene.add(pipeContainerTop);

  pipeContainerArray.push(pipeContainer);
  pipeContainerTopArray.push(pipeContainerTop);
  pipeContainerTop.setCcdMotionThreshold(1);
  pipeContainer.setCcdMotionThreshold(1);
  pipeContainer.addEventListener("collision", collFunc.onPipeCollision);
  pipeContainerTop.addEventListener("collision", collFunc.onPipeTopCollision);
}
