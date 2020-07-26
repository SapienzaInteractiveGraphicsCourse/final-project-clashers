"use strict";

import * as THREE from "./build/three.js-master/build/three.module.js";
import { GLTFLoader } from "./build/three.js-master/examples/jsm/loaders/GLTFLoader.js";
import TWEEN from "./build/tween.js-master/dist/tween.esm.js";
import * as blockFunc from "./js/level_build.js";
import * as tweenFunc from "./js/tween_functions.js";
import { updateGoombaBoxPosition } from "./js/goomba.js";
import * as objectFunc from "./js/object.js";
import * as yoshiFunc from "./js/yoshi.js";
import * as luigiFunc from "./js/luigi.js";
import * as marioFunc from "./js/mario.js";
import { loadWin } from "./js/utils.js";
import { setWallGeometry } from "./js/bricks.js";

Physijs.scripts.worker = "physijs_worker.js";
Physijs.scripts.ammo = "ammo.js";

groupRun = new TWEEN.Group();
groupJump = new TWEEN.Group();
groupRotate = new TWEEN.Group();

function init() {
  container = document.getElementById("game");

  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setSize(window.innerWidth, window.innerHeight);

  const cameraX = -100;
  const cameraY = 0;
  const cameraZ = -620;

  camera.position.set(cameraX, cameraY, cameraZ);
  camera.updateProjectionMatrix();

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

  scene = new Physijs.Scene();

  {
    const d = 100;
    const color = 0xffffff;
    const intensity = 1;

    dirLight = new THREE.DirectionalLight(color, intensity, 100);
    dirLight.position.set(0, 100, -620);
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

    ambientLight = new THREE.AmbientLight(color, intensity);
    scene.add(ambientLight);
  }

  gltfLoader = new GLTFLoader();

  if (sessionStorage.getItem("yoshiPressed") == "true") {
    character = "yoshi";
  }
  if (sessionStorage.getItem("luigiPressed") == "true") {
    character = "luigi";
  }
  if (sessionStorage.getItem("marioPressed") == "true") {
    character = "mario";
  }

  geometryMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
  });
  geometryMaterial1 = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    color: 0xeb4034,
  });
  geometryMaterial2 = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    color: 0x344feb,
  });

  scene.add(camera);
  createLandscape();
  createBgSky();
  loadCharacters(character);
  loadModels();
}

