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
var handLeft;
var thumb1_left;
var thumb2_left;
var finger1_left;
var finger1_2_left;
var finger2_left;
var finger2_2_left;
var finger3_left;
var finger3_2_left;

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
var mario;
var luigi;
var brick;
var castle;
var pipe;
var flagpole;
var coin;
var powerUp;
var questionBox;

var camera;
var dPressed = false;
var aPressed = false;
var spacePressed = false;
var isRotatedRight = true;
var isWalking = false;
var isJumpingLeft = false;
var isJumpingRight = false;
var dirLight;
var ambientLight;
var controls;
var keysPressed = {};
var groupRun = new TWEEN.Group();
var groupJump = new TWEEN.Group();
var groupRotate = new TWEEN.Group();

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
    //var helper = new THREE.CameraHelper(camera);
    //scene.add(helper);

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

      //right_arm related bones
      handRight = yoshi.getObjectByName(yoshi_dic.Hand_right);
      thumb1_right = yoshi.getObjectByName(yoshi_dic.Thumb1_right);
      thumb2_right = yoshi.getObjectByName(yoshi_dic.Thumb2_right);
      finger1_right = yoshi.getObjectByName(yoshi_dic.Finger1_right);
      finger1_2_right = yoshi.getObjectByName(yoshi_dic.Finger1_2_right);
      finger2_right = yoshi.getObjectByName(yoshi_dic.Finger2_right);
      finger2_2_right = yoshi.getObjectByName(yoshi_dic.Finger2_2_right);
      finger3_right = yoshi.getObjectByName(yoshi_dic.Finger3_right);
      finger3_2_right = yoshi.getObjectByName(yoshi_dic.Finger3_2_right);

      //left_arm related bones
      handLeft = yoshi.getObjectByName(yoshi_dic.Hand_left);
      thumb1_left = yoshi.getObjectByName(yoshi_dic.Thumb1_left);
      thumb2_left = yoshi.getObjectByName(yoshi_dic.Thumb2_left);
      finger1_left = yoshi.getObjectByName(yoshi_dic.Finger1_left);
      finger1_2_left = yoshi.getObjectByName(yoshi_dic.Finger1_2_left);
      finger2_left = yoshi.getObjectByName(yoshi_dic.Finger2_left);
      finger2_2_left = yoshi.getObjectByName(yoshi_dic.Finger2_2_left);
      finger3_left = yoshi.getObjectByName(yoshi_dic.Finger3_left);
      finger3_2_left = yoshi.getObjectByName(yoshi_dic.Finger3_2_left);

      upperArm_right.rotation.z = (45 * Math.PI) / 180; //-60
      //handRight.rotation.y = (0 * Math.PI) / 180; -> deve tornare a 90 gradi
      upperArm_left.rotation.z = (45 * Math.PI) / 180;
      upperArm_right.rotation.x = (0 * Math.PI) / 180; //0
      upperArm_left.rotation.x = (0 * Math.PI) / 180;
      upperLeg_right.rotation.x = (0 * Math.PI) / 180;
      upperLeg_left.rotation.x = (-180 * Math.PI) / 180;

      //camera.position.z += yoshi.position.z - camera.position.z;
      //controls.update();

      dirLight.target = yoshi;
      scene.add(yoshi);

      /*document.addEventListener("keydown", onDocumentKeyDown, false);
      function onDocumentKeyDown(event) {
        var keyCode = event.keyCode;
        //D
        if (keyCode == 68) {
          isWalking = true;
          if (!isRotatedRight) {
            TWEEN.removeAll();
            //tween.stop();
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
            //tween.stop();
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
            //TWEEN.removeAll();
            //tween.stop();
            setIdlePosition();
            jump();
          }
          spacePressed = true;
        }
      }*/

      /*document.addEventListener("keyup", onDocumentKeyUp, false);
      function onDocumentKeyUp(event) {
        var keyCode = event.keyCode;
        if (keyCode == 68) {
          //D
          if (aPressed) {
            //isRotatedRight = false;
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
          //A
          if (dPressed) {
            aPressed = false;
            //isRotatedRight = true;
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
      }*/

      /*document.addEventListener("keydown", (event) => {
        keysPressed[event.keyCode] = true;

        if (event.keyCode == 68) {
          //D
          isWalking = true;
          if (!isRotatedRight) {
            //TWEEN.removeAll();
            groupRun.removeAll();
            //tween.stop();
            groupRotate.removeAll();
            rotateTorso("right");
            isRotatedRight = true;
          }
          if (!dPressed && isWalking) {
            performAnimation("right");
          }
          dPressed = true;
        }

        //A
        if (event.keyCode == 65) {
          isWalking = true;
          if (isRotatedRight) {
            //TWEEN.removeAll();
            groupRun.removeAll();
            //tween.stop();
            groupRotate.removeAll();
            rotateTorso("left");
            isRotatedRight = false;
          }
          if (!aPressed && isWalking) {
            performAnimation("left");
          }
          aPressed = true;
        }
        if (event.keyCode == 32) {
          //SPACE
          if (isRotatedRight) {
            isJumpingRight = true;
          } else {
            isJumpingLeft = true;
          }

          if (!spacePressed) {
            groupJump.removeAll();
            setIdlePosition();
            jump();
          }


          spacePressed = true;
        }
      });
      document.addEventListener("keyup", (event) => {
        delete keysPressed[event.keyCode];

        if (event.keyCode == 68) {
          //D
          if (aPressed) {
            //isRotatedRight = false;
            dPressed = false;
          } else {
            dPressed = false;
            aPressed = false;
            isWalking = false;
            //tween.stop();
            //tweenBack.stop();
            //setIdlePosition();
          }
          setIdlePosition();
      
        }
        if (event.keyCode == 65) {
          //A
          if (dPressed) {
            aPressed = false;
            //isRotatedRight = true;
          } else {
            aPressed = false;
            dPressed = false;
            isWalking = false;
            //tween.stop();
            //tweenBack.stop();
            //setIdlePosition();
          }
          setIdlePosition();
   
        }
        if (event.keyCode == 32) {
          spacePressed = false;
          setIdlePosition();
        }
      });

      setAnimationParameters();
      requestAnimationFrame(animate);
    });
  }*/

      document.addEventListener("keydown", (event) => {
        keysPressed[event.keyCode] = true;
        switch (event.which) {
          case 68:
            isWalking = true;
            if (!isRotatedRight) {
              //TWEEN.removeAll();
              groupRun.removeAll();
              //tween.stop();
              groupRotate.removeAll();
              rotateTorso("right");
              isRotatedRight = true;
            }
            if (!dPressed && isWalking) {
              performAnimation("right");
            }
            dPressed = true;
            console.log("dPressed = " + dPressed);
            break;

          case 65:
            isWalking = true;
            if (isRotatedRight) {
              //TWEEN.removeAll();
              groupRun.removeAll();
              //tween.stop();
              groupRotate.removeAll();
              rotateTorso("left");
              isRotatedRight = false;
            }
            if (!aPressed && isWalking) {
              performAnimation("left");
            }
            aPressed = true;
            break;

          case 32:
            //SPACE
            if (isRotatedRight) {
              isJumpingRight = true;
            } else {
              isJumpingLeft = true;
            }

            if (!spacePressed) {
              groupJump.removeAll();
              setIdlePosition();
              jump();
            }
            spacePressed = true;
            break;
        }
      });

      document.addEventListener("keyup", (event) => {
        delete keysPressed[event.keyCode];
        switch (event.which) {
          case 68:
            //D
            groupRun.removeAll();
            if (aPressed) {
              //isRotatedRight = false;
              dPressed = false;
            } else {
              dPressed = false;
              aPressed = false;
              isWalking = false;
              //groupRun.removeAll();
              //tween.stop();
              //tweenBack.stop();
              //setIdlePosition();
            }
            setIdlePosition();
            console.log("(inside keyUp(D)) keysPressed[D] " + keysPressed[68]);
            break;

          case 65:
            //A
            groupRun.removeAll();

            if (dPressed) {
              aPressed = false;
              //isRotatedRight = true;
            } else {
              aPressed = false;
              //dPressed = false;
              isWalking = false;
              //groupRun.removeAll();
              //tween.stop();
              //tweenBack.stop();
              //setIdlePosition();
            }
            dPressed = false;
            console.log("(inside keyup(A)) dPressed = " + dPressed);
            console.log(isWalking);
            console.log("keyPressed[D] " + keysPressed[68]);
            setIdlePosition();
            break;

          case 32:
            spacePressed = false;
            setIdlePosition();
            break;
        }
      });

      setAnimationParameters();
      requestAnimationFrame(animate);
    });
  }

  /*
  //MARIO

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
        //if (child.material) child.material.metalness = 0;
      });
      mario.castShadow = true;
      mario.receiveShadow = true;

      //console.log(dumpObject(mario).join("\n"));

      head = mario.getObjectByName(yoshi_dic.Head);
      torso = mario.getObjectByName(yoshi_dic.Torso);
      upperArm_right = mario.getObjectByName(yoshi_dic.UpperArm_right);
      upperArm_left = mario.getObjectByName(yoshi_dic.UpperArm_left);
      upperLeg_right = mario.getObjectByName(yoshi_dic.UpperLeg_right);
      upperLeg_left = mario.getObjectByName(yoshi_dic.UpperLeg_left);
      handRight = mario.getObjectByName(yoshi_dic.Hand_right);

      upperArm_right.rotation.z = (45 * Math.PI) / 180;
      upperArm_left.rotation.z = (45 * Math.PI) / 180;
      upperArm_right.rotation.x = (0 * Math.PI) / 180;
      upperArm_left.rotation.x = (0 * Math.PI) / 180;
      upperLeg_right.rotation.x = (0 * Math.PI) / 180;
      upperLeg_left.rotation.x = (-180 * Math.PI) / 180;

      scene.add(mario);
    });
  }

  //LUIGI

  luigi = new THREE.Scene();
  {
    const url_luigi = "models/luigi/scene.gltf";
    gltfLoader.load(url_luigi, (gltf) => {
      luigi = gltf.scene;
      luigi.name = "luigi";
      luigi.position.set(0, -14.1, -640);
      luigi.scale.set(0.8, 0.8, 0.8);

      luigi.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        //if (child.material) child.material.metalness = 0;
      });
      luigi.castShadow = true;
      luigi.receiveShadow = true;

      console.log(dumpObject(luigi).join("\n"));

      head = luigi.getObjectByName(yoshi_dic.Head);
      torso = luigi.getObjectByName(yoshi_dic.Torso);
      upperArm_right = luigi.getObjectByName(yoshi_dic.UpperArm_right);
      upperArm_left = luigi.getObjectByName(yoshi_dic.UpperArm_left);
      upperLeg_right = luigi.getObjectByName(yoshi_dic.UpperLeg_right);
      upperLeg_left = luigi.getObjectByName(yoshi_dic.UpperLeg_left);
      handRight = luigi.getObjectByName(yoshi_dic.Hand_right);
      thumb1_right = luigi.getObjectByName(yoshi_dic.Thumb1_right);
      thumb2_right = luigi.getObjectByName(yoshi_dic.Thumb2_right);
      finger1_right = luigi.getObjectByName(yoshi_dic.Finger1_right);
      finger1_2_right = luigi.getObjectByName(yoshi_dic.Finger1_2_right);
      finger2_right = luigi.getObjectByName(yoshi_dic.Finger2_right);
      finger2_2_right = luigi.getObjectByName(yoshi_dic.Finger2_2_right);
      finger3_right = luigi.getObjectByName(yoshi_dic.Finger3_right);
      finger3_2_right = luigi.getObjectByName(yoshi_dic.Finger3_2_right);

      scene.add(luigi);
    });
  } */

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

  //CASTLE

  castle = new THREE.Scene();
  {
    const url_castle = "models/castle/scene.gltf";
    gltfLoader.load(url_castle, (gltf) => {
      castle = gltf.scene;
      castle.name = "castle";
      castle.position.set(17, -14.1, 600);
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
    });
  }
  /*
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
        if (child.material) child.material.metalness = 0.3;
      });
      pipe.castShadow = true;
      pipe.receiveShadow = true;

      scene.add(pipe);
    });
  }

  // COIN

  coin = new THREE.Scene();
  {
    const url_coin = "models/coin/scene.gltf";
    gltfLoader.load(url_coin, (gltf) => {
      coin = gltf.scene;
      coin.name = "coin";
      coin.position.set(0, 10, -623.8);
      coin.scale.set(5, 5, 5);

      coin.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        if (child.material) {
          child.material.metalness = 0;
          child.material.specular = 0;
        }
      });
      coin.castShadow = true;
      coin.receiveShadow = true;

      scene.add(coin);
    });
  }

  //QUESTION BOX

  questionBox = new THREE.Scene();
  {
    const url_questionBox = "models/question_box/scene.gltf";
    gltfLoader.load(url_questionBox, (gltf) => {
      questionBox = gltf.scene;
      questionBox.name = "questionBox";
      questionBox.position.set(0, 1.3, -618);
      questionBox.scale.set(0.03, 0.03, 0.03);

      questionBox.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        if (child.material) child.material.metalness = 0;
      });
      questionBox.castShadow = true;
      questionBox.receiveShadow = true;

      scene.add(questionBox);
    });
  }

  // POWER UP

  powerUp = new THREE.Scene();
  {
    const url_powerUp = "models/power-up/scene.gltf";
    gltfLoader.load(url_powerUp, (gltf) => {
      powerUp = gltf.scene;
      powerUp.name = "questionBox";
      powerUp.position.set(0, -12, -640);
      powerUp.scale.set(2.3, 2.3, 2.3);

      powerUp.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        //if (child.material) child.material.metalness = 0;
      });
      powerUp.castShadow = true;
      powerUp.receiveShadow = true;

      powerUp.rotation.y = (180 * Math.PI) / 180;

      scene.add(powerUp);
    });
  } 

  //FLAGPOLE

  //Non funziona

  flagpole = new THREE.Scene();
  {
    const url_flagpole = "models/flagpole/scene.gltf";
    gltfLoader.load(url_flagpole, (gltf) => {
      flagpole = gltf.scene;
      flagpole.name = "flagpole";
      flagpole.position.set(0, 10, -630);
      flagpole.scale.set(1000, 1000, 1000);

      flagpole.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        if (child.material) child.material.metalness = 0;
      });
      flagpole.castShadow = true;
      flagpole.receiveShadow = true;

      flagpole.rotation.z = (-45 * Math.PI) / 180;

      scene.add(flagpole);
    });
  } */

  scene.add(camera);
  createLandscape();
  createBgSky();

  function animate() {
    TWEEN.update();
    groupRun.update();
    groupJump.update();
    groupRotate.update();
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
    rightArm_rotation_z: (45 * Math.PI) / 180,
    //rightArm_rotation_x: (0 * Math.PI) / 180,
    rightHand_rotation_y: handRight.rotation.y,
    finger_x: finger1_right.rotation.x,
    thumb1_y: thumb1_right.rotation.y,
    thumb2_x: thumb2_right.rotation.x,
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

    rightArm_rotation_z: (45 * Math.PI) / 180,
    rightHand_rotation_y: (90 * Math.PI) / 180,
    finger_x: (0 * Math.PI) / 180,
    thumb1_y: (66.5 * Math.PI) / 180,
    thumb2_x: (0 * Math.PI) / 180,
  };
}

