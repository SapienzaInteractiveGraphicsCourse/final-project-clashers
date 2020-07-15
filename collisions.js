/*function onCollision(
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
  this.__dirtyRotation = true;
}*/

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

    if (dir == "right") {
      collidedLeft = true;
    }
    if (dir == "left") {
      collidedRight = true;
    }
  }

  /*if (pipeContainer._physijs.touches.indexOf(other_object._physijs.id) === -1) {
    collision = true;
  }
  console.log(
    "riga strana: " +
      pipeContainer._physijs.touches.indexOf(other_object._physijs.id)
  );
  console.log("collision " + collision);*/
}

function onPipeTopCollision(
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
