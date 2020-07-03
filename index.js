//file js
"use strict";

import * as THREE from "./build/three.js-master/build/three.module.js";
import { GLTFLoader } from "./build/three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "./build/three.js-master/examples/jsm/controls/OrbitControls.js";
import TWEEN from "./build/tween.js-master/dist/tween.esm.js";

var head;
var scene;
var landscape;
var upperArm_right;
var upperArm_left;
var upperLeg_right;
var upperLeg_left;
var handRight;
var torso;
var thumb1_right;
var thumb2_right;
var finger1_right;
var finger1_2_right;
var finger2_right;
var finger2_2_right;
var finger3_right;
var finger3_2_right;

var tweenStartScale;
var tweenGoalScale;
var tweenBackScale;
var tweenStartRight;
var tweenGoalRight;
var tweenStartLeft;
var tweenGoalLeft;
var tweenIdle;
var tween;
var tweenBack;
var yoshi;
var brick;
var camera;
var dPressed = false;
var aPressed = false;
var spacePressed = false;
var isRotatedRight = true;
var isWalking = false;
var dirLight;
var ambientLight;
var controls;

function init() {
  var container = document.getElementById("game");

  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  var renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setSize(window.innerWidth, window.innerHeight);

  const cameraX = -100; //-100
  const cameraY = 0; //0
  const cameraZ = -650; //0

  controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(cameraX, cameraY, cameraZ);
  camera.updateProjectionMatrix();
  controls.update();

  window.addEventListener(
    "resize",
    function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );

  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  {
    const d = 100;
    const color = 0xffffff;
    const intensity = 1;
    dirLight = new THREE.DirectionalLight(color, intensity, 100);
    dirLight.position.set(0, 100, -650);
    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 512;
    dirLight.shadow.mapSize.height = 512;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 500;
    dirLight.shadow.camera.fov = 50;
    dirLight.shadow.bias = 0.0039;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    scene.add(dirLight);

    //var helper = new THREE.CameraHelper(dirLight.shadow.camera);
    var helper = new THREE.CameraHelper(camera);
    scene.add(helper);

    ambientLight = new THREE.AmbientLight(color, intensity);
    scene.add(ambientLight);
  }

  var gltfLoader = new GLTFLoader();
  yoshi = new THREE.Scene();
  {
    const url_yoshi = "models/yoshi/scene.gltf";

    gltfLoader.load(url_yoshi, (gltf) => {
      yoshi = gltf.scene;
      yoshi.name = "yoshi";
      yoshi.position.set(0, -14.1, -650);
      yoshi.scale.set(0.3, 0.3, 0.3);

      yoshi.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      yoshi.castShadow = true;
      yoshi.receiveShadow = true;

      console.log(dumpObject(yoshi).join("\n"));

      head = yoshi.getObjectByName(yoshi_dic.Head);
      torso = yoshi.getObjectByName(yoshi_dic.Torso);
      upperArm_right = yoshi.getObjectByName(yoshi_dic.UpperArm_right);
      upperArm_left = yoshi.getObjectByName(yoshi_dic.UpperArm_left);
      upperLeg_right = yoshi.getObjectByName(yoshi_dic.UpperLeg_right);
      upperLeg_left = yoshi.getObjectByName(yoshi_dic.UpperLeg_left);
      handRight = yoshi.getObjectByName(yoshi_dic.Hand_right);
      thumb1_right = yoshi.getObjectByName(yoshi_dic.Thumb1_right);
      thumb2_right = yoshi.getObjectByName(yoshi_dic.Thumb2_right);
      finger1_right = yoshi.getObjectByName(yoshi_dic.Finger1_right);
      finger1_2_right = yoshi.getObjectByName(yoshi_dic.Finger1_2_right);
      finger2_right = yoshi.getObjectByName(yoshi_dic.Finger2_right);
      finger2_2_right = yoshi.getObjectByName(yoshi_dic.Finger2_2_right);
      finger3_right = yoshi.getObjectByName(yoshi_dic.Finger3_right);
      finger3_2_right = yoshi.getObjectByName(yoshi_dic.Finger3_2_right);

      upperArm_right.rotation.z = (45 * Math.PI) / 180; //-60
      //handRight.rotation.y = (0 * Math.PI) / 180; -> deve tornare a 90 gradi
      upperArm_left.rotation.z = (45 * Math.PI) / 180;
      upperArm_right.rotation.x = (0 * Math.PI) / 180; //0
      upperArm_left.rotation.x = (0 * Math.PI) / 180;
      upperLeg_right.rotation.x = (0 * Math.PI) / 180;
      upperLeg_left.rotation.x = (-180 * Math.PI) / 180;

      // thumb1_right.rotation.y = (135 * Math.PI) / 180;

      /*thumb1_right.rotation.x = (110 * Math.PI) / 180;
      thumb2_right.rotation.x = (-90 * Math.PI) / 180;
      thumb1_right.rotation.z = (180 * Math.PI) / 180;
      finger1_right.rotation.x = (-90 * Math.PI) / 180;
      finger1_2_right.rotation.x = (-90 * Math.PI) / 180;
      finger2_right.rotation.x = (-90 * Math.PI) / 180;
      finger2_2_right.rotation.x = (-90 * Math.PI) / 180;
      finger3_right.rotation.x = (-90 * Math.PI) / 180;
      finger3_2_right.rotation.x = (-90 * Math.PI) / 180;*/
      console.log("thumb x" + thumb1_right.rotation.x);
      console.log("thumb z " + thumb1_right.rotation.z);
      console.log("thumb2 x " + thumb2_right.rotation.z);

      //camera.position.z += yoshi.position.z - camera.position.z;
      //controls.update();

      dirLight.target = yoshi;
      scene.add(yoshi);

      document.addEventListener("keydown", onDocumentKeyDown, false);
      function onDocumentKeyDown(event) {
        var keyCode = event.keyCode;
        //D
        if (keyCode == 68) {
          isWalking = true;
          if (!isRotatedRight) {
            TWEEN.removeAll();
            rotateTorso("right");
            isRotatedRight = true;
          }
          if (!dPressed && isWalking) {
            performAnimation("right");
          }
          dPressed = true;
        }
        //A
        if (keyCode == 65) {
          isWalking = true;
          if (isRotatedRight) {
            TWEEN.removeAll();
            rotateTorso("left");
            isRotatedRight = false;
          }
          if (!aPressed && isWalking) {
            performAnimation("left");
          }
          aPressed = true;
        }
        if (keyCode == 32) {
          if (!spacePressed) {
            jump();
          }
          spacePressed = true;
        }
      }

      document.addEventListener("keyup", onDocumentKeyUp, false);
      function onDocumentKeyUp(event) {
        var keyCode = event.keyCode;
        if (keyCode == 68) {
          if (aPressed) {
            dPressed = false;
          } else {
            dPressed = false;
            isWalking = false;
            tween.stop();
            tweenBack.stop();
            setIdlePosition();
          }
        }
        if (keyCode == 65) {
          if (dPressed) {
            aPressed = false;
          } else {
            aPressed = false;
            isWalking = false;
            tween.stop();
            tweenBack.stop();
            setIdlePosition();
          }
        }
        if (keyCode == 32) {
          spacePressed = false;
        }
      }
      setAnimationParameters();
      requestAnimationFrame(animate);
    });
  }

  brick = new THREE.Scene();
  {
    const url_brick = "models/brick_block/scene.gltf";
    gltfLoader.load(url_brick, (gltf) => {
      brick = gltf.scene;
      brick.name = "brick";
      brick.position.set(0, 0, -625);
      brick.scale.set(0.007, 0.007, 0.007);

      brick.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        if (child.material) child.material.metalness = 0;
      });
      brick.castShadow = true;
      brick.receiveShadow = true;
      scene.add(brick);
    });
  }

  scene.add(camera);
  createLandscape();
  createBgSky();

  function animate() {
    TWEEN.update();
    camera.lookAt(yoshi.position.x, camera.position.y, yoshi.position.z);
    //dirLight.position.copy(camera.position); -> serve eventualmente per far muovere la luce quando spostiamo la camera col mouse
    requestAnimationFrame(animate);
    controls.target.set(yoshi.position.x, yoshi.position.y, yoshi.position.z);
    controls.update();
    renderer.render(scene, camera);
  }
}

