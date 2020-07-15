import { fall } from "./tween_functions.js";

export function onYoshiCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  var checkCollision = function () {
    if (other_object._physijs.id == pipeContainer._physijs.id) {
      //collision = false;
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
    scene.removeEventListener("update", checkCollision);
  };
  scene.addEventListener("update", checkCollision);
}

export function onYoshiLowerCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  if (contact_normal.y == -1) {
    isCollided = true;
    isOnPipe = true;

    var checkTouch = function () {
      // see if we are still touching this object
      var touches = yoshiLowerBox._physijs.touches;
      //console.log(touches.length);

      for (var i = 0; i < touches.length; i++) {
        //console.log("touches[i] " + touches[i]);
        if (touches[i] == other_object._physijs.id) return;
      }
      isOnPipe = false;
      fall();
      /*console.log(
          "no longer touching grounded object",
          other_object._physijs.id
        );*/
      isCollided = false;
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
  //collision = true;
  /*if (other_object._physijs.id == yoshiBox._physijs.id) {
    //collision = false;
    if (other_object instanceof Physijs.Mesh) {
      console.log("collisione");

      if (dir == "right") {
        collidedLeft = true;
      }
      if (dir == "left") {
        collidedRight = true;
      }
    }
  }*/
  /*if (pipeContainer._physijs.touches.indexOf(other_object._physijs.id) === -1) {
    collision = true;
  }
  console.log(
    "riga strana: " +
      pipeContainer._physijs.touches.indexOf(other_object._physijs.id)
  );
  console.log("collision " + collision);*/
}

export function onPipeTopCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  if (other_object._physijs.id == yoshiLowerBox._physijs.id) {
    if (other_object instanceof Physijs.Mesh) {
      console.log("pipeCollision Top");
      collidedTop = true;
    }
  }
}

/*function onPipeTopCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
  //event
) {
  //otherObj = other_object;
  //contactNormalY = contact_normal.y;
  if (other_object instanceof Physijs.Mesh) {
    console.log("pipeCollision Top");
    collidedTop = true;
  }

  if (contact_normal <= -0.5) {
    isCollided = true;

    /*if (event.phase == "ended") {
    console.log("ended: ");
    }

    var checkTouch = function () {
      // see if we are still touching this object
      var touches = yoshiBox._physijs.touches;
      for (var i = 0; i < touches.length; i++) {
        if (touches[i] == other_object._physijs.id) return;
      }
      console.log(
        "no longer touching grounded object",
        other_object._physijs.id
      );
      isCollided = false;
      scene.removeEventListener("update", checkTouch);
    };
    scene.addEventListener("update", checkTouch);
    console.log("iscollided " + isCollided);
  }
}*/

/*Physijs.Scene.prototype._updateCollisions = function () {
 

  var i,
    j,
    offset,
    object,
    object2,
    collisions = {},
    collided_with = [];

  // Build collision manifest
  /* for ( i = 0; i < data[1]; i++ ) {
    offset = 2 + i * 2;
    //object = data[ offset ];
    object = yoshiBox;
    object2 = pipeContainerTop;

    if ( !collisions[ object ] ) collisions[ object ] = [];
    collisions[ object ].push( object2 );
  }
  object = yoshiBox;
  object2 = pipeContainerTop;

  if (!collisions[object]) collisions[object] = [];
  collisions[object].push(object2);

  // Deal with collisions
  for (object in this._objects) {
    if (!this._objects.hasOwnProperty(object)) return;
    object = this._objects[object];

    if (collisions[object._physijs.id]) {
      // this object is touching others
      collided_with.length = 0;

      if (object._physijs.touches.indexOf(object2._physijs.id) === -1) {
        object._physijs.touches.push(object2._physijs.id);
      }

      for (j = 0; j < object._physijs.touches.length; j++) {
        if (collided_with.indexOf(object._physijs.touches[j]) === -1) {
          object._physijs.touches.splice(j--, 1);
        }
      }
    } else {
      // not touching other objects
      object._physijs.touches.length = 0;
    }
  }

  // if A is in B's collision list, then B should be in A's collision list
  for (var id in collisions) {
    for (var j = 0; j < collisions[id].length; j++) {
      collisions[collisions[id][j]] = collisions[collisions[id][j]] || [];
      collisions[collisions[id][j]].push(id);
    }
  }

  this.collisions = collisions;
};*/
