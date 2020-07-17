//file js
"use strict";

import * as THREE from "./build/three.js-master/build/three.module.js";
import { GLTFLoader } from "./build/three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "./build/three.js-master/examples/jsm/controls/OrbitControls.js";
import TWEEN from "./build/tween.js-master/dist/tween.esm.js";
import * as collFunc from "./collisions.js";
import * as blockFunc from "./blocks.js";
import * as tweenFunc from "./tween_functions.js";

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
  //renderer.shadowMap.cullFace = THREE.CullFaceBack;

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

  if (sessionStorage.getItem("yoshiPressed") == "true") {
    character = "yoshi";
  }
  if (sessionStorage.getItem("luigiPressed") == "true") {
    character = "luigi";
  }
  if (sessionStorage.getItem("marioPressed") == "true") {
    character = "mario";
  }

  function loadCharacters(character) {
    if (character == "yoshi") {
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
          keyboard(yoshi);
          //}

          /*document.addEventListener("keydown", (event) => {
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
                  tweenFunc.rotateTorso("right");
                  isRotatedRight = true;
                }
                if (!dPressed && isWalking && !collision) {
                  //collision = false;
                  tweenFunc.performAnimation("right");
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
                  tweenFunc.rotateTorso("left");
                  isRotatedRight = false;
                }
                if (!aPressed && isWalking) {
                  tweenFunc.performAnimation("left");
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
                  tweenFunc.setIdlePosition();
                  tweenFunc.jump();
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
                  tweenFunc.performAnimation("left");
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
                tweenFunc.setIdlePosition();
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
                    tweenFunc.rotateTorso("right");
                    isRotatedRight = true;
                  }
                  //if (!dPressed && isWalking) { --> se commento questa riga risolvo il problema
                  tweenFunc.performAnimation("right");
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
                tweenFunc.setIdlePosition();
                break;

              case 32:
                spacePressed = false;
                //isJumping = false;
                tweenFunc.setIdlePosition();
                break;
            }
          });*/
          setYoshiGeometry();
          tweenFunc.setAnimationParameters();
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

          dirLight.target = mario;
          scene.add(mario);
          keyboard(mario);
          tweenFunc.setAnimationParameters();
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
          spine = luigi.getObjectByName(luigi_dic.Spine);

          //right_arm related bones
          handRight = luigi.getObjectByName(luigi_dic.Hand_right);
          thumb1_right = luigi.getObjectByName(luigi_dic.Thumb1_right);
          thumb2_right = luigi.getObjectByName(luigi_dic.Thumb2_right);
          finger1_right = luigi.getObjectByName(luigi_dic.Finger1_right);
          finger1_2_right = luigi.getObjectByName(luigi_dic.Finger1_2_right);
          finger2_right = luigi.getObjectByName(luigi_dic.Finger2_right);
          finger2_2_right = luigi.getObjectByName(luigi_dic.Finger2_2_right);
          finger3_right = luigi.getObjectByName(luigi_dic.Finger3_right);
          finger3_2_right = luigi.getObjectByName(luigi_dic.Finger3_2_right);
          //var finger4_right = luigi.getObjectByName(luigi_dic.Finger4_right);
          /*var finger4_2_right = luigi.getObjectByName(
            luigi_dic.Finger4_2_right
          );*/

          //left_arm related bones
          handLeft = luigi.getObjectByName(luigi_dic.Hand_left);
          thumb1_left = luigi.getObjectByName(luigi_dic.Thumb1_left);
          thumb2_left = luigi.getObjectByName(luigi_dic.Thumb2_left);
          finger1_left = luigi.getObjectByName(luigi_dic.Finger1_left);
          finger1_2_left = luigi.getObjectByName(luigi_dic.Finger1_2_left);
          finger2_left = luigi.getObjectByName(luigi_dic.Finger2_left);
          finger2_2_left = luigi.getObjectByName(luigi_dic.Finger2_2_left);
          finger3_left = luigi.getObjectByName(luigi_dic.Finger3_left);
          finger3_2_left = luigi.getObjectByName(luigi_dic.Finger3_2_left);
          //var finger4_left = luigi.getObjectByName(luigi_dic.finger4_left);
          //var finger4_2_left = luigi.getObjectByName(luigi_dic.finger4_2_left);

          //left_leg related bones
          upperLeg_left = luigi.getObjectByName(luigi_dic.UpperLeg_left);
          lowerLeg_left = luigi.getObjectByName(luigi_dic.LowerLeg_left);
          upperLeg_right = luigi.getObjectByName(luigi_dic.UpperLeg_right);
          lowerLeg_right = luigi.getObjectByName(luigi_dic.LowerLeg_right);

          upperArm_right.rotation.z = (45 * Math.PI) / 180; //-60
          upperArm_left.rotation.z = (45 * Math.PI) / 180;
          upperArm_right.rotation.x = (0 * Math.PI) / 180; //0
          upperArm_left.rotation.x = (0 * Math.PI) / 180;
          upperLeg_right.rotation.x = (0 * Math.PI) / 180;
          upperLeg_left.rotation.x = (-180 * Math.PI) / 180;

          thumb1_left.rotation.y = (90 * Math.PI) / 180;
          thumb2_left.rotation.x = (135 * Math.PI) / 180;
          finger1_left.rotation.x = (-90 * Math.PI) / 180;
          finger1_2_left.rotation.x = (-90 * Math.PI) / 180;
          finger2_left.rotation.x = (-90 * Math.PI) / 180;
          finger2_2_left.rotation.x = (-90 * Math.PI) / 180;
          finger3_left.rotation.x = (-90 * Math.PI) / 180;
          finger3_2_left.rotation.x = (-90 * Math.PI) / 180;
          //finger4_left.rotation.x = (-90 * Math.PI) / 180;
          //finger4_2_left.rotation.x = (-90 * Math.PI) / 180;

          thumb1_right.rotation.y = (90 * Math.PI) / 180;
          thumb2_right.rotation.x = (135 * Math.PI) / 180;
          finger1_right.rotation.x = (-90 * Math.PI) / 180;
          finger1_2_right.rotation.x = (-90 * Math.PI) / 180;
          finger2_right.rotation.x = (-90 * Math.PI) / 180;
          finger2_2_right.rotation.x = (-90 * Math.PI) / 180;
          finger3_right.rotation.x = (-90 * Math.PI) / 180;
          finger3_2_right.rotation.x = (-90 * Math.PI) / 180;
          //finger4_right.rotation.x = (-90 * Math.PI) / 180;
          //finger4_2_right.rotation.x = (-90 * Math.PI) / 180;

          dirLight.target = luigi;
          scene.add(luigi);
          keyboard(luigi);
          tweenFunc.setAnimationParameters();
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
          //collidedRight = false;
          isWalking = true;
          if (!isRotatedRight) {
            //TWEEN.removeAll();
            groupRun.removeAll(); //altrimenti rimane fermo ma le gamebe si muovono
            //tween.stop();
            groupRotate.removeAll();
            tweenFunc.rotateTorso("right");
            isRotatedRight = true;
          }
          if (!dPressed && isWalking && !collision) {
            //collision = false;
            tweenFunc.performAnimation("right", character);
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
            tweenFunc.rotateTorso("left");
            isRotatedRight = false;
          }
          if (!aPressed && isWalking) {
            tweenFunc.performAnimation("left", character);
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
            tweenFunc.setIdlePosition();
            tweenFunc.jump(character);
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
              tweenFunc.rotateTorso("left");
              isRotatedRight = false;
            }
            //if (!aPressed && isWalking) {
            tweenFunc.performAnimation("left", character);
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
          tweenFunc.setIdlePosition();
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
              tweenFunc.rotateTorso("right");
              isRotatedRight = true;
            }
            //if (!dPressed && isWalking) { --> se commento questa riga risolvo il problema
            tweenFunc.performAnimation("right", character);
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
          tweenFunc.setIdlePosition();
          break;

        case 32:
          spacePressed = false;
          //isJumping = false;
          tweenFunc.setIdlePosition();
          break;
      }
    });
  }

  //yoshi = new THREE.Scene();

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
            child.receiveShadow = true;
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
        //coin.receiveShadow = true;

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
            child.receiveShadow = true;
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
  loadCharacters(character);
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
    if (character == "yoshi") {
      camera.lookAt(yoshi.position.x, camera.position.y, yoshi.position.z);
      controls.target.set(yoshi.position.x, yoshi.position.y, yoshi.position.z);
    }
    if (character == "mario") {
      camera.lookAt(mario.position.x, camera.position.y, mario.position.z);
      controls.target.set(mario.position.x, mario.position.y, mario.position.z);
    }
    if (character == "luigi") {
      camera.lookAt(luigi.position.x, camera.position.y, luigi.position.z);
      controls.target.set(luigi.position.x, luigi.position.y, luigi.position.z);
    }
    //camera.lookAt(yoshi.position.x, camera.position.y, yoshi.position.z);
    updateYoshiBoxPosition();

    initializeGoombaArray();
    /* console.log("isJumping = " + isJumping);
    console.log("collidedTop = " + collidedTop);
    console.log("isOnObjectTop = " + isOnObjectTop);*/
    //console.log("collided bottom =  " + collidedBottom);

    //dirLight.position.copy(camera.position); -> serve eventualmente per far muovere la luce quando spostiamo la camera col mouse

    //controls.target.set(yoshi.position.x, yoshi.position.y, yoshi.position.z);
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

init();
//window.onload = init;
