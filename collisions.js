function onCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  if (other_object instanceof Physijs.Mesh) {
    console.log("collisione");
  }
}
