import * as collFunc from "./collisions.js";

export function updateGoombaBoxPosition(goombaElem, i) {
  goombaContainerArray[i].position.set(
    goombaElem.position.x,
    goombaElem.position.y + 2.5,
    goombaElem.position.z
  );
  var goombaContainerPos = goombaContainerArray[i].position.clone();
  goombaContainerArray[i].position.copy(goombaContainerPos);
  goombaContainerArray[i].rotation.set(0, 0, 0);
  goombaContainerArray[i].__dirtyPosition = true;
  goombaContainerArray[i].__dirtyRotation = true;

  goombaContainerTopArray[i].position.set(
    goombaElem.position.x,
    goombaElem.position.y + 4.5,
    goombaElem.position.z
  );
  var goombaContainerTopPos = goombaContainerTopArray[i].position.clone();
  goombaContainerTopArray[i].position.copy(goombaContainerTopPos);
  goombaContainerTopArray[i].rotation.set(0, 0, 0);
  goombaContainerTopArray[i].__dirtyPosition = true;
  goombaContainerTopArray[i].__dirtyRotation = true;
}

export function goombaDelete(i) {
  scene.remove(goombaArray[i]);
}

export function setGoombaGeometry(goombaElem) {
  var goombaGeometry = new THREE.BoxGeometry(4.7, 1, 4.8);
  goombaContainer = new Physijs.BoxMesh(goombaGeometry, geometryMaterial, 0);
  goombaContainer.position.set(
    goombaElem.position.x,
    goombaElem.position.y + 2.5,
    goombaElem.position.z
  );

  var goombaGeometryTop = new THREE.BoxGeometry(4.7, 1, 4.8);
  goombaContainerTop = new Physijs.BoxMesh(
    goombaGeometryTop,
    geometryMaterial2,
    0
  );
  goombaContainerTop.position.set(
    goombaElem.position.x,
    goombaElem.position.y + 4.5,
    goombaElem.position.z
  );

  scene.add(goombaContainer);
  scene.add(goombaContainerTop);

  goombaArray.push(goombaElem);
  goombaContainerArray.push(goombaContainer);
  goombaContainerTopArray.push(goombaContainerTop);
  goombaContainer.setCcdMotionThreshold(1);
  goombaContainerTop.setCcdMotionThreshold(1);
  goombaContainer.addEventListener("collision", collFunc.onGoombaCollision);
  goombaContainerTop.addEventListener(
    "collision",
    collFunc.onGoombaTopCollision
  );
}
