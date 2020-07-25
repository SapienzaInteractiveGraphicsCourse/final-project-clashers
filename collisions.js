import { fall, objectAnimation, gameOver } from "./tween_functions.js";
import { setPipeHeightGoal } from "./pipe.js";
import { setStairsHeightGoal } from "./stairs.js";
import { resetStartingPosition, loadGameOver } from "./utils.js";
import { goombaDelete } from "./goomba.js";

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
  currentPosition = model.position.z;
}

export function onGroupContainerCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();
  if (
    other_object._physijs.id == boxId ||
    other_object._physijs.id == lowerBoxId
  ) {
    if (other_object._physijs.id == lowerBoxId) {
    }
    groupCollision = true;

    if (keysPressed[68] && !isFalling) {
      collidedLeft = true; //collide da sinistra sulla pipe
    }
    if (keysPressed[65] && !isFalling) {
      collidedRight = true; //collide da destra sulla pipe
    }

    //per risolvere il problema che andava attraverso la pipe dopo che era sceso da sopra
    if (isRotatedRight && isFalling) {
      collidedRight = true; //collide da sinistra sulla pipe
    }
    if (!isRotatedRight && isFalling) {
      collidedLeft = true; //collide da destra sulla pipe
    }
    currentPosition = model.position.z;
  }
}

export function onGroupContainerTopCollision1(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();
  if (other_object._physijs.id == lowerBoxId) {
    collidedTop1 = true;
    collidedTop2 = false;
    isCoin = false;
  }
}

export function onGroupContainerTopCollision2(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();
  if (other_object._physijs.id == lowerBoxId) {
    collidedTop2 = true;
    collidedTop1 = false;
    isCoin = false;
  }
}

export function onBottomCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();
  if (
    other_object._physijs.id == upperBoxId ||
    other_object._physijs.id == boxId
  ) {
    collidedBottom = true;

    tweenJump.stop();
    fall(model);

    var id = this._physijs.id;

    if (other_object._physijs.id == upperBoxId) {
      for (var i in questionBoxArray) {
        if (questionBoxArray[i]._physijs.id == id) {
          objectAnimation(objectArray[i], i);
          //itemSound.play();
        }
      }
    }
  }
}

export function onPipeCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();

  if (other_object._physijs.id == boxId) {
    var increase;
    if (keysPressed[68] && !isFalling) {
      collidedLeft = true; //collide da sinistra sulla pipe
      increase = -8.5;
    }
    if (keysPressed[65] && !isFalling) {
      collidedRight = true; //collide da destra sulla pipe
      increase = 9;
    }

    //per risolvere il problema che andava attraverso la pipe dopo che era sceso da sopra
    if (isRotatedRight && isFalling) {
      collidedRight = true; //collide da sinistra sulla pipe
      increase = 9;
    }
    if (!isRotatedRight && isFalling) {
      collidedLeft = true; //collide da destra sulla pipe
      increase = -8.5;
    }

    var id = this._physijs.id;
    for (var i in pipeContainerArray) {
      if (pipeContainerArray[i]._physijs.id == id) {
        currentPosition = pipeContainerArray[i].position.z + increase;
      }
    }
  }
}

export function onPipeTopCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();

  if (other_object._physijs.id == lowerBoxId) {
    collidedTopPipe = true;

    var id = this._physijs.id;
    for (var i in pipeContainerTopArray) {
      if (pipeContainerTopArray[i]._physijs.id == id) {
        setPipeHeightGoal(i);
      }
    }
  }
}

export function onCharacterCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();

  if (contact_normal.z == 0) {
    var checkTouch = function () {
      for (var i = 0; i < touchesLower.length; i++) {
        if (touchesLower[i] == other_object._physijs.id) return;
      }
      scene.removeEventListener("update", checkTouch);
    };
    scene.addEventListener("update", checkTouch);
  }
}

export function onCharacterLowerCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();
  if (contact_normal.y <= 0) {
    //abbiamo aggiunto il caso in cui è minore o uguale a 0 in modo da non farlo buggare quando collide con lo spigolo laterale durante il salto
    var checkTouch = function () {
      for (var i = 0; i < touchesLower.length; i++) {
        if (touchesLower[i] == other_object._physijs.id) return;
      }
      collidedTop1 = false; //serve per non farlo passare attraverso il livello 1 quando scende dal livello 2
      collidedTopPipe = false;
      collidedTopStairs = false;
      isCoin = false;

      if (
        !isJumping &&
        !isCoin &&
        !collidedTopPipe &&
        other_object._physijs.id != ground._physijs.id
      ) {
        //serve per non fare il fall appena salta e si stacca da terra
        fall(model);
      }

      scene.removeEventListener("update", checkTouch);
    };
    scene.addEventListener("update", checkTouch);
  }
}

