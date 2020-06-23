//file js

import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js";

function init() {
  //const canvas = document.querySelector('#c');
  var container = document.getElementById("game"); //-> controllare a che serve
  var renderer = new THREE.WebGLRenderer({
    antialias: true,
  }); //controllare se serve l'antialias
  renderer.setSize(window.innerWidth, window.innerHeight);

  const cameraX = 0;
  const cameraY = 0;
  const cameraZ = 2;

  //camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(cameraX, cameraY, cameraZ);

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

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  {
    const color = 0xffffff;
    const intensity = 5;
    const dirLight = new THREE.DirectionalLight(color, intensity);
    dirLight.position.set(-1, 2, 4);
    scene.add(dirLight);
    const ambientLight = new THREE.AmbientLight(color, intensity);
    scene.add(ambientLight);
  }

  var root = new THREE.Scene();

  {
    const gltfLoader = new GLTFLoader();
    const url = "models/toothless_test_animation/scene.gltf";
    gltfLoader.load(url, (gltf) => {
      root = gltf.scene;
      scene.add(root);
      root.traverse((obj) => {
        if (obj.castShadow !== undefined) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });
    });
  }

  //var ambientLight = new THREE.AmbientLight(color, intensity);
  //scene.add(ambientLight);
  function render(time) {
    time *= 0.001; // convert time to seconds

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

init();
