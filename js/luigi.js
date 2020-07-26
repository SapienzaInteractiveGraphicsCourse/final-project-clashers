import * as collFunc from "./collisions.js";

export const luigi_dic = {
  Head: "head_05",
  Torso: "NDcha_pos_02",
  Spine: "spine00_04",
  UpperArm_right: "R_upperarm_041",
  UpperArm_left: "L_upperarm_024",
  UpperLeg_right: "R_thigh_062",
  LowerLeg_right: "R_calf_063",
  UpperLeg_left: "L_thigh_057",
  LowerLeg_left: "L_calf_058",
  Hand_left: "L_hand_026",
  Hand_right: "R_hand_043",
  Thumb1_right: "R_thumb_1_052",
  Thumb2_right: "R_thumb_2_053",
  Finger1_right: "R_finger1_1_044",
  Finger1_2_right: "R_finger1_2_045",
  Finger2_right: "R_finger2_1_046",
  Finger2_2_right: "R_finger2_2_047",
  Finger3_right: "R_finger3_1_048",
  Finger3_2_right: "R_finger3_2_049",
  Finger4_right: "R_finger4_1_050",
  Finger4_2_right: "R_finger4_2_051",
  Thumb1_left: "L_thumb_1_035",
  Thumb2_left: "L_thumb_2_036",
  Finger1_left: "L_finger1_1_027",
  Finger1_2_left: "L_finger1_2_028",
  Finger2_left: "L_finger2_1_029",
  Finger2_2_left: "L_finger2_2_030",
  Finger3_left: "L_finger3_1_031",
  Finger3_2_left: "L_finger3_2_032",
  Finger4_left: "L_finger4_1_033",
  Finger4_2_left: "L_finger4_2_034",
};

export function setLuigiGeometry() {
  var luigiGeometry = new THREE.BoxGeometry(7.5, 4.5, 5.5);
  luigiBox = new Physijs.BoxMesh(luigiGeometry, geometryMaterial, 50);
  luigiBox.position.set(
    luigi.position.x,
    luigi.position.y + 6,
    luigi.position.z - 0.8
  );
  luigiBox.setCcdMotionThreshold(1);
  scene.add(luigiBox);
  luigiBox.addEventListener("collision", collFunc.onCharacterCollision);

  var luigiUpperGeometry = new THREE.BoxGeometry(7.5, 1.5, 5);
  luigiUpperBox = new Physijs.BoxMesh(
    luigiUpperGeometry,
    geometryMaterial1,
    50
  );
  luigiUpperBox.position.set(
    luigi.position.x,
    luigi.position.y + 13.3,
    luigi.position.z - 0.8
  );
  luigiUpperBox.setCcdMotionThreshold(1);
  scene.add(luigiUpperBox);
  luigiUpperBox.addEventListener(
    "collision",
    collFunc.onCharacterUpperCollision
  );

  var luigiLowerGeometry = new THREE.BoxGeometry(4, 2, 3);
  luigiLowerBox = new Physijs.BoxMesh(
    luigiLowerGeometry,
    geometryMaterial2,
    50
  );
  luigiLowerBox.position.set(
    luigi.position.x,
    luigi.position.y + 1,
    luigi.position.z - 0.5
  );
  luigiLowerBox.setCcdMotionThreshold(1);
  scene.add(luigiLowerBox);
  luigiLowerBox.addEventListener(
    "collision",
    collFunc.onCharacterLowerCollision
  );
}

export function updateLuigiBoxPosition() {
  luigiBox.position.set(
    luigi.position.x,
    luigi.position.y + 6,
    luigi.position.z - 0.8
  );
  luigiUpperBox.position.set(
    luigi.position.x,
    luigi.position.y + 13.3,
    luigi.position.z - 0.8
  );
  luigiLowerBox.position.set(
    luigi.position.x,
    luigi.position.y + 1,
    luigi.position.z - 0.5
  );
  var luigiBoxPos = luigiBox.position.clone();
  luigiBox.position.copy(luigiBoxPos);
  luigiBox.rotation.set(0, 0, 0);
  luigiBox.__dirtyPosition = true;
  luigiBox.__dirtyRotation = true;

  var luigiUpperBoxPos = luigiUpperBox.position.clone();
  luigiUpperBox.position.copy(luigiUpperBoxPos);
  luigiUpperBox.rotation.set(0, 0, 0);
  luigiUpperBox.__dirtyPosition = true;
  luigiUpperBox.__dirtyRotation = true;

  var luigiLowerBoxPos = luigiLowerBox.position.clone();
  luigiLowerBox.position.copy(luigiLowerBoxPos);
  luigiLowerBox.rotation.set(0, 0, 0);
  luigiLowerBox.__dirtyPosition = true;
  luigiLowerBox.__dirtyRotation = true;
}