var landscapeFunction = function () {
  var geometry = new THREE.BoxGeometry(50, 20, 1500);

  var texture = THREE.ImageUtils.loadTexture("img/grass_alb.png");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6.25, window.innerWidth / 8);

  var terrainTexture = THREE.ImageUtils.loadTexture("img/gake_alb.png");
  terrainTexture.wrapS = THREE.RepeatWrapping;
  terrainTexture.wrapT = THREE.RepeatWrapping;
  terrainTexture.repeat.set(window.innerWidth / 10, 2);

  var material = [
    new THREE.MeshPhongMaterial({
      map: terrainTexture,
      color: 0xd2b48c,
    }),
    new THREE.MeshPhongMaterial({
      map: terrainTexture,
      color: 0xd2b48c,
    }),
    new THREE.MeshPhongMaterial({
      map: texture,
      color: 0xd2b48c,
    }),
    new THREE.MeshPhongMaterial({
      map: terrainTexture,
      color: 0xd2b48c,
    }),
    new THREE.MeshPhongMaterial({
      map: terrainTexture,
      color: 0xd2b48c,
    }),
    new THREE.MeshPhongMaterial({
      map: terrainTexture,
      color: 0xd2b48c,
    }),
  ];

  this.mesh = new THREE.Mesh(geometry, material);
  this.mesh.receiveShadow = true;
};

