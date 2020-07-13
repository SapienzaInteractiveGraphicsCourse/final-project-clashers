function onCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  if (other_object instanceof Physijs.Mesh) {
    console.log("collisione");
  }
  //this.position.copy(yoshi.position);
  //this.rotation.copy(yoshi.rotation);
  /*var pos = yoshiBox.position.clone();
  yoshiBox.position.copy(pos);
  yoshiBox.rotation.set(0, 0, 0);
  this.__dirtyPosition = true;
  this.__dirtyRotation = true;*/
}