function loadCharacters(character) {
  if (character == "yoshi") {
    yoshi = new Physijs.Scene();
    {
      const url_yoshi = "models/yoshi/scene.gltf";

      gltfLoader.load(url_yoshi, (gltf) => {
        yoshi = gltf.scene;
        yoshi.name = "yoshi";
        yoshi.position.set(0, -14.3, -620);
        yoshi.scale.set(0.3, 0.3, 0.3);

        yoshi.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        yoshi.castShadow = true;
        yoshi.receiveShadow = true;

        head = yoshi.getObjectByName(yoshiFunc.yoshi_dic.Head);
        torso = yoshi.getObjectByName(yoshiFunc.yoshi_dic.Torso);
        upperArm_right = yoshi.getObjectByName(
          yoshiFunc.yoshi_dic.UpperArm_right
        );
        upperArm_left = yoshi.getObjectByName(
          yoshiFunc.yoshi_dic.UpperArm_left
        );
        spine = yoshi.getObjectByName(yoshiFunc.yoshi_dic.Spine);

        //right_arm related bones
        handRight = yoshi.getObjectByName(yoshiFunc.yoshi_dic.Hand_right);
        thumb1_right = yoshi.getObjectByName(yoshiFunc.yoshi_dic.Thumb1_right);
        thumb2_right = yoshi.getObjectByName(yoshiFunc.yoshi_dic.Thumb2_right);
        finger1_right = yoshi.getObjectByName(
          yoshiFunc.yoshi_dic.Finger1_right
        );
        finger1_2_right = yoshi.getObjectByName(
          yoshiFunc.yoshi_dic.Finger1_2_right
        );
        finger2_right = yoshi.getObjectByName(
          yoshiFunc.yoshi_dic.Finger2_right
        );
        finger2_2_right = yoshi.getObjectByName(
          yoshiFunc.yoshi_dic.Finger2_2_right
        );
        finger3_right = yoshi.getObjectByName(
          yoshiFunc.yoshi_dic.Finger3_right
        );
        finger3_2_right = yoshi.getObjectByName(
          yoshiFunc.yoshi_dic.Finger3_2_right
        );

        //left_arm related bones
        handLeft = yoshi.getObjectByName(yoshiFunc.yoshi_dic.Hand_left);
        thumb1_left = yoshi.getObjectByName(yoshiFunc.yoshi_dic.Thumb1_left);
        thumb2_left = yoshi.getObjectByName(yoshiFunc.yoshi_dic.Thumb2_left);
        finger1_left = yoshi.getObjectByName(yoshiFunc.yoshi_dic.Finger1_left);
        finger1_2_left = yoshi.getObjectByName(
          yoshiFunc.yoshi_dic.Finger1_2_left
        );
        finger2_left = yoshi.getObjectByName(yoshiFunc.yoshi_dic.Finger2_left);
        finger2_2_left = yoshi.getObjectByName(
          yoshiFunc.yoshi_dic.Finger2_2_left
        );
        finger3_left = yoshi.getObjectByName(yoshiFunc.yoshi_dic.Finger3_left);
        finger3_2_left = yoshi.getObjectByName(
          yoshiFunc.yoshi_dic.Finger3_2_left
        );

        //left_leg related bones
        upperLeg_left = yoshi.getObjectByName(
          yoshiFunc.yoshi_dic.UpperLeg_left
        );
        lowerLeg_left = yoshi.getObjectByName(
          yoshiFunc.yoshi_dic.LowerLeg_left
        );
        upperLeg_right = yoshi.getObjectByName(
          yoshiFunc.yoshi_dic.UpperLeg_right
        );
        lowerLeg_right = yoshi.getObjectByName(
          yoshiFunc.yoshi_dic.LowerLeg_right
        );

        upperArm_right.rotation.z = (45 * Math.PI) / 180;
        upperArm_left.rotation.z = (45 * Math.PI) / 180;
        upperArm_right.rotation.x = (0 * Math.PI) / 180;
        upperArm_left.rotation.x = (0 * Math.PI) / 180;
        upperLeg_right.rotation.x = (0 * Math.PI) / 180;
        upperLeg_left.rotation.x = (-180 * Math.PI) / 180;

        thumb1_left.rotation.y = (90 * Math.PI) / 180;
        thumb2_left.rotation.x = (-135 * Math.PI) / 180;
        finger1_left.rotation.x = (-90 * Math.PI) / 180;
        finger1_2_left.rotation.x = (-90 * Math.PI) / 180;
        finger2_left.rotation.x = (-90 * Math.PI) / 180;
        finger2_2_left.rotation.x = (-90 * Math.PI) / 180;
        finger3_left.rotation.x = (-90 * Math.PI) / 180;
        finger3_2_left.rotation.x = (-90 * Math.PI) / 180;

        thumb1_right.rotation.y = (90 * Math.PI) / 180;
        thumb2_right.rotation.x = (-135 * Math.PI) / 180;
        finger1_right.rotation.x = (-90 * Math.PI) / 180;
        finger1_2_right.rotation.x = (-90 * Math.PI) / 180;
        finger2_right.rotation.x = (-90 * Math.PI) / 180;
        finger2_2_right.rotation.x = (-90 * Math.PI) / 180;
        finger3_right.rotation.x = (-90 * Math.PI) / 180;
        finger3_2_right.rotation.x = (-90 * Math.PI) / 180;

        dirLight.target = yoshi;

        scene.add(yoshi);

        keyboard(yoshi);
        yoshiFunc.setYoshiGeometry();
        requestAnimationFrame(animate);
      });
    }
  }

  if (character == "mario") {
    mario = new THREE.Scene();
    {
      const url_mario = "models/mario/scene.gltf";
      gltfLoader.load(url_mario, (gltf) => {
        mario = gltf.scene;
        mario.name = "mario";
        mario.position.set(0, -14.1, -620);
        mario.scale.set(7, 7, 7);

        mario.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        mario.castShadow = true;
        mario.receiveShadow = true;

        head = mario.getObjectByName(marioFunc.mario_dic.Head);
        torso = mario.getObjectByName(marioFunc.mario_dic.Torso);
        upperArm_right = mario.getObjectByName(
          marioFunc.mario_dic.UpperArm_right
        );
        upperArm_left = mario.getObjectByName(
          marioFunc.mario_dic.UpperArm_left
        );
        spine = mario.getObjectByName(marioFunc.mario_dic.Spine);

        upperLeg_left = mario.getObjectByName(
          marioFunc.mario_dic.UpperLeg_left
        );
        lowerLeg_left = mario.getObjectByName(
          marioFunc.mario_dic.LowerLeg_left
        );
        upperLeg_right = mario.getObjectByName(
          marioFunc.mario_dic.UpperLeg_right
        );
        lowerLeg_right = mario.getObjectByName(
          marioFunc.mario_dic.LowerLeg_right
        );

        handRight = mario.getObjectByName(marioFunc.mario_dic.Hand_right);
        handLeft = mario.getObjectByName(marioFunc.mario_dic.Hand_left);

        upperArm_right.rotation.x = (45 * Math.PI) / 180;
        upperArm_left.rotation.x = (45 * Math.PI) / 180;
        upperLeg_right.rotation.x = (0 * Math.PI) / 180;
        lowerLeg_right.rotation.x = (0 * Math.PI) / 180;
        upperLeg_left.rotation.x = (0 * Math.PI) / 180;
        lowerLeg_left.rotation.x = (0 * Math.PI) / 180;

        dirLight.target = mario;

        scene.add(mario);

        keyboard(mario);
        marioFunc.setMarioGeometry();
        requestAnimationFrame(animate);
      });
    }
  }

  if (character == "luigi") {
    luigi = new THREE.Scene();
    {
      const url_luigi = "models/luigi/scene.gltf";
      gltfLoader.load(url_luigi, (gltf) => {
        luigi = gltf.scene;
        luigi.name = "luigi";
        luigi.position.set(0, -14.1, -620);
        luigi.scale.set(0.9, 0.9, 0.9);

        luigi.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        luigi.castShadow = true;
        luigi.receiveShadow = true;

        head = luigi.getObjectByName(luigiFunc.luigi_dic.Head);
        torso = luigi.getObjectByName(luigiFunc.luigi_dic.Torso);
        upperArm_right = luigi.getObjectByName(
          luigiFunc.luigi_dic.UpperArm_right
        );
        upperArm_left = luigi.getObjectByName(
          luigiFunc.luigi_dic.UpperArm_left
        );
        spine = luigi.getObjectByName(luigiFunc.luigi_dic.Spine);

        //right_arm related bones
        handRight = luigi.getObjectByName(luigiFunc.luigi_dic.Hand_right);
        thumb1_right = luigi.getObjectByName(luigiFunc.luigi_dic.Thumb1_right);
        thumb2_right = luigi.getObjectByName(luigiFunc.luigi_dic.Thumb2_right);
        finger1_right = luigi.getObjectByName(
          luigiFunc.luigi_dic.Finger1_right
        );
        finger1_2_right = luigi.getObjectByName(
          luigiFunc.luigi_dic.Finger1_2_right
        );
        finger2_right = luigi.getObjectByName(
          luigiFunc.luigi_dic.Finger2_right
        );
        finger2_2_right = luigi.getObjectByName(
          luigiFunc.luigi_dic.Finger2_2_right
        );
        finger3_right = luigi.getObjectByName(
          luigiFunc.luigi_dic.Finger3_right
        );
        finger3_2_right = luigi.getObjectByName(
          luigiFunc.luigi_dic.Finger3_2_right
        );
        finger4_right = luigi.getObjectByName(
          luigiFunc.luigi_dic.Finger4_right
        );
        finger4_2_right = luigi.getObjectByName(
          luigiFunc.luigi_dic.Finger4_2_right
        );

        //left_arm related bones
        handLeft = luigi.getObjectByName(luigiFunc.luigi_dic.Hand_left);
        thumb1_left = luigi.getObjectByName(luigiFunc.luigi_dic.Thumb1_left);
        thumb2_left = luigi.getObjectByName(luigiFunc.luigi_dic.Thumb2_left);
        finger1_left = luigi.getObjectByName(luigiFunc.luigi_dic.Finger1_left);
        finger1_2_left = luigi.getObjectByName(
          luigiFunc.luigi_dic.Finger1_2_left
        );
        finger2_left = luigi.getObjectByName(luigiFunc.luigi_dic.Finger2_left);
        finger2_2_left = luigi.getObjectByName(
          luigiFunc.luigi_dic.Finger2_2_left
        );
        finger3_left = luigi.getObjectByName(luigiFunc.luigi_dic.Finger3_left);
        finger3_2_left = luigi.getObjectByName(
          luigiFunc.luigi_dic.Finger3_2_left
        );
        finger4_left = luigi.getObjectByName(luigiFunc.luigi_dic.Finger4_left);
        finger4_2_left = luigi.getObjectByName(
          luigiFunc.luigi_dic.Finger4_2_left
        );

        //left_leg related bones
        upperLeg_left = luigi.getObjectByName(
          luigiFunc.luigi_dic.UpperLeg_left
        );
        lowerLeg_left = luigi.getObjectByName(
          luigiFunc.luigi_dic.LowerLeg_left
        );
        upperLeg_right = luigi.getObjectByName(
          luigiFunc.luigi_dic.UpperLeg_right
        );
        lowerLeg_right = luigi.getObjectByName(
          luigiFunc.luigi_dic.LowerLeg_right
        );

        upperArm_right.rotation.z = (45 * Math.PI) / 180;
        upperArm_left.rotation.z = (45 * Math.PI) / 180;
        upperArm_right.rotation.x = (0 * Math.PI) / 180;
        upperArm_left.rotation.x = (0 * Math.PI) / 180;
        upperLeg_right.rotation.x = (0 * Math.PI) / 180;
        upperLeg_left.rotation.x = (-180 * Math.PI) / 180;

        thumb1_left.rotation.y = (90 * Math.PI) / 180;
        thumb2_left.rotation.x = (-90 * Math.PI) / 180;
        finger1_left.rotation.x = (-90 * Math.PI) / 180;
        finger1_2_left.rotation.x = (-90 * Math.PI) / 180;
        finger2_left.rotation.x = (-90 * Math.PI) / 180;
        finger2_2_left.rotation.x = (-90 * Math.PI) / 180;
        finger3_left.rotation.x = (-90 * Math.PI) / 180;
        finger3_2_left.rotation.x = (-90 * Math.PI) / 180;
        finger4_left.rotation.x = (-90 * Math.PI) / 180;
        finger4_2_left.rotation.x = (-90 * Math.PI) / 180;

        thumb1_right.rotation.y = (90 * Math.PI) / 180;
        thumb2_right.rotation.x = (-90 * Math.PI) / 180;
        finger1_right.rotation.x = (-90 * Math.PI) / 180;
        finger1_2_right.rotation.x = (-90 * Math.PI) / 180;
        finger2_right.rotation.x = (-90 * Math.PI) / 180;
        finger2_2_right.rotation.x = (-90 * Math.PI) / 180;
        finger3_right.rotation.x = (-90 * Math.PI) / 180;
        finger3_2_right.rotation.x = (-90 * Math.PI) / 180;
        finger4_right.rotation.x = (-90 * Math.PI) / 180;
        finger4_2_right.rotation.x = (-90 * Math.PI) / 180;

        dirLight.target = luigi;

        scene.add(luigi);

        keyboard(luigi);
        luigiFunc.setLuigiGeometry();
        requestAnimationFrame(animate);
      });
    }
  }
}

