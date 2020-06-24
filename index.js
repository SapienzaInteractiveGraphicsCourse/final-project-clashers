//file js

import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";

var head;
var scene;

function init() {
  //const canvas = document.querySelector('#c');
  var container = document.getElementById("game"); //-> controllare a che serve
  var renderer = new THREE.WebGLRenderer({
    antialias: true,
  }); //controllare se serve l'antialias
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  renderer.setSize(window.innerWidth, window.innerHeight);

  const cameraX = 0;
  const cameraY = 10;
  const cameraZ = 50;

  //camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  /*var camera = new THREE.OrthographicCamera(
    /*width / -2,
    width / 2,
    height / 2,
    height / -2,
    -50,
    50,
    50,
    -50,
    1,
    1000
  );*/

  var controls = new OrbitControls(camera, renderer.domElement);

  //controls.update() must be called after any manual changes to the camera's transform
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
    const color = 0xffffff;
    const intensity = 0.5;
    var dirLight = new THREE.DirectionalLight(color, intensity);
    dirLight.position.set(0, 5, 0);
    /*dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = window.devicePixelRatio; // default
    dirLight.shadow.mapSize.height = window.devicePixelRatio; // default

    dirLight.shadow.camera = new THREE.OrthographicCamera(
      -10,
      10,
      10,
      -10,
      0.5,
      1000
    );
    dirLight.shadow.camera.near = 0.5; // default
    dirLight.shadow.camera.far = 8000; // default
    dirLight.shadow.camera.fov = 30;*/

    scene.add(dirLight);

    var ambientLight = new THREE.AmbientLight(color, intensity);
    scene.add(ambientLight);

    var shadowLight = new THREE.PointLight(0xffffff, 1, 0, 2);
    shadowLight.position.set(0, 100, 30);
    shadowLight.castShadow = true;
    shadowLight.shadowDarkness = 1;
    shadowLight.shadow.camera.left = -100;
    shadowLight.shadow.camera.right = 100;
    shadowLight.shadow.camera.top = 100;
    shadowLight.shadow.camera.bottom = -100;
    shadowLight.shadow.camera.near = 0.1;
    shadowLight.shadow.camera.far = 1000;
    scene.add(shadowLight);
  }

  var yoshi = new THREE.Scene();
  var world = new THREE.Scene();

  {
    const gltfLoader = new GLTFLoader();
    const url_yoshi = "models/yoshi_mario_party_10/scene.gltf";
    const url_world = "models/world/scene.gltf";

    gltfLoader.load(url_yoshi, (gltf) => {
      yoshi = gltf.scene;
      yoshi.name = "yoshi";
      yoshi.position.set(0, 0, -0.75);
      yoshi.scale.set(0.3, 0.3, 0.3);
      yoshi.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      //yoshi.castShadow = true;
      //yoshi.receiveShadow = false;

      head = yoshi.getObjectByName(yoshi_dic.Testa);

      console.log(dumpObject(yoshi).join("\n"));

      scene.add(yoshi);
      requestAnimationFrame(render);
      //console.log(head);
    });
  }

  scene.add(camera);
  CreateLandscape();

  function render(time) {
    time *= 0.001;
    head.rotation.y = time;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  //requestAnimationFrame(render);
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

init();
