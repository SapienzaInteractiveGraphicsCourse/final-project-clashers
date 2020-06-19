//file js

//import * as THREE from './build/three.module.js';

function init() {
    //const canvas = document.querySelector('#c');
    var container = document.getElementById('game');
    
    renderer = new THREE.WebGLRenderer({
        antialias: true
    }); //controllare se serve l'antialias

    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;

    const cameraX = 0;
    const cameraY = 0;
    const cameraZ = 2;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(cameraX, cameraY, cameraZ);

    //var container = document.getElementById('game'); -> controllare a che serve

    const scene = new THREE.Scene();

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const dirLight = new THREE.DirectionalLight(color, intensity);
        dirLight.position.set(-1, 2, 4);
        scene.add(dirLight);
    }

    //cubo di prova
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshPhongMaterial({
        color: 0x44aa88
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    


    //var ambientLight = new THREE.AmbientLight(color, intensity);
    //scene.add(ambientLight);
    function render(time) {
        time *= 0.001; // convert time to seconds

        cube.rotation.x = time;
        cube.rotation.y = time;

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);


}

init();