function keyboard(character) {
  document.addEventListener("keydown", (event) => {
    keysPressed[event.keyCode] = true;
    switch (event.which) {
      case 68:
        if (!keyboardDisabled) {
          //D
          isWalking = true;
          collidedRight = false;
          if (!isRotatedRight) {
            groupRun.removeAll();
            groupRotate.removeAll();
            tweenFunc.rotateTorso("right");
            isRotatedRight = true;
          }
          if (!dPressed && isWalking) {
            tweenFunc.performAnimation("right", character);
          }
          dPressed = true;
        }

        break;

      case 65:
        if (!keyboardDisabled) {
          //A
          isWalking = true;
          collidedLeft = false;
          if (isRotatedRight) {
            groupRun.removeAll();
            groupRotate.removeAll();
            tweenFunc.rotateTorso("left");
            isRotatedRight = false;
          }
          if (!aPressed && isWalking) {
            tweenFunc.performAnimation("left", character);
          }
          aPressed = true;
        }

        break;

      case 32:
        if (!keyboardDisabled) {
          //SPACE
          if (isRotatedRight) {
            isJumpingRight = true;
          } else {
            isJumpingLeft = true;
          }
          if (!spacePressed && !isJumping && !isFalling) {
            tweenFunc.jump(character);
            isJumping = true;
          }
          spacePressed = true;
        }

        break;
    }
  });

  document.addEventListener("keyup", (event) => {
    delete keysPressed[event.keyCode];
    switch (event.which) {
      case 68:
        //D
        groupRun.removeAll();
        if (keysPressed[65]) {
          dPressed = false;
          isWalking = true;
          if (isRotatedRight) {
            groupRun.removeAll();
            groupRotate.removeAll();
            tweenFunc.rotateTorso("left");
            isRotatedRight = false;
          }
          tweenFunc.performAnimation("left", character);
          aPressed = true;
        } else {
          dPressed = false;
          isWalking = false;
          tween.stop();
          tweenBack.stop();
          tweenFunc.setIdlePosition(character);
        }

        break;

      case 65:
        //A
        groupRun.removeAll();

        if (keysPressed[68]) {
          aPressed = false;
          isWalking = true;
          if (!isRotatedRight) {
            groupRun.removeAll();
            groupRotate.removeAll();
            tweenFunc.rotateTorso("right");
            isRotatedRight = true;
          }
          tweenFunc.performAnimation("right", character);
          dPressed = true;
        } else {
          aPressed = false;
          isWalking = false;
          tween.stop();
          tweenBack.stop();
          tweenFunc.setIdlePosition(character);
        }

        break;

      case 32:
        spacePressed = false;
        break;
    }
  });
}

