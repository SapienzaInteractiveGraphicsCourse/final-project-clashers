//file js
"use strict";

import * as THREE from "./build/three.js-master/build/three.module.js";
import { GLTFLoader } from "./build/three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "./build/three.js-master/examples/jsm/controls/OrbitControls.js";
import TWEEN from "./build/tween.js-master/dist/tween.esm.js";

var head;
var scene;
var upperArm_right;
var upperArm_left;
var upperLeg_right;
var upperLeg_left;
var spine;
var torso;
var hand_left;
var hand_right;
var tween_idle;
var tweenStartScale;
var tweenGoalScale;
var tweenBackScale;
var tweenLeft;
var tweenRight;
var tweenStartRight;
var tweenGoalRight;
var tweenStartLeft;
var tweenGoalLeft;
var tweenIdle;
var tween_translation;
var tweenStartTranslate;
var tweenGoalTranslate;
var tween;
var tweenBack;
var yoshi;
var camera;
var dPressed = false;
var aPressed = false;
var isRotatedRight = true;
var isWalking = false;
var dirLight;

function init() {
  var container = document.getElementById("game");

  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const canvas = document.querySelector("canvas_three");

  var renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setSize(window.innerWidth, window.innerHeight);

  const cameraX = -100;
  const cameraY = 10;
  const cameraZ = 0;

  var controls = new OrbitControls(camera, renderer.domElement);
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
  scene.background = new THREE.Color(0xffffff);

  {
    const d = 100;
    const color = 0xffffff;
    const intensity = 1;
    dirLight = new THREE.DirectionalLight(color, intensity, 100);
    dirLight.position.set(0, 100, 0);
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
    //scene.add(helper);

    var ambientLight = new THREE.AmbientLight(color, intensity);
    scene.add(ambientLight);
  }

  yoshi = new THREE.Scene();
  {
    const gltfLoader = new GLTFLoader();
    const url_yoshi = "models/yoshi/scene.gltf";

    gltfLoader.load(url_yoshi, (gltf) => {
      yoshi = gltf.scene;
      yoshi.name = "yoshi";
      yoshi.position.set(0, -5.75, -0.75);
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
      spine = yoshi.getObjectByName(yoshi_dic.Spine);
      hand_left = yoshi.getObjectByName(yoshi_dic.Hand_left);
      hand_right = yoshi.getObjectByName(yoshi_dic.Hand_right);

      upperArm_right.rotation.z = (45 * Math.PI) / 180;
      upperArm_left.rotation.z = (45 * Math.PI) / 180;
      upperArm_right.rotation.x = (0 * Math.PI) / 180;
      upperArm_left.rotation.x = (0 * Math.PI) / 180;
      upperLeg_right.rotation.x = (0 * Math.PI) / 180;
      upperLeg_left.rotation.x = (-180 * Math.PI) / 180;

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
            performAnimation();
            //translateTorso("right");
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
            performAnimation();
            //translateTorso("left");
          }
          aPressed = true;
        }
      }

      document.addEventListener("keyup", onDocumentKeyUp, false);
      function onDocumentKeyUp(event) {
        var keyCode = event.keyCode;
        if (keyCode == 68) {
          dPressed = false;
          isWalking = false;
          tween.stop();
          tweenBack.stop();
          setIdlePosition();
        } else if (keyCode == 65) {
          aPressed = false;
          isWalking = false;
          tween.stop();
          tweenBack.stop();
          setIdlePosition();
        }
      }
      setAnimationParameters();
      requestAnimationFrame(animate);
    });
  }

  scene.add(camera);
  CreateLandscape();
  createBgSky();

  function animate() {
    TWEEN.update();
    camera.lookAt(yoshi.position.x, yoshi.position.y, yoshi.position.z);
    //dirLight.position.copy(camera.position); -> serve eventualmente per far muovere la luce quando spostiamo la camera col mouse
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
  }
}

var Landscape = function () {
  var geometry = new THREE.BoxGeometry(50, 20, window.innerWidth);

  var texture = THREE.ImageUtils.loadTexture("img/grass_alb.png");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6.25, window.innerWidth / 8);

  var terrainTexture = THREE.ImageUtils.loadTexture("img/gake_alb.png");
  //terrainTexture.wrapS = THREE.RepeatWrapping;
  //terrainTexture.wrapT = THREE.RepeatWrapping;
  //terrainTexture.repeat.set(5, window.innerWidth / 4);

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

var landscape;
function CreateLandscape() {
  landscape = new Landscape();
  landscape.mesh.position.y = -15.5;
  scene.add(landscape.mesh);
}

function createBgSky() {
  var bgSky = new THREE.PlaneGeometry(
    window.innerWidth,
    window.innerHeight / 6
  );
  var skyTexture = THREE.ImageUtils.loadTexture("img/sky.png");
  skyTexture.wrapS = THREE.RepeatWrapping;
  skyTexture.wrapT = THREE.RepeatWrapping;
  skyTexture.repeat.set(4, 1);

  var bgSkyMaterial = new THREE.MeshPhongMaterial({
    map: skyTexture,
    shading: THREE.FlatShading,
  });
  var bg = new THREE.Mesh(bgSky, bgSkyMaterial);
  bg.position.set(25, 100, 0);
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

function performAnimation() {
  tween = new TWEEN.Tween(tweenStartScale)
    .to(tweenGoalScale, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      upperLeg_left.rotation.x = tweenStartScale.x_left;
      upperLeg_right.rotation.x = tweenStartScale.x_right;
      upperArm_left.rotation.x = tweenStartScale.x_leftArm;
      upperArm_right.rotation.x = tweenStartScale.x_rightArm;
      if (dPressed) {
        yoshi.position.z += 0.2;
        dirLight.position.z += 0.2;
      }
      if (aPressed) {
        yoshi.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }
      //yoshi.position.z += 0.2; //modificare quando torna indietro
      camera.position.z += (yoshi.position.z - camera.position.z) * 0.1;
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
      //yoshi.position.z += 0.2; //modificare quando torna indietro
      if (dPressed) {
        yoshi.position.z += 0.2;
        dirLight.position.z += 0.2;
      }
      if (aPressed) {
        yoshi.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }
      camera.position.z += (yoshi.position.z - camera.position.z) * 0.1;
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
    tweenLeft = new TWEEN.Tween(tweenStartLeft)
      .to(tweenGoalLeft, 500)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function () {
        torso.rotation.y = tweenStartLeft.y_leftRotation;
      })
      .start();
  }

  if (direction == "right") {
    tweenRight = new TWEEN.Tween(tweenStartRight)
      .to(tweenGoalRight, 500)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function () {
        torso.rotation.y = tweenStartRight.y_rightRotation;
      })
      .start();
  }
}

/*function translateTorso(direction) {
  tweenStartTranslate = {
    z: yoshi.position.z,
  };
  if (direction == "right") {
    tweenGoalTranslate = {
      z: yoshi.position.z + 0.2,
    };
  }
  if (direction == "left") {
    tweenGoalTranslate = {
      z: yoshi.position.z - 0.2,
    };
  }

  tween_translation = new TWEEN.Tween(tweenStartTranslate)
    .to(tweenGoalTranslate, 500)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      yoshi.position.z = tweenStartTranslate.z;
    })
    .repeat(Infinity)
    .start();
}*/

function setIdlePosition() {
  tween_idle = new TWEEN.Tween(tweenStartScale)
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
