import * as collFunc from "./collisions.js";

export const mario_dic = {
  Head: "mixamorigHead_05",
  Torso: "RootNode",
  Spine: "mixamorigSpine1_02",
  UpperArm_right: "mixamorigRightArm_012",
  UpperArm_left: "mixamorigLeftArm_08",
  UpperLeg_right: "mixamorigRightUpLeg_020",
  LowerLeg_right: "mixamorigRightLeg_021",
  UpperLeg_left: "mixamorigLeftUpLeg_015",
  LowerLeg_left: "mixamorigLeftLeg_016",
  Hand_left: "mixamorigLeftHand_010",
  Hand_right: "mixamorigRightHand_014",
};

export function setMarioGeometry() {
  var marioGeometry = new THREE.BoxGeometry(7.5, 4, 6.3);
  marioBox = new Physijs.BoxMesh(marioGeometry, geometryMaterial, 50);
  marioBox.position.set(
    mario.position.x,
    mario.position.y + 5.2,
    mario.position.z
  );
  marioBox.setCcdMotionThreshold(1);
  scene.add(marioBox);
  marioBox.addEventListener("collision", collFunc.onCharacterCollision);

  var marioUpperGeometry = new THREE.BoxGeometry(7.5, 1.5, 5);
  marioUpperBox = new Physijs.BoxMesh(
    marioUpperGeometry,
    geometryMaterial1,
    50
  );
  marioUpperBox.position.set(
    mario.position.x,
    mario.position.y + 10,
    mario.position.z
  );
  marioUpperBox.setCcdMotionThreshold(1);
  scene.add(marioUpperBox);
  marioUpperBox.addEventListener(
    "collision",
    collFunc.onCharacterUpperCollision
  );

  var marioLowerGeometry = new THREE.BoxGeometry(4, 1.5, 3);
  marioLowerBox = new Physijs.BoxMesh(
    marioLowerGeometry,
    geometryMaterial2,
    50
  );
  marioLowerBox.position.set(
    mario.position.x,
    mario.position.y + 1,
    mario.position.z
  );
  marioLowerBox.setCcdMotionThreshold(1);
  scene.add(marioLowerBox);
  marioLowerBox.addEventListener(
    "collision",
    collFunc.onCharacterLowerCollision
  );
}

export function updateMarioBoxPosition() {
  marioBox.position.set(
    mario.position.x,
    mario.position.y + 5.2,
    mario.position.z
  );
  marioUpperBox.position.set(
    mario.position.x,
    mario.position.y + 10,
    mario.position.z
  );
  marioLowerBox.position.set(
    mario.position.x,
    mario.position.y + 1,
    mario.position.z
  );
  var marioBoxPos = marioBox.position.clone();
  marioBox.position.copy(marioBoxPos);
  marioBox.rotation.set(0, 0, 0);
  marioBox.__dirtyPosition = true;
  marioBox.__dirtyRotation = true;

  var marioUpperBoxPos = marioUpperBox.position.clone();
  marioUpperBox.position.copy(marioUpperBoxPos);
  marioUpperBox.rotation.set(0, 0, 0);
  marioUpperBox.__dirtyPosition = true;
  marioUpperBox.__dirtyRotation = true;

  var marioLowerBoxPos = marioLowerBox.position.clone();
  marioLowerBox.position.copy(marioLowerBoxPos);
  marioLowerBox.rotation.set(0, 0, 0);
  marioLowerBox.__dirtyPosition = true;
  marioLowerBox.__dirtyRotation = true;
}