function loadModels() {
  brick = new THREE.Scene();
  {
    const url_brick = "models/brick_block/scene.gltf";
    gltfLoader.load(url_brick, (gltf) => {
      brick = gltf.scene;
      brick.name = "brick";
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
      brickLoaded = true;
    });
  }

  //CASTLE

  castle = new THREE.Scene();
  {
    const url_castle = "models/castle/scene.gltf";
    gltfLoader.load(url_castle, (gltf) => {
      castle = gltf.scene;
      castle.name = "castle";
      castle.position.set(17, -14.1, 330);
      castle.scale.set(0.01, 0.01, 0.01);

      castle.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        if (child.material) child.material.metalness = 0;
      });
      castle.castShadow = true;
      castle.receiveShadow = true;

      castle.rotation.y = (-90 * Math.PI) / 180;

      scene.add(castle);
      castleLoaded = true;
    });
  }

  //PIPE

  pipe = new THREE.Scene();
  {
    const url_pipe = "models/pipe/scene.gltf";
    gltfLoader.load(url_pipe, (gltf) => {
      pipe = gltf.scene;
      pipe.name = "pipe";
      pipe.position.set(0, -14.1, -680);
      pipe.scale.set(0.3, 0.3, 0.3);

      pipe.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        if (child.material) {
          child.material.metalness = 0.2;
        }
      });
      pipe.castShadow = true;
      pipe.receiveShadow = true;
      pipeLoaded = true;
    });
  }

  // COIN

  coin = new THREE.Scene();
  {
    const url_coin = "models/coin/scene.gltf";
    gltfLoader.load(url_coin, (gltf) => {
      coin = gltf.scene;
      coin.name = "coin";
      coin.position.set(0, 9, -590);
      coin.scale.set(1.8, 1.8, 1.8);

      coin.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
        }
        if (child.material) {
          child.material.metalness = 0;
        }
      });
      coin.castShadow = true;

      coin.rotation.y = (90 * Math.PI) / 180;
      coinLoaded = true;
    });
  }

  //GOOMBA
  goomba = new THREE.Scene();
  {
    const url_goomba = "models/goomba/scene.gltf";
    gltfLoader.load(url_goomba, (gltf) => {
      goomba = gltf.scene;
      goomba.name = "goomba";
      goomba.position.set(0, -13.3, -562.5);
      goomba.scale.set(0.07, 0.07, 0.07);

      goomba.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        if (child.material) child.material.metalness = 0;
      });
      goomba.castShadow = true;
      goomba.receiveShadow = true;

      goomba.rotation.y = (-90 * Math.PI) / 180;
      goombaLoaded = true;
    });
  }

  questionBox = new Physijs.Scene();
  {
    const url_questionBox = "models/question_box/scene.gltf";
    gltfLoader.load(url_questionBox, (gltf) => {
      questionBox = gltf.scene;
      questionBox.name = "questionBox";
      questionBox.position.set(0, 6.2, -600);
      questionBox.scale.set(0.031, 0.031, 0.031);

      questionBox.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        if (child.material) child.material.metalness = 0;
      });
      questionBox.castShadow = true;
      questionBox.receiveShadow = true;
      questionLoaded = true;
    });
  }

  // POWER UP

  powerUp = new THREE.Scene();
  {
    const url_powerUp = "models/power-up/scene.gltf";
    gltfLoader.load(url_powerUp, (gltf) => {
      powerUp = gltf.scene;
      powerUp.name = "powerUp";
      powerUp.position.set(0, 16.5, -562.5);
      powerUp.scale.set(2.3, 2.3, 2.3);

      powerUp.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      powerUp.castShadow = true;
      powerUp.receiveShadow = true;

      powerUp.rotation.y = (180 * Math.PI) / 180;
      powerUpLoaded = true;
    });
  }

  emptyBlock = new THREE.Scene();
  {
    const url_emptyBlock = "models/empty_block/scene.gltf";
    gltfLoader.load(url_emptyBlock, (gltf) => {
      emptyBlock = gltf.scene;
      emptyBlock.name = "emptyBlock";
      emptyBlock.position.set(0, -11.2, -60);
      emptyBlock.scale.set(0.55, 0.55, 0.55);

      emptyBlock.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
        }
        if (child.material) child.material.metalness = 0;
      });
      emptyBlock.castShadow = true;
      emptyBlock.receiveShadow = true;
      emptyBlockLoaded = true;
    });
  }
}