function createLandscape() {
  landscape = new landscapeFunction();
  landscape.mesh.position.y = -24;
  //landscape.mesh.rotation.x = (0 * Math.PI) / 180;
  scene.add(landscape.mesh);
}

function createBgSky() {
  var bgSky = new THREE.PlaneGeometry(1500, 150);
  var skyTexture = THREE.ImageUtils.loadTexture("img/sky.png");
  skyTexture.wrapS = THREE.RepeatWrapping;
  skyTexture.wrapT = THREE.RepeatWrapping;
  skyTexture.repeat.set(6, 1);

  var bgSkyMaterial = new THREE.MeshPhongMaterial({
    map: skyTexture,
    shading: THREE.FlatShading,
  });
  var bg = new THREE.Mesh(bgSky, bgSkyMaterial);
  bg.position.set(25, 61, 0);
  bg.rotation.y = (-90 * Math.PI) / 180;
  scene.add(bg);
}

function setAnimationParameters() {
  tweenStartScale = {
    x_left: upperLeg_left.rotation.x,
    x_right: upperLeg_right.rotation.x,
    x_leftArm: upperArm_left.rotation.x,
    x_rightArm: upperArm_right.rotation.x,
  };
  tweenGoalScale = {
    x_left: (-225 * Math.PI) / 180,
    x_right: (45 * Math.PI) / 180,
    x_leftArm: (45 * Math.PI) / 180,
    x_rightArm: (-45 * Math.PI) / 180,
  };
  tweenBackScale = {
    x_left: (-135 * Math.PI) / 180,
    x_right: (-45 * Math.PI) / 180,
    x_leftArm: (-45 * Math.PI) / 180,
    x_rightArm: (45 * Math.PI) / 180,
  };
  tweenIdle = {
    x_left: (-180 * Math.PI) / 180,
    x_right: (0 * Math.PI) / 180,
    x_leftArm: (0 * Math.PI) / 180,
    x_rightArm: (0 * Math.PI) / 180,
  };
}

function performAnimation(direction) {
  tween = new TWEEN.Tween(tweenStartScale)
    .to(tweenGoalScale, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      upperLeg_left.rotation.x = tweenStartScale.x_left;
      upperLeg_right.rotation.x = tweenStartScale.x_right;
      upperArm_left.rotation.x = tweenStartScale.x_leftArm;
      upperArm_right.rotation.x = tweenStartScale.x_rightArm;
      if (direction == "right") {
        yoshi.position.z += 0.2;
        dirLight.position.z += 0.2;
      }
      if (direction == "left") {
        yoshi.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }
      camera.position.z += yoshi.position.z - camera.position.z;
      controls.update();
    })
    .start();

  tweenBack = new TWEEN.Tween(tweenStartScale)
    .to(tweenBackScale, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      upperLeg_left.rotation.x = tweenStartScale.x_left;
      upperLeg_right.rotation.x = tweenStartScale.x_right;
      upperArm_left.rotation.x = tweenStartScale.x_leftArm;
      upperArm_right.rotation.x = tweenStartScale.x_rightArm;
      if (direction == "right") {
        yoshi.position.z += 0.2;
        dirLight.position.z += 0.2;
      }
      if (direction == "left") {
        yoshi.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }
      camera.position.z += yoshi.position.z - camera.position.z;
      controls.update();
    })
    .yoyo(true)
    .repeat(Infinity);
  tween.chain(tweenBack);
}

