import * as collFunc from "./collisions.js";

export function updateCoinBoxPosition(coinElem, i) {
  coinContainerArray[i].position.set(
    coinElem.position.x,
    coinElem.position.y,
    coinElem.position.z
  );
  var coinContainerPos = coinContainerArray[i].position.clone();
  coinContainerArray[i].position.copy(coinContainerPos);
  coinContainerArray[i].rotation.set(0, 0, 0);
  coinContainerArray[i].__dirtyPosition = true;
  coinContainerArray[i].__dirtyRotation = true;
}

export function setCoinGeometry(coinElem) {
  var coinGeometry = new THREE.BoxGeometry(2, 4, 2);
  coinContainer = new Physijs.BoxMesh(coinGeometry, geometryMaterial, 0);
  coinContainer.position.set(
    coinElem.position.x,
    coinElem.position.y,
    coinElem.position.z
  );
  coinContainerArray.push(coinContainer);
  coinArray.push(coinElem);
  scene.add(coinContainer);
  coinContainer.setCcdMotionThreshold(1);
  coinContainer.addEventListener("collision", collFunc.onCoinCollision);
}

export function updatePowerUpBoxPosition(powerUpElem, i) {
  powerUpContainerArray[i].position.set(
    powerUpElem.position.x,
    powerUpElem.position.y,
    powerUpElem.position.z
  );
  var powerUpContainerPos = powerUpContainerArray[i].position.clone();
  powerUpContainerArray[i].position.copy(powerUpContainerPos);
  powerUpContainerArray[i].rotation.set(0, 0, 0);
  powerUpContainerArray[i].__dirtyPosition = true;
  powerUpContainerArray[i].__dirtyRotation = true;
}

export function setPowerUpGeometry(powerUpElem) {
  var powerUpGeometry = new THREE.BoxGeometry(4.7, 4, 2);
  powerUpContainer = new Physijs.BoxMesh(powerUpGeometry, geometryMaterial, 0);
  powerUpContainer.position.set(
    powerUpElem.position.x,
    powerUpElem.position.y,
    powerUpElem.position.z
  );
  powerUpContainerArray.push(powerUpContainer);
  powerUpArray.push(powerUpElem);
  scene.add(powerUpContainer);
  powerUpContainer.setCcdMotionThreshold(1);
  powerUpContainer.addEventListener("collision", collFunc.onPowerUpCollision);
}
