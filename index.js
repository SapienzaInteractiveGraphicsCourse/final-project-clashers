//file js
"use strict";

import * as THREE from "./build/three.js-master/build/three.module.js";
import { GLTFLoader } from "./build/three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "./build/three.js-master/examples/jsm/controls/OrbitControls.js";
import TWEEN from "./build/tween.js-master/dist/tween.esm.js";
import * as collFunc from "./collisions.js";
import * as blockFunc from "./blocks.js";

Physijs.scripts.worker = "physijs_worker.js";
Physijs.scripts.ammo = "ammo.js";

groupRun = new TWEEN.Group();
groupJump = new TWEEN.Group();
groupRotate = new TWEEN.Group();

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
  const cameraZ = -620; //-620

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

  //scene = new THREE.Scene();
  scene = new Physijs.Scene();
  /*scene.addEventListener("update", function () {
    /*if (otherObj._physijs.id != yoshiBox._physijs.id) {
      isCollided = false;
    }
    console.log("yoshi " + yoshiBox._physijs.id);
    console.log("other " + otherObj._physijs.id);*/
  /*if (
      yoshiBox._physijs.touches.indexOf(pipeContainerTop._physijs.id) === -1
    ) {
      isCollided = false;
    } else {
      isCollided = true;
      console.log("ciao amici");
    }
    if (contactNormalY == 1) {
      isCollided = true;
    } else {
      isCollided = false;
    }
    console.log("iscollided " + isCollided);
    console.log("contactNormalY = " + contactNormalY);

    scene.simulate(undefined, 1);
  });*/
  scene.setGravity = new THREE.Vector3(0, -50, 0); //?
  {
    const d = 100;
    const color = 0xffffff;
    const intensity = 1;
    dirLight = new THREE.DirectionalLight(color, intensity, 100);
    dirLight.position.set(0, 100, -620); //y = 100
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

  //yoshi = new THREE.Scene();
  yoshi = new Physijs.Scene();
  {
    const url_yoshi = "models/yoshi/scene.gltf";

    gltfLoader.load(url_yoshi, (gltf) => {
      yoshi = gltf.scene;
      yoshi.name = "yoshi";
      yoshi.position.set(0, -14.3, -620); //-620
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

      //console.log(dumpObject(yoshi).join("\n"));

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

      //if (sessionStorage.getItem("yoshiPressed") == "true") {
      scene.add(yoshi);
      //}

      document.addEventListener("keydown", (event) => {
        keysPressed[event.keyCode] = true;
        switch (event.which) {
          case 68:
            //collidedRight = false;
            isWalking = true;
            if (!isRotatedRight) {
              //TWEEN.removeAll();
              groupRun.removeAll(); //altrimenti rimane fermo ma le gamebe si muovono
              //tween.stop();
              groupRotate.removeAll();
              rotateTorso("right");
              isRotatedRight = true;
            }
            if (!dPressed && isWalking && !collision) {
              //collision = false;
              performAnimation("right");
            }
            dPressed = true;
            break;

          case 65:
            //collision = false;
            //collidedLeft = false;
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
        collision = false;

        delete keysPressed[event.keyCode];
        switch (event.which) {
          case 68:
            //D
            //collision = false;
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
      setYoshiGeometry();
      setAnimationParameters();
      requestAnimationFrame(animate);
    });
  }

  geometryMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.5,
  });
  geometryMaterial1 = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.5,
    color: 0xeb4034,
  });
  geometryMaterial2 = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.5,
    color: 0x344feb,
  });

  function setYoshiGeometry() {
    var yoshiGeometry = new THREE.BoxGeometry(7.5, 6.5, 6.3);
    yoshiBox = new Physijs.BoxMesh(yoshiGeometry, geometryMaterial, 50); //mass 0
    //yoshiBox.position.set(0, -9.3, -600);
    yoshiBox.position.set(
      yoshi.position.x,
      yoshi.position.y + 5.2,
      yoshi.position.z
    );
    yoshiBox.setCcdMotionThreshold(1);
    scene.add(yoshiBox);
    yoshiBox.addEventListener("collision", collFunc.onYoshiCollision);

    var yoshiUpperGeometry = new THREE.BoxGeometry(7.5, 0.5, 6.3);
    yoshiUpperBox = new Physijs.BoxMesh(
      yoshiUpperGeometry,
      geometryMaterial1,
      50
    );
    yoshiUpperBox.position.set(
      yoshi.position.x,
      yoshi.position.y + 10,
      yoshi.position.z
    );
    yoshiUpperBox.setCcdMotionThreshold(1);
    scene.add(yoshiUpperBox);
    yoshiUpperBox.addEventListener("collision", collFunc.onYoshiUpperCollision);

    var yoshiLowerGeometry = new THREE.BoxGeometry(4, 0.1, 3);
    yoshiLowerBox = new Physijs.BoxMesh(
      yoshiLowerGeometry,
      geometryMaterial2,
      50
    );
    yoshiLowerBox.position.set(
      yoshi.position.x,
      yoshi.position.y + 0.1,
      yoshi.position.z
    );
    yoshiLowerBox.setCcdMotionThreshold(1);
    scene.add(yoshiLowerBox);
    yoshiLowerBox.addEventListener("collision", collFunc.onYoshiLowerCollision);
  }

  function updateYoshiBoxPosition() {
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
      yoshi.position.y + 0.1,
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

  /* function setQuestionBoxGeometry(questionBoxElem) {
    var questionBoxGeometry = new THREE.BoxGeometry(6.3, 6.3, 6.3);
    questionBoxContainer = new Physijs.BoxMesh(
      questionBoxGeometry,
      geometryMaterial,
      0
    );
    questionBoxContainer.position.set(
      questionBoxElem.position.x,
      questionBoxElem.position.y + 3.1,
      questionBoxElem.position.z
    );
    scene.add(questionBoxContainer);
  } */

  /*
  //MARIO

  mario = new THREE.Scene();
  {
    const url_mario = "models/mario/scene.gltf";
    gltfLoader.load(url_mario, (gltf) => {
      mario = gltf.scene;
      mario.name = "mario";
      mario.position.set(0, -14.1, -600);
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

      head = mario.getObjectByName(mario_dic.Head);
      //torso = mario.getObjectByName(mario_dic.Torso);
      upperArm_right = mario.getObjectByName(mario_dic.UpperArm_right);
      upperArm_left = mario.getObjectByName(mario_dic.UpperArm_left);
      upperLeg_right = mario.getObjectByName(mario_dic.UpperLeg_right);
      upperLeg_left = mario.getObjectByName(mario_dic.UpperLeg_left);
      handRight = mario.getObjectByName(mario_dic.Hand_right);

      //upperArm_right.rotation.z = (45 * Math.PI) / 180;
      //upperArm_left.rotation.z = (45 * Math.PI) / 180;
      upperArm_right.rotation.x = (45 * Math.PI) / 180;
      upperArm_left.rotation.x = (45 * Math.PI) / 180;
      upperLeg_right.rotation.x = (0 * Math.PI) / 180;
      upperLeg_left.rotation.x = (0 * Math.PI) / 180;

      if (sessionStorage.getItem("marioPressed") == "true") {
        scene.add(mario);
      }
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
      luigi.scale.set(0.9, 0.9, 0.9);

      luigi.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        //if (child.material) child.material.metalness = 0;
      });
      luigi.castShadow = true;
      luigi.receiveShadow = true;

      //console.log(dumpObject(luigi).join("\n"));

      head = luigi.getObjectByName(luigi_dic.Head);
      torso = luigi.getObjectByName(luigi_dic.Torso);
      upperArm_right = luigi.getObjectByName(luigi_dic.UpperArm_right);
      upperArm_left = luigi.getObjectByName(luigi_dic.UpperArm_left);
      upperLeg_right = luigi.getObjectByName(luigi_dic.UpperLeg_right);
      upperLeg_left = luigi.getObjectByName(luigi_dic.UpperLeg_left);
      handRight = luigi.getObjectByName(luigi_dic.Hand_right);
      thumb1_right = luigi.getObjectByName(luigi_dic.Thumb1_right);
      thumb2_right = luigi.getObjectByName(luigi_dic.Thumb2_right);
      finger1_right = luigi.getObjectByName(luigi_dic.Finger1_right);
      finger1_2_right = luigi.getObjectByName(luigi_dic.Finger1_2_right);
      finger2_right = luigi.getObjectByName(luigi_dic.Finger2_right);
      finger2_2_right = luigi.getObjectByName(luigi_dic.Finger2_2_right);
      finger3_right = luigi.getObjectByName(luigi_dic.Finger3_right);
      finger3_2_right = luigi.getObjectByName(luigi_dic.Finger3_2_right);

      upperArm_right.rotation.z = (45 * Math.PI) / 180; //-60
      upperArm_left.rotation.z = (45 * Math.PI) / 180;
      upperArm_right.rotation.x = (0 * Math.PI) / 180; //0
      upperArm_left.rotation.x = (0 * Math.PI) / 180;
      upperLeg_right.rotation.x = (0 * Math.PI) / 180;
      upperLeg_left.rotation.x = (-180 * Math.PI) / 180;

      if (sessionStorage.getItem("luigiPressed") == "true") {
        scene.add(luigi);
      }
    });
  }
*/
  function loadModels() {
    brick = new THREE.Scene();
    //brick = new Physijs.Scene();
    {
      const url_brick = "models/brick_block/scene.gltf";
      gltfLoader.load(url_brick, (gltf) => {
        brick = gltf.scene;
        brick.name = "brick";
        //brick.position.set(0, 5, -570);
        brick.scale.set(0.007, 0.007, 0.007);

        brick.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            //child.receiveShadow = true;
          }
          if (child.material) child.material.metalness = 0;
        });
        brick.castShadow = true;
        brick.receiveShadow = true;
        //scene.add(brick);
        //createGroup3();
      });
    }

    //CASTLE

    castle = new THREE.Scene();
    {
      const url_castle = "models/castle/scene.gltf";
      gltfLoader.load(url_castle, (gltf) => {
        castle = gltf.scene;
        castle.name = "castle";
        castle.position.set(17, -14.1, 450);
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
            //child.material.shininess = 50.5;
          }
        });
        pipe.castShadow = true;
        pipe.receiveShadow = true;

        //scene.add(pipe);
        //createGroupPipes();
      });
    }

    // COIN

    coin = new THREE.Scene();
    {
      const url_coin = "models/coin/scene.gltf";
      gltfLoader.load(url_coin, (gltf) => {
        coin = gltf.scene;
        coin.name = "coin";
        coin.position.set(0, 15, -570);
        coin.scale.set(1.8, 1.8, 1.8);

        coin.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            //child.receiveShadow = true;
          }
          if (child.material) {
            child.material.metalness = 0;
            //child.material.diffuse = 0xd2b48c;
            //child.material.specular = 50;
            //child.material.shininess = 0;
            //child.material.emissive = 0;
          }
        });
        coin.castShadow = true;
        coin.receiveShadow = true;

        coin.rotation.y = (90 * Math.PI) / 180;

        //scene.add(coin);
      });
    }

    //QUESTION BOX

    /*questionBox = new THREE.Scene();
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
            //child.receiveShadow = true;
          }
          if (child.material) child.material.metalness = 0;
        });
        questionBox.castShadow = true;
        questionBox.receiveShadow = true;

        scene.add(questionBox);
        createGroup1();
        createGroup2();
        createGroup4();
        createGroup5();
        createGroup6();
      });
    }*/

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

        console.log(dumpObject(goomba).join("\n"));

        //var left_foot = goomba.getObjectByName("Left_Foot");
        //left_foot.rotation.x = (90 * Math.PI) / 180;

        goomba.rotation.y = (-90 * Math.PI) / 180;

        blockFunc.createGroupPipes();
        blockFunc.createGroup3();
        //scene.add(goomba);
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
            //child.receiveShadow = true;
          }
          if (child.material) child.material.metalness = 0;
        });
        questionBox.castShadow = true;
        questionBox.receiveShadow = true;

        //scene.add(questionBox);
        //createGroup1();
        //createGroup2();
        //createGroup4();
        blockFunc.createGroup5();
        blockFunc.createGroup6();
        //setQuestionBoxGeometry(questionBox);
      });
    }

    /*var stoneGeom = new THREE.CubeGeometry(0.6, 6, 2);
    var questionBox_container = new Physijs.BoxMesh(
      stoneGeom,
      new THREE.MeshPhongMaterial({ color: 0xff0000 })
    );
    questionBox_container.position.set(0, 6.2, -600);
    scene.add(questionBox_container);*/

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
          //if (child.material) child.material.metalness = 0;
        });
        powerUp.castShadow = true;
        powerUp.receiveShadow = true;

        powerUp.rotation.y = (180 * Math.PI) / 180;

        //scene.add(powerUp);
        blockFunc.createGroup1();
        blockFunc.createGroup2();
        blockFunc.createGroup4();
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
            //child.receiveShadow = true;
          }
          if (child.material) child.material.metalness = 0;
        });
        emptyBlock.castShadow = true;
        emptyBlock.receiveShadow = true;

        //scene.add(emptyBlock);
        blockFunc.createGroupStairs(-60, 4);
        blockFunc.createGroupStairsReverse(-30, 4);
        blockFunc.createGroupStairs(20, 5);
        blockFunc.createGroupStairsReverse(55, 5);
        blockFunc.createGroupStairs(220, 9);
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
        flagpole.position.set(0, 10, 300);
        flagpole.scale.set(10, 10, 10);

        flagpole.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            flagpole.layers.enable(32);
          }
          if (child.material) {
            child.material.metalness = 0;
            child.material.roughness = 0;
          }
        });
        flagpole.castShadow = true;
        flagpole.receiveShadow = true;

        //flagpole.rotation.z = (-45 * Math.PI) / 180;

        scene.add(flagpole);

        //console.log(dumpObject(flagpole).join("\n"));
      });
    }
  }

  scene.add(camera);
  createLandscape();
  createBgSky();
  loadModels();

  /*scene.addEventListener("update", function () {
    scene.simulate(undefined, 2);
  });
  scene.simulate();*/

  function animate() {
    TWEEN.update();
    groupRun.update();
    groupJump.update();
    groupRotate.update();
    camera.lookAt(yoshi.position.x, camera.position.y, yoshi.position.z);
    updateYoshiBoxPosition();

    /* console.log("isJumping = " + isJumping);
    console.log("collidedTop = " + collidedTop);
    console.log("isOnObjectTop = " + isOnObjectTop);*/
    //console.log("collided bottom =  " + collidedBottom);

    //dirLight.position.copy(camera.position); -> serve eventualmente per far muovere la luce quando spostiamo la camera col mouse

    controls.target.set(yoshi.position.x, yoshi.position.y, yoshi.position.z);
    controls.update();

    scene.simulate();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
} //parentesi di init