function performAnimation(direction) {
  tween = new TWEEN.Tween(tweenStartScale, groupRun)
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

  tweenBack = new TWEEN.Tween(tweenStartScale, groupRun)
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
    var tweenLeft = new TWEEN.Tween(tweenStartLeft, groupRotate)
      .to(tweenGoalLeft, 500)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function () {
        torso.rotation.y = tweenStartLeft.y_leftRotation;
      })
      .start();
  }
  if (direction == "right") {
    var tweenRight = new TWEEN.Tween(tweenStartRight, groupRotate)
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
    //rightArm_rotation_z: upperArm_right.rotation.z,
    rightArm_rotation_z: (45 * Math.PI) / 180,
    //rightArm_rotation_x: (0 * Math.PI) / 180,
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
  var tweenJump = new TWEEN.Tween(tweenStartJump, groupJump)
    .to(tweenGoalJump, 500)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function () {
      yoshi.position.y = tweenStartJump.y;
      if (isRotatedRight && isJumpingRight) {
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
      }
      if (!isRotatedRight && isJumpingLeft) {
        upperArm_left.rotation.z = tweenStartJump.rightArm_rotation_z;
        handLeft.rotation.y = tweenStartJump.rightHand_rotation_y;
        finger1_left.rotation.x = tweenStartJump.finger_x;
        finger1_2_left.rotation.x = tweenStartJump.finger_x;
        finger2_left.rotation.x = tweenStartJump.finger_x;
        finger2_2_left.rotation.x = tweenStartJump.finger_x;
        finger3_left.rotation.x = tweenStartJump.finger_x;
        finger3_2_left.rotation.x = tweenStartJump.finger_x;
        thumb2_left.rotation.x = tweenStartJump.finger_x;
        thumb1_left.rotation.y = tweenStartJump.thumb1_y;
      }

      //fix arm x rotation
      //upperArm_right.rotation.x = (0 * Math.PI) / 180;
    })
    .start();
  var tweenJumpBack = new TWEEN.Tween(tweenStartJump, groupJump)
    .to(tweenGoalJumpBack, 500)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      yoshi.position.y = tweenStartJump.y;
      if (isRotatedRight && isJumpingRight) {
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
      }
      if (!isRotatedRight && isJumpingLeft) {
        upperArm_left.rotation.z = tweenStartJump.rightArm_rotation_z;
        handLeft.rotation.y = tweenStartJump.rightHand_rotation_y;
        finger1_left.rotation.x = tweenStartJump.finger_x;
        finger1_2_left.rotation.x = tweenStartJump.finger_x;
        finger2_left.rotation.x = tweenStartJump.finger_x;
        finger2_2_left.rotation.x = tweenStartJump.finger_x;
        finger3_left.rotation.x = tweenStartJump.finger_x;
        finger3_2_left.rotation.x = tweenStartJump.finger_x;
        thumb2_left.rotation.x = tweenStartJump.finger_x;
        thumb1_left.rotation.y = tweenStartJump.thumb1_y;
      }

      //upperArm_right.rotation.x = (0 * Math.PI) / 180;
    })
    .onComplete(function () {
      isJumpingLeft = false;
      isJumpingRight = false;
      //setIdlePosition();
    });
  tweenJump.chain(tweenJumpBack);
}