export function onCharacterUpperCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();
  if (contact_normal.y <= 1) {
    //abbiamo aggiunto il caso in cui è minore o uguale a 0 in modo da non farlo buggare quando collide con lo spigolo laterale durante il salto
    var checkTouch = function () {
      for (var i = 0; i < touchesLower.length; i++) {
        if (touchesLower[i] == other_object._physijs.id) return;
      }
      scene.removeEventListener("update", checkTouch);
    };
    scene.addEventListener("update", checkTouch);
  }
}

export function onGoombaTopCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();

  if (!goombaCollision) {
    if (other_object._physijs.id == lowerBoxId) {
      if (other_object instanceof Physijs.Mesh) {
        var id = this._physijs.id;
        for (var i in goombaContainerTopArray) {
          if (goombaContainerTopArray[i]._physijs.id == id) {
            goombaArray[i].scale.set(0.07, 0.01, 0.07);
            scene.remove(goombaContainerArray[i]);
            scene.remove(goombaContainerTopArray[i]);
            tweenWalkGoombaArray[i].stop();
            tweenGoombaFeetArray[i].stop();
            goombaSound.play();
            setTimeout(goombaDelete.bind(null, i), 5000);
          }
        }
      }
    }
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
    var id = this._physijs.id;
    for (var i in goombaContainerArray) {
      if (goombaContainerArray[i]._physijs.id == id) {
        goombaCollision = true;
        if (removeLife == 1) {
          life -= 1;
          removeLife = 0;
        }

        levelSound.volume = 0;
        gameOver(model);
        levelSound.currentTime = 0;
      }
    }
    if (life == 0) {
      localStorage.setItem("coinScore", score);
      //window.location.href = "./game_over.html";
      gameOverSound.play();
      setTimeout(loadGameOver.bind(null), 3000);
    }
    if (life > 0) {
      loseLifeSound.play();
      //resetStartingPosition(model);
      setTimeout(resetStartingPosition.bind(null, model, i), 3000);
    }
    textLife.innerHTML = "x" + life;
  }
  //}
}

export function onCoinCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();
  if (other_object._physijs.id == boxId) {
    var id = this._physijs.id;
    for (var i in coinContainerArray) {
      if (coinContainerArray[i]._physijs.id == id) {
        score += 1;
        scene.remove(coinArray[i]);
        scene.remove(coinContainerArray[i]);
        isCoin = true;

        coinSound.play();
      }
    }
  }
  text.innerHTML = score;
}

export function onPowerUpCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();
  if (
    other_object._physijs.id == boxId ||
    other_object._physijs.id == lowerBoxId
  ) {
    var id = this._physijs.id;
    for (var i in powerUpContainerArray) {
      if (powerUpContainerArray[i]._physijs.id == id) {
        life += 1;
        scene.remove(powerUpArray[i]);
        scene.remove(powerUpContainerArray[i]);
      }
    }
  }
  textLife.innerHTML = "x" + life;
}

export function onStairsCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();

  if (other_object._physijs.id == boxId) {
    if (keysPressed[68] && !isFalling) {
      collidedLeft = true; //collide da sinistra sulla pipe
    }
    if (keysPressed[65] && !isFalling) {
      collidedRight = true; //collide da destra sulla pipe
    }

    if (isRotatedRight && isFalling) {
      collidedRight = true; //collide da sinistra sulla pipe
    }
    if (!isRotatedRight && isFalling) {
      collidedLeft = true; //collide da destra sulla pipe
    }

    var id = this._physijs.id;
    for (var i in emptyBlockContainerArray) {
      if (emptyBlockContainerArray[i]._physijs.id == id) {
        currentPosition = model.position.z;
      }
    }
  }
}

export function onStairsTopCollision(
  other_object,
  relative_velocity,
  relative_rotation,
  contact_normal
) {
  setCharacterStuff();
  if (other_object._physijs.id == lowerBoxId) {
    collidedTopStairs = true;

    var id = this._physijs.id;
    for (var i in emptyBlockContainerTopArray) {
      if (emptyBlockContainerTopArray[i]._physijs.id == id) {
        setStairsHeightGoal(emptyBlockContainerTopArray[i].position.y);
      }
    }
  }
}