/*function createBlocks() {
  var brickClone = brick.clone();
  brickClone.position.set(0, 5, -550);
  scene.add(brickClone);
}*/

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
  dir = direction;
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
      //if (!collision) {
      if (direction == "right" && !collidedLeft) {
        yoshi.position.z += 0.2;
        dirLight.position.z += 0.2;
      }
      if (direction == "left" && !collidedRight) {
        yoshi.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }
      //}
      //yoshiBox.__dirtyPosition = true;
      //yoshiBox.__dirtyRotation = false;
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
      //yoshi.position.y = tweenStartScale.y;
      spine.rotation.x = tweenStartScale.spine;
      head.rotation.x = tweenStartScale.head;
      //if (!collision) {
      if (direction == "right" && !collidedLeft) {
        yoshi.position.z += 0.2;
        dirLight.position.z += 0.2;
      }
      if (direction == "left" && !collidedRight) {
        yoshi.position.z -= 0.2;
        dirLight.position.z -= 0.2;
      }
      //}
      //yoshiBox.__dirtyPosition = true;
      //yoshiBox.__dirtyRotation = false;
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
      .to(tweenGoalLeft, 400)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function () {
        torso.rotation.y = tweenStartLeft.y_leftRotation;
        //yoshiBox.__dirtyPosition = true;
        //yoshiBox.__dirtyRotation = false;
      })
      .start();
  }
  if (direction == "right") {
    var tweenRight = new TWEEN.Tween(tweenStartRight, groupRotate)
      .to(tweenGoalRight, 400)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function () {
        torso.rotation.y = tweenStartRight.y_rightRotation;
        //yoshiBox.__dirtyPosition = true;
        //yoshiBox.__dirtyRotation = false;
      })
      .start();
  }
}

