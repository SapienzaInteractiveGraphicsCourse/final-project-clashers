import { fall } from "./tween_functions.js";
import { setIdlePosition } from "./index.js";

export function onYoshiCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  /*if (other_object._physijs.id == brickContainer._physijs.id) {
    collidedBottom = false;
    collidedLeft = false;
    collidedRight = false;
    tweenFall.stop();
  }*/
}

export function onYoshiLowerCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  if (contact_normal.y == -1) {
    //isOnObjectTop = true;
    var checkTouch = function () {
      // see if we are still touching this object
      var touches = yoshiLowerBox._physijs.touches;

      for (var i = 0; i < touches.length; i++) {
        if (touches[i] == other_object._physijs.id) return;
      }

      fall();

      isOnObjectTop = false;
      collidedTop = false; //?
      //collidedBottom = false;
      scene.removeEventListener("update", checkTouch);
    };

    scene.addEventListener("update", checkTouch);
  }
}

export function onYoshiUpperCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  if (contact_normal.y == 1) {
    console.log("contact_normal.y = " + contact_normal.y);
    //isOnObjectTop = true;
    var checkTouch = function () {
      // see if we are still touching this object
      var touches = yoshiUpperBox._physijs.touches;

      for (var i = 0; i < touches.length; i++) {
        if (touches[i] == other_object._physijs.id) return;
      }

      //fall();

      //isOnObjectTop = false;
      //collidedBottom = false; //?
      collidedBottom = false;
      //setIdlePosition();
      //fall();
      scene.removeEventListener("update", checkTouch);
    };

    scene.addEventListener("update", checkTouch);
  }
  if (contact_normal.y == -1) {
    collidedLeft = false;
    collidedRight = false;
    //collidedBottom = false;
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
      //isOnObjectTop = true;
    }
  }
}

export function onBottomCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  if (other_object._physijs.id == yoshiUpperBox._physijs.id) {
    console.log("collision bottom");
    collidedBottom = true;
    //groupJump.removeAll();
    tweenJump.stop();
    tweenJumpBack.start();
    //setIdlePosition();
    console.log("collideRight = " + collidedRight);
    console.log("collidedLeft = " + collidedLeft);

    //fall();
  }
}

export function onGoombaCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  if (other_object._physijs.id == yoshiBox._physijs.id) {
    if (other_object instanceof Physijs.Mesh) {
      console.log("collisione");

      //perdi la vita
    }
  }

  if (other_object._physijs.id == yoshiLowerBox._physijs.id) {
    if (other_object instanceof Physijs.Mesh) {
      console.log("pipeCollision Top");

      if (this._physijs.id == 64) {
        group1[11].scale.set(0.07, 0.01, 0.07);
      }
      if (this._physijs.id == 2) {
        groupPipes[4].scale.set(0.07, 0.01, 0.07);
      }
      if (this._physijs.id == 3) {
        groupPipes[5].scale.set(0.07, 0.01, 0.07);
      }
      if (this._physijs.id == 4) {
        groupPipes[6].scale.set(0.07, 0.01, 0.07);
      }

      /*if (this._physijs.id == 2) {
        groupPipes[4].scale.set(0.07, 0.01, 0.07);
      } 
      if (this._physijs.id == 2) {
        groupPipes[4].scale.set(0.07, 0.01, 0.07);
      } */

      if (this._physijs.id == 33) {
        group5[10].scale.set(0.07, 0.01, 0.07);
      }
      if (this._physijs.id == 34) {
        group5[11].scale.set(0.07, 0.01, 0.07);
      }
      if (this._physijs.id == 35) {
        group5[12].scale.set(0.07, 0.01, 0.07);
      }
      if (this._physijs.id == 36) {
        group5[13].scale.set(0.07, 0.01, 0.07);
      }
      if (this._physijs.id == 37) {
        group5[14].scale.set(0.07, 0.01, 0.07);
      }
      if (this._physijs.id == 38) {
        group5[15].scale.set(0.07, 0.01, 0.07);
      }
      if (this._physijs.id == 44) {
        group6[7].scale.set(0.07, 0.01, 0.07);
      }
      if (this._physijs.id == 45) {
        group6[8].scale.set(0.07, 0.01, 0.07);
      }
    }
  }
}
