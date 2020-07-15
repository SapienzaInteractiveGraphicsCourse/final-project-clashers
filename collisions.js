import { fall } from "./tween_functions.js";

export function onYoshiCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {}

export function onYoshiLowerCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  if (contact_normal.y == -1) {
    var checkTouch = function () {
      // see if we are still touching this object
      var touches = yoshiLowerBox._physijs.touches;

      for (var i = 0; i < touches.length; i++) {
        if (touches[i] == other_object._physijs.id) return;
      }

      fall();

      collidedTop = false; //?
      scene.removeEventListener("update", checkTouch);
    };

    scene.addEventListener("update", checkTouch);
  }
}

export function onPipeCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  if (other_object._physijs.id == yoshiBox._physijs.id) {
    if (other_object instanceof Physijs.Mesh) {
      console.log("collisione");

      if (dir == "right") {
        collidedLeft = true;
      }
      if (dir == "left") {
        collidedRight = true;
      }
    }
  }

  if (other_object._physijs.id == yoshiLowerBox._physijs.id) {
    if (other_object instanceof Physijs.Mesh) {
      console.log("pipeCollision Top");
      collidedTop = true;
    }
  }
}