/*function setTweenJumpParameters() {
  //metterci tweenstartjump, tweengoaljump, tweengoaljumpback
}*/

function jump() {
  tweenStartJump = {
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
  tweenGoalJump = {
    y: tweenStartJump.y + 29.3, //-3, -15
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
  tweenGoalJumpBack = {
    y: -14.3,
    rightArm_rotation_z: (45 * Math.PI) / 180,
    rightHand_rotation_y: (90 * Math.PI) / 180,
    finger_x: (0 * Math.PI) / 180,
    thumb1_y: (66.5 * Math.PI) / 180,
    thumb2_x: (0 * Math.PI) / 180,

    upperLeg_right: (0 * Math.PI) / 180,
    lowerLeg: (0 * Math.PI) / 180,
    upperLeg_left: (-180 * Math.PI) / 180,
    spine: (0 * Math.PI) / 180,
    head: (0 * Math.PI) / 180,
  };
  tweenStartFlex = {
    upperLeg_right: upperLeg_right.rotation.x,
    upperLeg_left: upperLeg_left.rotation.x,
    lowerLeg: lowerLeg_right.rotation.x,
    spine: spine.rotation.x,
    head: head.rotation.x,
    y: yoshi.position.y,
  };
  tweenGoalFlex = {
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
  tweenFlex = new TWEEN.Tween(tweenStartFlex, groupJump)
    .to(tweenGoalFlex, 200)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      upperLeg_right.rotation.x = tweenStartFlex.upperLeg_right;
      upperLeg_left.rotation.x = tweenStartFlex.upperLeg_left;
      lowerLeg_right.rotation.x = tweenStartFlex.lowerLeg;
      lowerLeg_left.rotation.x = tweenStartFlex.lowerLeg;
      spine.rotation.x = tweenStartFlex.spine;
      head.rotation.x = tweenStartFlex.head;
      if (!collidedTop) {
        yoshi.position.y = tweenStartFlex.y;
      }
      //yoshiBox.__dirtyPosition = true;
      //yoshiBox.__dirtyRotation = false;
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
  tweenJump = new TWEEN.Tween(tweenStartJump, groupJump)
    .to(tweenGoalJump, 1000) //400
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function () {
      if (!collidedTop || isOnObjectTop) {
        yoshi.position.y = tweenStartJump.y;
      }
      if (keysPressed[68] && !collidedLeft) {
        yoshi.position.z += 0.3;
        dirLight.position.z += 0.3;
      }
      if (keysPressed[65] && !collidedRight) {
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
      //yoshiBox.__dirtyPosition = true;
      //yoshiBox.__dirtyRotation = false;
      //fix arm x rotation
      //upperArm_right.rotation.x = (0 * Math.PI) / 180;
    });
  //.start();
  tweenFlex.chain(tweenJump);
  tweenJumpBack = new TWEEN.Tween(tweenStartJump, groupJump)
    .to(tweenGoalJumpBack, 1000) //400
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function () {
      if (!collidedTop || isOnObjectTop) {
        yoshi.position.y = tweenStartJump.y;
      }
      if (keysPressed[68] && !collidedLeft) {
        yoshi.position.z += 0.3;
        dirLight.position.z += 0.3;
      }
      if (keysPressed[65] && !collidedRight) {
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
      //yoshiBox.__dirtyPosition = true;
      //yoshiBox.__dirtyRotation = false;
      //upperArm_right.rotation.x = (0 * Math.PI) / 180;
    })
    .onComplete(function () {
      isJumpingRight = false;
      isJumpingLeft = false;
      isJumping = false;
      collidedRight = false;
      collidedLeft = false;
      //setIdlePosition();
      isOnObjectTop = true;
    });
  tweenJump.chain(tweenJumpBack);
}

/*function fall() {
  tweenStartFall = {
    y: yoshi.position.y,
  };
  tweenGoalFall = {
    y: -14.3,
  };
  tweenFall = new TWEEN.Tween(tweenStartFall)
    .to(tweenGoalFall, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      yoshi.position.y = tweenStartFall.y;
    })
    .onComplete(function () {
      collidedTop = false; //?
      //setIdlePosition();
    })
    .start();
}*/

export function setIdlePosition() {
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

      //yoshiBox.__dirtyPosition = true;
      //yoshiBox.__dirtyRotation = false;
    })
    .start();
}

init();
//window.onload = init;
