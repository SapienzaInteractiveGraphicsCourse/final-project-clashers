//file js

import TWEEN from "https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js";
import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";

var head;
var scene;
var upperArm_right;
var upperArm_left;
var upperLeg_right;
var upperLeg_left;

function init() {
  //const canvas = document.querySelector('#c');
  var container = document.getElementById("game"); //-> controllare a che serve

  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  var renderer = new THREE.WebGLRenderer({
    antialias: true,
  }); //controllare se serve l'antialias
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  renderer.setSize(window.innerWidth, window.innerHeight);

  const cameraX = 0;
  const cameraY = 10;
  const cameraZ = 50;

  var controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(cameraX, cameraY, cameraZ);
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
    var dirLight = new THREE.DirectionalLight(color, intensity, 100);
    dirLight.position.set(0, 100, 0);
    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 512; // default
    dirLight.shadow.mapSize.height = 512; // default
    dirLight.shadow.camera.near = 0.5; // default
    dirLight.shadow.camera.far = 500; // default
    dirLight.shadow.camera.fov = 50;
    dirLight.shadow.bias = 0.0039;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    scene.add(dirLight);

    var ambientLight = new THREE.AmbientLight(color, intensity);
    scene.add(ambientLight);
  }

  var yoshi = new THREE.Scene();
  {
    const gltfLoader = new GLTFLoader();
    const url_yoshi = "models/yoshi_mario_party_10/scene.gltf";

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

      var head = yoshi.getObjectByName(yoshi_dic.Head);
      //var spine = yoshi.getObjectByName(yoshi_dic.Spine);
      console.log(dumpObject(yoshi).join("\n"));
      upperArm_right = yoshi.getObjectByName(yoshi_dic.UpperArm_right);
      upperArm_left = yoshi.getObjectByName(yoshi_dic.UpperArm_left);
      upperLeg_right = yoshi.getObjectByName(yoshi_dic.UpperLeg_right);
      upperLeg_left = yoshi.getObjectByName(yoshi_dic.UpperLeg_left);
      upperArm_right.rotation.z = 45;
      upperArm_left.rotation.z = 45;
      upperLeg_right.rotation.x = (0 * Math.PI) / 180;
      upperLeg_left.rotation.x = (180 * Math.PI) / 180;
      console.log(upperArm_right.rotation);

      scene.add(yoshi);

      document.addEventListener("keydown", onDocumentKeyDown, false);
      function onDocumentKeyDown(event) {
        var keyCode = event.keyCode;
        if (keyCode == 65) {
          yoshi.position.x += 0.5;
        } else if (keyCode == 68) {
          yoshi.position.x -= 0.5;
        } else if (keyCode == 87) {
          yoshi.position.z += 0.5;
          //upperLeg_left.rotation.x += 5;
          //performAnimation();
        } else if (keyCode == 83) {
          yoshi.position.z -= 0.5;
        }
      }
      //animate();
      setAnimationParameters();
      //animate();
      requestAnimationFrame(animate);
      //requestAnimationFrame(animate);
    });
  }

  scene.add(camera);
  CreateLandscape();

  /* function render(time) {
    time *= 0.001;
    //head.rotation.y = time;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    requestAnimationFrame(animate);
    TWEEN.update(time);
  }*/

  function animate(time) {
    //time *= 0.001;
    controls.update();
    renderer.render(scene, camera);
    //performAnimation();
    requestAnimationFrame(animate);
    //if (time < 2000) console.log(time);
    TWEEN.update(time);
  }
  requestAnimationFrame(animate);
}

var Landscape = function () {
  var geometry = new THREE.BoxGeometry(window.innerWidth, 1, window.innerWidth);
  var texture = new THREE.TextureLoader().load("img/desert.jpg");
  var material = new THREE.MeshPhongMaterial({
    map: texture,
    color: 0xd2b48c,
  });
  this.mesh = new THREE.Mesh(geometry, material);
  this.mesh.receiveShadow = true;
};

