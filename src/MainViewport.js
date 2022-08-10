import Box from '@mui/material/Box';
import { useEffect } from 'react';
import * as THREE from 'three';


function AppBarTop() {

  useEffect(() => {
    const canvas = document.getElementById("main-viewport-canvas")
    const scene = new THREE.Scene();

    const w = canvas.getBoundingClientRect().width
    const h = canvas.getBoundingClientRect().height
    const camera = new THREE.PerspectiveCamera( 75, w / h, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer({canvas:canvas});
    renderer.setSize( w, h );
    // document.body.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame( animate );

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render( scene, camera );
    };

    animate();
  }, [])

  return (
    <div className="AppBarTop">
      <Box sx={{ flexGrow: 1 }}>
        <div id="main-viewport" style={{width:'100%', height:'600px', background: 'white'}}>
          <canvas id="main-viewport-canvas" style={{width:'100%', height:'100%', border: '1px solid red'}}></canvas>
        </div>
      </Box>
    </div>
  );
}

export default AppBarTop;
