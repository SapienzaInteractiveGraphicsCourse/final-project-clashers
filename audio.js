import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";

var audioLoader = new THREE.AudioLoader();
audioLoader.load("audio/Super Mario Bros. Soundtrack.mp3", function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
});
