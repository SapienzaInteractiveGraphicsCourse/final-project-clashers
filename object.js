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
