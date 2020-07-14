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

function onPipeCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  //collision = true;
  collision = false;
  if (other_object instanceof Physijs.Mesh) {
    console.log("collisione");

    /*if (dir == "right") {
      yoshi.position.z -= 0.2;
      dirLight.position.z -= 0.2;
    }
    if (dir == "left") {
      yoshi.position.z += 0.2;
      dirLight.position.z += 0.2;
    }*/
    if (dir == "right") {
      collidedLeft = true;
    }
    if (dir == "left") {
      collidedRight = true;
    }
  }

  if (pipeContainer._physijs.touches.indexOf(other_object._physijs.id) === -1) {
    collision = true;
  }
  console.log(
    "riga strana: " +
      pipeContainer._physijs.touches.indexOf(other_object._physijs.id)
  );
  console.log("collision " + collision);
}
