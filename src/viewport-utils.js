import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const PI = 3.1415926

export function initScene(canvasID) {
  const canvas = document.getElementById(canvasID)
  const scene = new THREE.Scene();

  const w = canvas.getBoundingClientRect().width
  const h = canvas.getBoundingClientRect().height
  const camera = new THREE.PerspectiveCamera( 75, w / h, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer({canvas:canvas});
  renderer.setClearColor( 0xffffff, 0);
  renderer.setSize( w, h );


  // xy is top
  // xz is front 
  // yz is right 
  const planeMaterial = new THREE.MeshPhongMaterial( {color: 0xcccccc, side: THREE.DoubleSide, depthWrite: false, transparent: true, opacity:0.1} );
  
  const topPlaneGeometry = new THREE.PlaneGeometry( 1, 1 );
  const topPlane = new THREE.Mesh( topPlaneGeometry, planeMaterial );
  scene.add( topPlane );

  const frontPlaneGeometry = new THREE.PlaneGeometry( 1, 1 );
  frontPlaneGeometry.rotateX(PI/2)
  const frontPlane = new THREE.Mesh( frontPlaneGeometry, planeMaterial );
  scene.add( frontPlane );

  const rightPlaneGeometry = new THREE.PlaneGeometry( 1, 1 );
  rightPlaneGeometry.rotateY(PI/2)
  const rightPlane = new THREE.Mesh( rightPlaneGeometry, planeMaterial );
  scene.add( rightPlane );

  camera.position.y = -1;
  camera.position.x = .7;
  camera.position.z = .7;

  const controls = new OrbitControls( camera, renderer.domElement );


  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  };

  animate();

  renderer.render( scene, camera );
  return { renderer, camera, scene }
}
