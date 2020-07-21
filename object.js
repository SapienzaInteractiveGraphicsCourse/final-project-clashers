export function updateObjectBoxPosition(object, i) {
  objectContainerArray[i].position.set(
    object.position.x,
    object.position.y,
    object.position.z
  );
  var objectContainerPos = objectContainerArray[i].position.clone();
  objectContainerPos[i].position.copy(objectContainerPos);
  objectContainerPos[i].rotation.set(0, 0, 0);
  objectContainerPos[i].__dirtyPosition = true;
  objectContainerPos[i].__dirtyRotation = true;
}