function createLevel() {
  blockFunc.createGroupPipes();
  blockFunc.createGroup3();
  blockFunc.createGroup5();
  blockFunc.createGroup6();
  blockFunc.createGroup1();
  blockFunc.createGroup2();
  blockFunc.createGroup4();
  blockFunc.createGroupStairs(-60, 4);
  blockFunc.createGroupStairsReverse(-15, 4);
  blockFunc.createGroupStairs(20, 4);
  blockFunc.createGroupStairsReverse(55, 4);
  blockFunc.createGroupStairs(220, 8);
}

function animate() {
  TWEEN.update();
  groupRun.update();
  groupJump.update();
  groupRotate.update();

  for (var i in goombaArray) {
    updateGoombaBoxPosition(goombaArray[i], i);
  }

  for (var i in coinContainerArray) {
    objectFunc.updateCoinBoxPosition(coinArray[i], i);
  }

  for (var i in powerUpContainerArray) {
    objectFunc.updatePowerUpBoxPosition(powerUpArray[i], i);
  }

  if (character == "yoshi") {
    camera.lookAt(yoshi.position.x, yoshi.position.y, yoshi.position.z);
    yoshiFunc.updateYoshiBoxPosition();
    if (yoshi.position.z >= 330) {
      localStorage.setItem("coinScore", score);
      levelSound.volume = 0;
      winSound.play();
      groupRun.removeAll();
      groupJump.removeAll();
      groupRotate.removeAll();
      yoshi.position.y = -14.3;
      keyboardDisabled = true;
      tweenFunc.win(yoshi);
      setTimeout(loadWin.bind(null), 6000);
    }
  }
  if (character == "mario") {
    camera.lookAt(mario.position.x, mario.position.y, mario.position.z);
    marioFunc.updateMarioBoxPosition();
    if (mario.position.z >= 330) {
      localStorage.setItem("coinScore", score);
      levelSound.volume = 0;
      winSound.play();
      groupRun.removeAll();
      groupJump.removeAll();
      groupRotate.removeAll();
      mario.position.y = -14.3;
      keyboardDisabled = true;
      tweenFunc.win(mario);
      setTimeout(loadWin.bind(null), 6000);
    }
  }
  if (character == "luigi") {
    camera.lookAt(luigi.position.x, luigi.position.y, luigi.position.z);
    luigiFunc.updateLuigiBoxPosition();
    if (luigi.position.z >= 330) {
      localStorage.setItem("coinScore", score);
      levelSound.volume = 0;
      winSound.play();
      groupRun.removeAll();
      groupJump.removeAll();
      groupRotate.removeAll();
      luigi.position.y = -14.3;
      keyboardDisabled = true;
      tweenFunc.win(luigi);
      setTimeout(loadWin.bind(null), 6000);
    }
  }

  if (
    questionLoaded &&
    coinLoaded &&
    brickLoaded &&
    pipeLoaded &&
    goombaLoaded &&
    powerUpLoaded &&
    emptyBlockLoaded &&
    castleLoaded
  ) {
    createLevel();
    questionLoaded = false;
    coinLoaded = false;
    brickLoaded = false;
    pipeLoaded = false;
    goombaLoaded = false;
    powerUpLoaded = false;
    emptyBlockLoaded = false;
    castleLoaded = false;
  }

  scene.simulate();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
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

  ground = new Physijs.BoxMesh(geometry, material, 0);
  ground.receiveShadow = true;
};

