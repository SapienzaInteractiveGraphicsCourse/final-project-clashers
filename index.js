//file js

import * as THREE from './build/three.module.js';

var fov = 75;
var aspect = 2;
var near = 0.1;
var far = 5;

var cameraX = 0;
var cameraY = 0;
var cameraZ = 2;

const color = 0xFFFFFF;
const intensity = 1;

//cubo di prova
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(cameraX, cameraY, cameraZ);

    //var container = document.getElementById('game'); -> controllare a che serve

    renderer = new THREE.WebGLRenderer({
        canvas
    }); //controllare se serve l'antialias

    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshBasicMaterial({
        color: 0x44aa88
    });

    const cube = new THREE.Mesh(geometry,material);
    scene.add(cube);

    var dirLight = new THREE.DirectionalLight(color, intensity);
    dirLight.position.set(-1, 2, 4);
    scene.add(dirLight);

    var ambientLight = new THREE.AmbientLight(color, intensity);
    scene.add(ambientLight);

    renderer.render(scene, camera);
}

init();