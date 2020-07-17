export function updateGoombaBoxPosition(goombaElem) {
  goombaContainer.position.set(
    goombaElem.position.x,
    goombaElem.position.y + 1.8,
    goombaElem.position.z
  );
  var goombaContainerPos = goombaContainer.position.clone();
  goombaContainer.position.copy(goombaContainerPos);
  goombaContainer.rotation.set(0, 0, 0);
  goombaContainer.__dirtyPosition = true;
  goombaContainer.__dirtyRotation = true;
}