function createLandscape() {
  landscape = new landscapeFunction();
  ground.position.y = -24;
  scene.add(ground);
  setWallGeometry();
}

function createBgSky() {
  var bgSky = new THREE.PlaneGeometry(1500, 200);
  var skyTexture = THREE.ImageUtils.loadTexture("img/sky.png");
  skyTexture.wrapS = THREE.RepeatWrapping;
  skyTexture.wrapT = THREE.RepeatWrapping;
  skyTexture.repeat.set(6, 1);

  var bgSkyMaterial = new THREE.MeshPhongMaterial({
    map: skyTexture,
    shading: THREE.FlatShading,
  });
  var bg = new THREE.Mesh(bgSky, bgSkyMaterial);
  bg.position.set(25, 85, 0);
  bg.rotation.y = (-90 * Math.PI) / 180;
  scene.add(bg);
}

var lifeImg = document.createElement("img");
lifeImg.style.position = "absolute";
lifeImg.src = "img/powerUpIcon.png";
lifeImg.style.height = 40 + "px";
lifeImg.style.top = 20 + "px";
lifeImg.style.left = 40 + "px";
document.body.appendChild(lifeImg);

life = 2;

textLife = document.createElement("h1");
textLife.style.fontFamily = "superMarioFont";
textLife.style.position = "absolute";
textLife.style.color = "white";
textLife.style.webkitTextStroke = "1px black";
textLife.style.textShadow = "4px 4px 8px black";
textLife.style.height = 40 + "px";
textLife.style.top = 30 + "px";
textLife.style.left = 90 + "px";
document.body.appendChild(textLife);

textLife.innerHTML = "x" + life;

var coinScore = document.createElement("img");
coinScore.style.position = "absolute";
coinScore.src = "img/coinScore.gif";
coinScore.style.height = 40 + "px";
coinScore.style.top = 80 + "px";
coinScore.style.left = 40 + "px";
document.body.appendChild(coinScore);

score = 0;

text = document.createElement("h1");
text.style.fontFamily = "superMarioFont";
text.style.position = "absolute";
text.style.color = "yellow";
text.style.webkitTextStroke = "1px black";
text.style.textShadow = "4px 4px 8px black";
text.style.height = 40 + "px";
text.style.top = 90 + "px";
text.style.left = 90 + "px";
document.body.appendChild(text);

text.innerHTML = score;

init();
