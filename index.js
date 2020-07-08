//file js
"use strict";

import * as THREE from "./build/three.js-master/build/three.module.js";
import { GLTFLoader } from "./build/three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "./build/three.js-master/examples/jsm/controls/OrbitControls.js";
import TWEEN from "./build/tween.js-master/dist/tween.esm.js";

Physijs.scripts.worker = "physijs_worker.js";
Physijs.scripts.ammo = "ammo.js";

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
  //renderer.shadowMapSoft = true; //aggiunto ora

  renderer.setSize(window.innerWidth, window.innerHeight);

  const cameraX = -100; //-100
  const cameraY = 0; //0
  const cameraZ = -650; //0

  //controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(cameraX, cameraY, cameraZ);
  camera.updateProjectionMatrix();
  //controls.update();

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

  //scene = new THREE.Scene();
  scene = new Physijs.Scene();
  //scene.setGravity = new THREE.Vector3(0, -50, 0); //?
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
  //yoshi = new Physijs.Scene();
  {
    const url_yoshi = "models/yoshi/scene.gltf";

    gltfLoader.load(url_yoshi, (gltf) => {
      yoshi = gltf.scene;
      yoshi.name = "yoshi";
      yoshi.position.set(0, -14.3, -650);
      yoshi.scale.set(0.3, 0.3, 0.3);

      yoshi.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          //child.layers.enable(1);
        }
      });

      yoshi.castShadow = true;
      yoshi.receiveShadow = true;

      console.log(dumpObject(yoshi).join("\n"));

      head = yoshi.getObjectByName(yoshi_dic.Head);
      torso = yoshi.getObjectByName(yoshi_dic.Torso);
      upperArm_right = yoshi.getObjectByName(yoshi_dic.UpperArm_right);
      upperArm_left = yoshi.getObjectByName(yoshi_dic.UpperArm_left);
      spine = yoshi.getObjectByName(yoshi_dic.Spine);

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

      //left_leg related bones
      upperLeg_left = yoshi.getObjectByName(yoshi_dic.UpperLeg_left);
      lowerLeg_left = yoshi.getObjectByName(yoshi_dic.LowerLeg_left);
      upperLeg_right = yoshi.getObjectByName(yoshi_dic.UpperLeg_right);
      lowerLeg_right = yoshi.getObjectByName(yoshi_dic.LowerLeg_right);

      upperArm_right.rotation.z = (45 * Math.PI) / 180; //-60
      //handRight.rotation.y = (0 * Math.PI) / 180; -> deve tornare a 90 gradi
      upperArm_left.rotation.z = (45 * Math.PI) / 180;
      upperArm_right.rotation.x = (0 * Math.PI) / 180; //0
      upperArm_left.rotation.x = (0 * Math.PI) / 180;
      upperLeg_right.rotation.x = (0 * Math.PI) / 180;
      upperLeg_left.rotation.x = (-180 * Math.PI) / 180;
      //lowerLeg_right.rotation.x = (0 * Math.PI) / 180;
      //lowerLeg_left.rotation.x = (0 * Math.PI) / 180;
      //spine.rotation.x = (0 * Math.PI) / 180;
      //head.rotation.x = (0 * Math.PI) / 180;
      //camera.position.z += yoshi.position.z - camera.position.z;
      //controls.update();

      dirLight.target = yoshi;
      scene.add(yoshi);

      document.addEventListener("keydown", (event) => {
        keysPressed[event.keyCode] = true;
        switch (event.which) {
          case 68:
            isWalking = true;
            if (!isRotatedRight) {
              //TWEEN.removeAll();
              groupRun.removeAll(); //altrimenti rimane fermo ma le gamebe si muovono
              //tween.stop();
              groupRotate.removeAll();
              rotateTorso("right");
              isRotatedRight = true;
            }
            if (!dPressed && isWalking) {
              performAnimation("right");
            }
            dPressed = true;
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

            if (!spacePressed && !isJumping) {
              //groupJump.removeAll();
              setIdlePosition();
              jump();
              isJumping = true;
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
            if (keysPressed[65]) {
              //isRotatedRight = false;
              dPressed = false;
              isWalking = true;
              if (isRotatedRight) {
                //TWEEN.removeAll();
                groupRun.removeAll();
                //tween.stop();
                groupRotate.removeAll();
                rotateTorso("left");
                isRotatedRight = false;
              }
              //if (!aPressed && isWalking) {
              performAnimation("left");
              //}
              aPressed = true;
            } else {
              dPressed = false;
              //aPressed = false;
              isWalking = false;
              //groupRun.removeAll();
              tween.stop();
              tweenBack.stop();
              //setIdlePosition();
            }
            //aPressed = false;
            setIdlePosition();
            break;

          case 65:
            //A
            groupRun.removeAll();

            if (keysPressed[68]) {
              aPressed = false;
              //faccio ripartire la camminata verso destra
              isWalking = true;
              if (!isRotatedRight) {
                //TWEEN.removeAll();
                groupRun.removeAll();
                //tween.stop();
                groupRotate.removeAll();
                rotateTorso("right");
                isRotatedRight = true;
              }
              //if (!dPressed && isWalking) { --> se commento questa riga risolvo il problema
              performAnimation("right");
              //}
              dPressed = true;
              //isRotatedRight = true;
            } else {
              aPressed = false;
              //dPressed = false;
              isWalking = false;
              //groupRun.removeAll();
              tween.stop();
              tweenBack.stop();
              //setIdlePosition();
            }
            //dPressed = false;
            setIdlePosition();
            break;

          case 32:
            spacePressed = false;
            //isJumping = false;
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
  //brick = new Physijs.Scene();
  {
    const url_brick = "models/brick_block/scene.gltf";
    gltfLoader.load(url_brick, (gltf) => {
      brick = gltf.scene;
      brick.name = "brick";
      brick.position.set(0, 5, -600);
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
  */

  //QUESTION BOX

  questionBox = new THREE.Scene();
  {
    const url_questionBox = "models/question_box/scene.gltf";
    gltfLoader.load(url_questionBox, (gltf) => {
      questionBox = gltf.scene;
      questionBox.name = "questionBox";
      questionBox.position.set(0, 6.2, -618);
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

      scene.add(questionBox);
    });
  }
  /*
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
    //controls.target.set(yoshi.position.x, yoshi.position.y, yoshi.position.z);
    //controls.update();
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

  //var ground_material = Physijs.createMaterial(
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
  //);

  ground = new Physijs.BoxMesh(geometry, material, 0);
  ground.receiveShadow = true;
  //ground.layers.enable(1);
  //this.mesh = new THREE.Mesh(geometry, material);
  //this.mesh.receiveShadow = true;
};

function createLandscape() {
  landscape = new landscapeFunction();
  ground.position.y = -24;
  scene.add(ground);
  //landscape.mesh.position.y = -24;
  //landscape.mesh.rotation.x = (0 * Math.PI) / 180;
  //scene.add(landscape.mesh);
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

//Mettere TUTTI i valori iniziali e finali di TUTTI i tween qui dentro, chiamarla in ogni funzione che fa partire un tween per settare i parameter --> molto più ordinato
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
    spine: spine.rotation.x,
    head: head.rotation.x,
  };
  tweenGoalScale = {
    x_left: (-225 * Math.PI) / 180,
    x_right: (45 * Math.PI) / 180,
    x_leftArm: (45 * Math.PI) / 180,
    x_rightArm: (-45 * Math.PI) / 180,
    spine: (10 * Math.PI) / 180,
    head: (-10 * Math.PI) / 180,
  };
  tweenBackScale = {
    x_left: (-135 * Math.PI) / 180,
    x_right: (-45 * Math.PI) / 180,
    x_leftArm: (-45 * Math.PI) / 180,
    x_rightArm: (45 * Math.PI) / 180,
    //y: -14.3, -> pensare se fare piegare le ginocchia e quindi anche traslare su e giu yoshi
    //spine: (0 * Math.PI) / 180,
    //head: (0 * Math.PI) / 180,
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
    spine: (0 * Math.PI) / 180,
    head: (0 * Math.PI) / 180,
  };
}

function performAnimation(direction) {
  setAnimationParameters(); //rinominare setTweenParameter!

  tween = new TWEEN.Tween(tweenStartScale, groupRun)
    .to(tweenGoalScale, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      upperLeg_left.rotation.x = tweenStartScale.x_left;
      upperLeg_right.rotation.x = tweenStartScale.x_right;
      upperArm_left.rotation.x = tweenStartScale.x_leftArm;
      upperArm_right.rotation.x = tweenStartScale.x_rightArm;
      //yoshi.position.y = tweenStartScale.y;
      spine.rotation.x = tweenStartScale.spine;
      head.rotation.x = tweenStartScale.head;
      if (direction == "right") {
        yoshi.position.z += 0.2;
        dirLight.position.z += 0.2;
      }
      if (direction == "left") {
        yoshi.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }
      camera.position.z += yoshi.position.z - camera.position.z;
      //controls.update();
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
      //yoshi.position.y = tweenStartScale.y;
      spine.rotation.x = tweenStartScale.spine;
      head.rotation.x = tweenStartScale.head;
      if (direction == "right") {
        yoshi.position.z += 0.2;
        dirLight.position.z += 0.2;
      }
      if (direction == "left") {
        yoshi.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }
      camera.position.z += yoshi.position.z - camera.position.z;
      //controls.update();
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
      .to(tweenGoalLeft, 400)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function () {
        torso.rotation.y = tweenStartLeft.y_leftRotation;
      })
      .start();
  }
  if (direction == "right") {
    var tweenRight = new TWEEN.Tween(tweenStartRight, groupRotate)
      .to(tweenGoalRight, 400)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function () {
        torso.rotation.y = tweenStartRight.y_rightRotation;
      })
      .start();
  }
}

function setTweenJumpParameters() {
  //metterci tweenstartjump, tweengoaljump, tweengoaljumpback
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
    /*upperLeg_right: upperLeg_right.rotation.x,
    upperLeg_left: upperLeg_left.rotation.x,
    lowerLeg: lowerLeg_right.rotation.x,
    spine: spine.rotation.x,
    head: head.rotation.x,*/
    upperLeg_right: (-45 * Math.PI) / 180,
    upperLeg_left: (-225 * Math.PI) / 180,
    lowerLeg: (75 * Math.PI) / 180,
    spine: (30 * Math.PI) / 180,
    head: (-15 * Math.PI) / 180,
  };
  var tweenGoalJump = {
    y: -3,
    rightArm_rotation_z: (-60 * Math.PI) / 180,
    rightHand_rotation_y: (0 * Math.PI) / 180,
    finger_x: (-90 * Math.PI) / 180,
    thumb1_y: (135 * Math.PI) / 180,
    thumb2_x: (90 * Math.PI) / 180,
    upperLeg_right: (0 * Math.PI) / 180,
    lowerLeg: (0 * Math.PI) / 180,
    spine: (0 * Math.PI) / 180,
    head: (0 * Math.PI) / 180,
    upperLeg_left: (-180 * Math.PI) / 180,
  };
  var tweenGoalJumpBack = {
    y: -14.3,
    rightArm_rotation_z: (45 * Math.PI) / 180,
    rightHand_rotation_y: (90 * Math.PI) / 180,
    finger_x: (0 * Math.PI) / 180,
    thumb1_y: (66.5 * Math.PI) / 180,
    thumb2_x: (0 * Math.PI) / 180,
  };
  var tweenStartFlex = {
    upperLeg_right: upperLeg_right.rotation.x,
    upperLeg_left: upperLeg_left.rotation.x,
    lowerLeg: lowerLeg_right.rotation.x,
    spine: spine.rotation.x,
    head: head.rotation.x,
    y: yoshi.position.y,
  };
  var tweenGoalFlex = {
    upperLeg_right: (-45 * Math.PI) / 180,
    upperLeg_left: (-225 * Math.PI) / 180,
    lowerLeg: (75 * Math.PI) / 180,
    spine: (30 * Math.PI) / 180,
    head: (-15 * Math.PI) / 180,
    y: -14.6,
  };
  /*var tweenGoalFlexBack = {
    upperLeg_right: (0 * Math.PI) / 180,
    lowerLeg: (0 * Math.PI) / 180,
    spine: (0 * Math.PI) / 180,
    head: (0 * Math.PI) / 180,
    upperLeg_left: (-180 * Math.PI) / 180,
    y: -14.3,
  };*/
  var tweenFlex = new TWEEN.Tween(tweenStartFlex, groupJump)
    .to(tweenGoalFlex, 200)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      upperLeg_right.rotation.x = tweenStartFlex.upperLeg_right;
      upperLeg_left.rotation.x = tweenStartFlex.upperLeg_left;
      lowerLeg_right.rotation.x = tweenStartFlex.lowerLeg;
      lowerLeg_left.rotation.x = tweenStartFlex.lowerLeg;
      spine.rotation.x = tweenStartFlex.spine;
      head.rotation.x = tweenStartFlex.head;
      yoshi.position.y = tweenStartFlex.y;
    })
    .start();
  /*var tweenFlexBack = new TWEEN.Tween(tweenStartFlex, groupJump)
    .to(tweenGoalFlexBack, 300)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function () {
      upperLeg_right.rotation.x = tweenStartFlex.upperLeg_right;
      upperLeg_left.rotation.x = tweenStartFlex.upperLeg_left;
      lowerLeg_right.rotation.x = tweenStartFlex.lowerLeg;
      lowerLeg_left.rotation.x = tweenStartFlex.lowerLeg;
      spine.rotation.x = tweenStartFlex.spine;
      head.rotation.x = tweenStartFlex.head;
      yoshi.position.y = tweenStartFlex.y;
    });
  tweenFlex.chain(tweenFlexBack);*/
  var tweenJump = new TWEEN.Tween(tweenStartJump, groupJump)
    .to(tweenGoalJump, 400)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function () {
      yoshi.position.y = tweenStartJump.y;
      if (keysPressed[68]) {
        yoshi.position.z += 0.3;
        dirLight.position.z += 0.3;
      }
      if (keysPressed[65]) {
        yoshi.position.z -= 0.3;
        dirLight.position.z -= 0.3;
      }
      upperLeg_right.rotation.x = tweenStartJump.upperLeg_right;
      upperLeg_left.rotation.x = tweenStartJump.upperLeg_left;
      lowerLeg_right.rotation.x = tweenStartJump.lowerLeg;
      lowerLeg_left.rotation.x = tweenStartJump.lowerLeg;
      spine.rotation.x = tweenStartJump.spine;
      head.rotation.x = tweenStartJump.head;
      if (isRotatedRight && isJumpingRight) {
        upperArm_right.rotation.x = (0 * Math.PI) / 180;
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
        upperArm_left.rotation.x = (0 * Math.PI) / 180;
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
    });
  //.start();
  tweenFlex.chain(tweenJump);
  var tweenJumpBack = new TWEEN.Tween(tweenStartJump, groupJump)
    .to(tweenGoalJumpBack, 400)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function () {
      yoshi.position.y = tweenStartJump.y;
      if (keysPressed[68]) {
        yoshi.position.z += 0.3;
        dirLight.position.z += 0.3;
      }
      if (keysPressed[65]) {
        yoshi.position.z -= 0.3;
        dirLight.position.z -= 0.3;
      }
      if (isRotatedRight && isJumpingRight) {
        upperArm_right.rotation.x = (0 * Math.PI) / 180;
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
        upperArm_left.rotation.x = (0 * Math.PI) / 180;
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
      isJumpingRight = false;
      isJumpingLeft = false;
      isJumping = false;
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
      spine.rotation.x = tweenStartScale.spine;
      head.rotation.x = tweenStartScale.head;
      upperLeg_left.rotation.x = tweenStartScale.x_left;
      upperLeg_right.rotation.x = tweenStartScale.x_right;
      upperArm_left.rotation.x = tweenStartScale.x_leftArm;
      upperArm_right.rotation.x = tweenStartScale.x_rightArm;
      //mettere a posto anche le dita

      //parametri modificati durante il salto
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
