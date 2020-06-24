//file js

import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";

var head;

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

  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  {
    const color = 0xffffff;
    const intensity = 1;
    var dirLight = new THREE.DirectionalLight(color, intensity);
    dirLight.position.set(-1, 2, 4);
    dirLight.castShadow = true;
    scene.add(dirLight);

    dirLight.shadow.mapSize.width = 512; // default
    dirLight.shadow.mapSize.height = 512; // default
    dirLight.shadow.camera.near = 0.5; // default
    dirLight.shadow.camera.far = 500; // default

    var ambientLight = new THREE.AmbientLight(color, intensity);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    //Set up shadow properties for the light
    ambientLight.shadow.mapSize.width = 512; // default
    ambientLight.shadow.mapSize.height = 512; // default
    ambientLight.shadow.camera.near = 0.5; // default
    ambientLight.shadow.camera.far = 500; // default
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

      head = yoshi.getObjectByName(yoshi_dic.Testa);

      console.log(dumpObject(yoshi).join("\n"));

      scene.add(yoshi);
      requestAnimationFrame(render);
      console.log(head);
    });

    gltfLoader.load(url_world, (gltf) => {
      world = gltf.scene;
      world.name = "world";
      world.position.set(0, 0, -0.75);
      world.receiveShadow = true;
      scene.add(world);
      //requestAnimationFrame(render);
      //console.log(head);
    });
  }

  function render(time) {
    time *= 0.001;
    head.rotation.y = time;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  //requestAnimationFrame(render);
}

init();
