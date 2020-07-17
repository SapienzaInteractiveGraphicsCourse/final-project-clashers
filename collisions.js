import { fall } from "./tween_functions.js";
import { setIdlePosition } from "./tween_functions.js";

export function setCharacterStuff() {
  if (character == "yoshi") {
    boxId = yoshiBox._physijs.id;
    lowerBoxId = yoshiLowerBox._physijs.id;
    upperBoxId = yoshiUpperBox._physijs.id;
    touchesBox = yoshiBox._physijs.touches;
    touchesUpper = yoshiUpperBox._physijs.touches;
    touchesLower = yoshiLowerBox._physijs.touches;
    model = yoshi;
  }
  if (character == "luigi") {
    boxId = luigiBox._physijs.id;
    lowerBoxId = luigiLowerBox._physijs.id;
    upperBoxId = luigiUpperBox._physijs.id;
    touchesBox = luigiBox._physijs.touches;
    touchesUpper = luigiUpperBox._physijs.touches;
    touchesLower = luigiLowerBox._physijs.touches;
    model = luigi;
  }
  if (character == "mario") {
    boxId = marioBox._physijs.id;
    lowerBoxId = marioLowerBox._physijs.id;
    upperBoxId = marioUpperBox._physijs.id;
    touchesBox = marioBox._physijs.touches;
    touchesUpper = marioUpperBox._physijs.touches;
    touchesLower = marioLowerBox._physijs.touches;
    model = mario;
  }
}

export function onYoshiCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();
  /*if (other_object._physijs.id == brickContainer._physijs.id) {
    collidedBottom = false;
    collidedLeft = false;
    collidedRight = false;
    tweenFall.stop();
  }*/
  //console.log("onYoshi Collision: contact_normal.y = " + contact_normal.y);
  //contact_normal.z == 1 se collide da sinistra --> imposto collidedLeft a false
  //contact_normal.z == 1 se collide da destra --> imposto collidedRight a false
  //if ((contact_normal.z == 1 || contact_normal.z == -1) && contact_normal.y == 0) {
  if (contact_normal.y == 0) {
    //if (contact_normal.z == 1) {
    //isOnObjectTop = true;
    var checkTouch = function () {
      // see if we are still touching this object
      //var touches = yoshiBox._physijs.touches;

      for (var i = 0; i < touchesBox.length; i++) {
        if (touchesBox[i] == other_object._physijs.id) return;
      }

      /*console.log(
        "Stop colliding with the box of id: " + other_object._physijs.id
      );
      console.log("contact_normal.z = " + contact_normal.z);
      console.log("contact_normal.x = " + contact_normal.x);
      console.log("contact_normal.y = " + contact_normal.y);
      console.log("yoshiBox.id = " + yoshiBox._physijs.id);*/

      //Smette di collidere lateralmente con un box, quindi imposta le relative variabili a false
      collidedLeft = false; //quindi si possono togliere da onkeydown
      collidedRight = false;
      /*fall();
      isOnObjectTop = false;
      collidedTop = false; //?
      //collidedBottom = false;*/
      scene.removeEventListener("update", checkTouch);
    };

    scene.addEventListener("update", checkTouch);
  }
}

export function onYoshiLowerCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();

  /*if (other_object._physijs.id == pipeContainer._physijs.id) {
    tweenJumpBack.start();
  }*/

  if (contact_normal.y == -1) {
    //isOnObjectTop = true;
    var checkTouch = function () {
      // see if we are still touching this object
      //var touches = yoshiLowerBox._physijs.touches;

      for (var i = 0; i < touchesLower.length; i++) {
        if (touchesLower[i] == other_object._physijs.id) return;
      }

      if (!isJumping) {
        fall(model);
      }
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
  setCharacterStuff();
  if (contact_normal.y == 1) {
    console.log("contact_normal.y = " + contact_normal.y);
    //isOnObjectTop = true;
    var checkTouch = function () {
      // see if we are still touching this object
      //var touches = yoshiUpperBox._physijs.touches;

      for (var i = 0; i < touchesUpper.length; i++) {
        if (touchesUpper[i] == other_object._physijs.id) return;
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

  //TOGLIERE
  /*if (contact_normal.y == -1) {
    collidedLeft = false;
    collidedRight = false;
    //collidedBottom = false;
  }*/
}

export function onPipeCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();
  if (other_object._physijs.id == boxId) {
    if (other_object instanceof Physijs.Mesh) {
      console.log("collisione");

      //previous code
      /*if (dir == "right") {
        collidedLeft = true;
      }
      if (dir == "left") {
        collidedRight = true;
      }*/

      //ho aggiunto rispettivamente && !collidedLeft e && !collidedRight perché con questo approccio a volte rilevava
      //la collisione una seconda volta anche se già l'aveva rilevata e si buggava andando un altro pochino avanti,
      //quindi deve rilevarla solo se non è già stata rilevata, cioè quindi se collidedLeft = falso
      // --> mi sa che non c'entra nulla, lo fa lo stesso, yeeeeh
      if ((dir == "right" || isJumpingRight) && !collidedLeft) {
        console.log("dir = " + dir + " and isJumpingRight = " + isJumpingRight);
        collidedLeft = true;
      }
      if ((dir == "left" || isJumpingLeft) && !collidedRight) {
        console.log("dir = " + dir + " and isJumpingLeft = " + isJumpingLeft);
        collidedRight = true;
      }
    }
  }

  if (other_object._physijs.id == lowerBoxId) {
    if (other_object instanceof Physijs.Mesh) {
      console.log("pipeCollision Top");
      tweenJump.stop();
      //tweenFall.stop();
      //tweenJumpBack.stop();
      //isJumping = false;
      //groupJump.removeAll();
      //isJumping = false;
      console.log("is jumping = " + isJumping);
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
  setCharacterStuff();
  if (other_object._physijs.id == upperBoxId) {
    console.log("collision bottom");
    collidedBottom = true;
    //groupJump.removeAll();
    tweenJump.stop();
    tweenJumpBack.start();
    //setIdlePosition();
    //console.log("collideRight = " + collidedRight);
    //console.log("collidedLeft = " + collidedLeft);

    //fall();
  }
}

export function onGoombaCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();
  if (other_object._physijs.id == boxId) {
    if (other_object instanceof Physijs.Mesh) {
      console.log("collisione");

      //perdi la vita
    }
  }

  if (other_object._physijs.id == lowerBoxId) {
    if (other_object instanceof Physijs.Mesh) {
      console.log("pipeCollision Top");

      var id = this._physijs.id;
      console.log(id);

      //for (var i = 0; i < goombaContainerIdArray.lenght; i++) {
      for (var i in goombaContainerIdArray) {
        console.log(goombaContainerIdArray[i]);
        if (goombaContainerIdArray[i] == id) {
          console.log("goombaElemArray[i] = " + goombaElemArray[i]);
          goombaElemArray[i].scale.set(0.07, 0.01, 0.07);
        }
      }
    }
  }
}
