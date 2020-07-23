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
