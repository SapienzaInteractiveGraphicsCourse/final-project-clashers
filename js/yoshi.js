import * as collFunc from "./collisions.js";

export const yoshi_dic = {
  Head: "head_05",
  Torso: "NDcha_pos_02",
  Spine: "spine00_04",
  UpperArm_right: "R_upperarm_038",
  UpperArm_left: "L_upperarm_024",
  UpperLeg_right: "R_thigh_056",
  UpperLeg_left: "L_thigh_052",
  Hand_left: "L_hand_026",
  Hand_right: "R_hand_040",
  Thumb1_right: "R_thumb_1_041",
  Thumb2_right: "R_thumb_2_042",
  Finger1_right: "R_finger1_1_043",
  Finger1_2_right: "R_finger1_2_044",
  Finger2_right: "R_finger2_1_045",
  Finger2_2_right: "R_finger2_2_046",
  Finger3_right: "R_finger3_1_047",
  Finger3_2_right: "R_finger3_2_048",
  Hand_right_attach: "attach_R_hand_049",
  Wrist_right: "R_wrist_050",
  Thumb1_left: "L_thumb_1_027",
  Thumb2_left: "L_thumb_2_028",
  Finger1_left: "L_finger1_1_029",
  Finger1_2_left: "L_finger1_2_030",
  Finger2_left: "L_finger2_1_031",
  Finger2_2_left: "L_finger2_2_032",
  Finger3_left: "L_finger3_1_033",
  Finger3_2_left: "L_finger3_2_034",
  Wrist_left: "L_wrist_036",
  Hand_left_attach: "attach_L_hand_035",
  Shell: "shell_051",
  Pelvis: "pelvis_03",
  LowerLeg_left: "L_calf_053",
  Foot_left: "L_foot_054",
  Toe_left: "L_toe_055",
  LowerLeg_right: "R_calf_057",
  Foot_right: "R_foot_058",
  Toe_right: "R_toe_059",
  Tail_1: "tail_1_060",
  Tail_2: "tail_2_00",
};

export function setYoshiGeometry() {
  var yoshiGeometry = new THREE.BoxGeometry(7.5, 4, 6.3);
  yoshiBox = new Physijs.BoxMesh(yoshiGeometry, geometryMaterial, 1);
  yoshiBox.position.set(
    yoshi.position.x,
    yoshi.position.y + 5.2,
    yoshi.position.z
  );
  yoshiBox.setCcdMotionThreshold(1);
  yoshiBox.setCcdSweptSphereRadius(0.2);
  scene.add(yoshiBox);
  yoshiBox.addEventListener("collision", collFunc.onCharacterCollision);

  var yoshiUpperGeometry = new THREE.BoxGeometry(7.5, 1.5, 5);
  yoshiUpperBox = new Physijs.BoxMesh(yoshiUpperGeometry, geometryMaterial1, 1);
  yoshiUpperBox.position.set(
    yoshi.position.x,
    yoshi.position.y + 10,
    yoshi.position.z
  );
  yoshiUpperBox.setCcdMotionThreshold(1);
  yoshiUpperBox.setCcdSweptSphereRadius(0.2);
  scene.add(yoshiUpperBox);
  yoshiUpperBox.addEventListener(
    "collision",
    collFunc.onCharacterUpperCollision
  );

  var yoshiLowerGeometry = new THREE.BoxGeometry(4, 2, 3);
  yoshiLowerBox = new Physijs.BoxMesh(yoshiLowerGeometry, geometryMaterial2, 1);
  yoshiLowerBox.position.set(
    yoshi.position.x,
    yoshi.position.y + 1,
    yoshi.position.z
  );
  yoshiLowerBox.setCcdMotionThreshold(1);
  yoshiLowerBox.setCcdSweptSphereRadius(0.2);
  scene.add(yoshiLowerBox);
  yoshiLowerBox.addEventListener(
    "collision",
    collFunc.onCharacterLowerCollision
  );
}

export function updateYoshiBoxPosition() {
  yoshiBox.position.set(
    yoshi.position.x,
    yoshi.position.y + 5.2,
    yoshi.position.z
  );
  yoshiUpperBox.position.set(
    yoshi.position.x,
    yoshi.position.y + 10,
    yoshi.position.z
  );
  yoshiLowerBox.position.set(
    yoshi.position.x,
    yoshi.position.y + 1,
    yoshi.position.z
  );
  var yoshiBoxPos = yoshiBox.position.clone();
  yoshiBox.position.copy(yoshiBoxPos);
  yoshiBox.rotation.set(0, 0, 0);
  yoshiBox.__dirtyPosition = true;
  yoshiBox.__dirtyRotation = true;

  var yoshiUpperBoxPos = yoshiUpperBox.position.clone();
  yoshiUpperBox.position.copy(yoshiUpperBoxPos);
  yoshiUpperBox.rotation.set(0, 0, 0);
  yoshiUpperBox.__dirtyPosition = true;
  yoshiUpperBox.__dirtyRotation = true;

  var yoshiLowerBoxPos = yoshiLowerBox.position.clone();
  yoshiLowerBox.position.copy(yoshiLowerBoxPos);
  yoshiLowerBox.rotation.set(0, 0, 0);
  yoshiLowerBox.__dirtyPosition = true;
  yoshiLowerBox.__dirtyRotation = true;
}
