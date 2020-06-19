//file js

var fov = 75;
var aspect = 2;
var near = 0.1;
var far = 5;

var cameraX = 0;
var cameraY = 0;
var cameraZ = 2;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(cameraX, cameraY, cameraZ);

    
}