function rotateTorso(direction) {
  tweenStartLeft = {
    y_leftRotation: torso.rotation.y,
  };
  tweenGoalLeft = {
    y_leftRotation: (-180 * Math.PI) / 180,
  };
  tweenStartRight = {
    y_rightRotation: torso.rotation.y,
  };
  tweenGoalRight = {
    y_rightRotation: (0 * Math.PI) / 180,
  };
  if (direction == "left") {
    var tweenLeft = new TWEEN.Tween(tweenStartLeft)
      .to(tweenGoalLeft, 500)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function () {
        torso.rotation.y = tweenStartLeft.y_leftRotation;
      })
      .start();
  }
  if (direction == "right") {
    var tweenRight = new TWEEN.Tween(tweenStartRight)
      .to(tweenGoalRight, 500)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function () {
        torso.rotation.y = tweenStartRight.y_rightRotation;
      })
      .start();
  }
}

function jump() {
  var tweenStartJump = {
    y: yoshi.position.y,
    rightArm_rotation_z: upperArm_right.rotation.z,
    rightHand_rotation_y: handRight.rotation.y,
    finger_x: finger1_right.rotation.x,
    thumb1_y: thumb1_right.rotation.y,
    thumb2_x: thumb2_right.rotation.x,
  };
  var tweenGoalJump = {
    y: -8,
    rightArm_rotation_z: (-60 * Math.PI) / 180,
    rightHand_rotation_y: (0 * Math.PI) / 180,
    finger_x: (-90 * Math.PI) / 180,
    thumb1_y: (135 * Math.PI) / 180,
    thumb2_x: (90 * Math.PI) / 180,
  };
  var tweenGoalJumpBack = {
    y: -14.1,
    rightArm_rotation_z: (45 * Math.PI) / 180,
    rightHand_rotation_y: (90 * Math.PI) / 180,
    finger_x: (0 * Math.PI) / 180,
    thumb1_y: (66.5 * Math.PI) / 180,
    thumb2_x: (0 * Math.PI) / 180,
  };
  var tweenJump = new TWEEN.Tween(tweenStartJump)
    .to(tweenGoalJump, 2000)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function () {
      yoshi.position.y = tweenStartJump.y;
      upperArm_right.rotation.z = tweenStartJump.rightArm_rotation_z;
      handRight.rotation.y = tweenStartJump.rightHand_rotation_y;
      finger1_right.rotation.x = tweenStartJump.finger_x;
      finger1_2_right.rotation.x = tweenStartJump.finger_x;
      finger2_right.rotation.x = tweenStartJump.finger_x;
      finger2_2_right.rotation.x = tweenStartJump.finger_x;
      finger3_right.rotation.x = tweenStartJump.finger_x;
      finger3_2_right.rotation.x = tweenStartJump.finger_x;
      thumb2_right.rotation.x = tweenStartJump.finger_x;
      thumb1_right.rotation.y = tweenStartJump.thumb1_y;
    })
    .start();
  var tweenJumpBack = new TWEEN.Tween(tweenStartJump)
    .to(tweenGoalJumpBack, 2000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      yoshi.position.y = tweenStartJump.y;
      upperArm_right.rotation.z = tweenStartJump.rightArm_rotation_z;
      handRight.rotation.y = tweenStartJump.rightHand_rotation_y;
      finger1_right.rotation.x = tweenStartJump.finger_x;
      finger1_2_right.rotation.x = tweenStartJump.finger_x;
      finger2_right.rotation.x = tweenStartJump.finger_x;
      finger2_2_right.rotation.x = tweenStartJump.finger_x;
      finger3_right.rotation.x = tweenStartJump.finger_x;
      finger3_2_right.rotation.x = tweenStartJump.finger_x;
      thumb2_right.rotation.x = tweenStartJump.finger_x;
      thumb1_right.rotation.y = tweenStartJump.thumb1_y;
    });
  tweenJump.chain(tweenJumpBack);
}

function setIdlePosition() {
  var tween_idle = new TWEEN.Tween(tweenStartScale)
    .to(tweenIdle, 1000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      upperLeg_left.rotation.x = tweenStartScale.x_left;
      upperLeg_right.rotation.x = tweenStartScale.x_right;
      upperArm_left.rotation.x = tweenStartScale.x_leftArm;
      upperArm_right.rotation.x = tweenStartScale.x_rightArm;
    })
    .start();
}

init();