var landscape;
function CreateLandscape() {
  landscape = new Landscape();
  landscape.mesh.position.y = -6;
  scene.add(landscape.mesh);
}

// @input vec3 startScale = {1.0, 1.0, 1.0}
// @input vec3 goalScale = {2.0, 2.0, 2.0}
// @input float time = 1.0

var tweenStartScale;
var tweenGoalScale;
var tweenBackScale;
//var tween;

function setAnimationParameters() {
  tweenStartScale = {
    x_left: upperLeg_left.rotation.x,
    x_right: upperLeg_right.rotation.x,
    //y: upperLeg_left.rotation.y,
    //z: upperLeg_left.rotation.z,
  };
  tweenGoalScale = {
    x_left: (-225 * Math.PI) / 180,
    x_right: (45 * Math.PI) / 180,
    //y: upperLeg_left.rotation.y,
    //z: upperLeg_left.rotation.z,
  };
  tweenBackScale = {
    x_left: (-135 * Math.PI) / 180,
    x_right: (-45 * Math.PI) / 180,
  };
  performAnimation();
}

// Tween that moves from start scale <-> end scale
// Bouncing back and forth infinitely
function performAnimation() {
  var tween = new TWEEN.Tween(tweenStartScale)
    .to(tweenGoalScale, 1000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      //updateRotation(tweenStartScale);
      upperLeg_left.rotation.x = tweenStartScale.x_left;
      upperLeg_right.rotation.x = tweenStartScale.x_right;
    })
    .start();

  var tweenBack = new TWEEN.Tween(tweenStartScale)
    .to(tweenBackScale, 1000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      //updateRotation(tweenStartScale);
      upperLeg_left.rotation.x = tweenStartScale.x_left;
      upperLeg_right.rotation.x = tweenStartScale.x_right;

      //console.log("function:animate, tweenStartScale is " + tweenStartScale.x);
    })
    .yoyo(true)
    .repeat(Infinity);
  tween.chain(tweenBack);
}
// Here's were the values returned by the tween are used
// to drive the transform of the SceneObject
function updateRotation(scale) {
  console.log("i'm in updateRotation function");
  upperLeg_left.rotation.x = scale.x;
  console.log("upperLeg_left is " + upperLeg_left.rotation.x);
  //upperLeg_left.rotation.y = scale.y;
  //upperLeg_left.rotation.z = scale.z;
}

// On update, update the Tween engine
/*function onUpdateEvent() {
  TWEEN.update();
}

// Bind an update event
var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdateEvent);
*/
/*function animateVector3(vectorToAnimate, target, options) {
  options = options || {};
  // get targets from options or set to defaults
  var to = target || THREE.Vector3(),
    easing = options.easing || TWEEN.Easing.Quadratic.In,
    duration = options.duration || 2000;
  // create the tween
  var tweenVector3 = new TWEEN.Tween(vectorToAnimate)
    .to({ x: to.x, y: to.y, z: to.z }, duration)
    .easing(easing)
    .onUpdate(function (d) {
      if (options.update) {
        options.update(d);
      }
    })
    .onComplete(function () {
      if (options.callback) options.callback();
    });
  // start the tween
  tweenVector3.start();
  // return the tween in case we want to manipulate it later on
  return tweenVector3;
}

function animate(time) {
  time = 1000;
  var target = new THREE.Vector3(25, 0, 0); // create on init
  animateVector3(upperLeg_left.rotation, target, {
    duration: 1000,

    easing: TWEEN.Easing.Quadratic.InOut,

    update: function (d) {
      console.log("Updating: " + d);
    },

    callback: function () {
      console.log("Completed");
    },
  });
  console.log(upperLeg_left.rotation);
  requestAnimationFrame(animate);
  TWEEN.update(time);
}*/

init();
//animate();