function setIdlePosition() {
  //groupRun.removeAll();
  var tween_idle = new TWEEN.Tween(tweenStartScale)
    .to(tweenIdle, 500)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      upperLeg_left.rotation.x = tweenStartScale.x_left;
      upperLeg_right.rotation.x = tweenStartScale.x_right;
      upperArm_left.rotation.x = tweenStartScale.x_leftArm;
      upperArm_right.rotation.x = tweenStartScale.x_rightArm;
      //mettere a posto anche le dita

      upperArm_right.rotation.z = tweenStartScale.rightArm_rotation_z;
      handRight.rotation.y = tweenStartScale.rightHand_rotation_y;
      finger1_right.rotation.x = tweenStartScale.finger_x;
      finger1_2_right.rotation.x = tweenStartScale.finger_x;
      finger2_right.rotation.x = tweenStartScale.finger_x;
      finger2_2_right.rotation.x = tweenStartScale.finger_x;
      finger3_right.rotation.x = tweenStartScale.finger_x;
      finger3_2_right.rotation.x = tweenStartScale.finger_x;
      thumb2_right.rotation.x = tweenStartScale.finger_x;
      thumb1_right.rotation.y = tweenStartScale.thumb1_y;

      upperArm_left.rotation.z = tweenStartScale.rightArm_rotation_z;
      handLeft.rotation.y = tweenStartScale.rightHand_rotation_y;
      finger1_left.rotation.x = tweenStartScale.finger_x;
      finger1_2_left.rotation.x = tweenStartScale.finger_x;
      finger2_left.rotation.x = tweenStartScale.finger_x;
      finger2_2_left.rotation.x = tweenStartScale.finger_x;
      finger3_left.rotation.x = tweenStartScale.finger_x;
      finger3_2_left.rotation.x = tweenStartScale.finger_x;
      thumb2_left.rotation.x = tweenStartScale.finger_x;
      thumb1_left.rotation.y = tweenStartScale.thumb1_y;
    })
    .start();
}

init();
