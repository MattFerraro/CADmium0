import Box from '@mui/material/Box';
import { useEffect } from 'react';

import { initScene } from './viewport-utils'

function MainViewport() {
  useEffect(() => {
    initScene("main-viewport-canvas")
    
  }, [])

  // TODO: Figure out how to do the right thing on window resize!
  // const onSizeChange = () => {
  //   console.log("size changed!")
  // }
  // window.addEventListener('resize', onSizeChange)

  return (
    <div className="main-viewport-container">
      <Box sx={{ flexGrow: 1 }}>
        <div id="main-viewport" style={{width:'100%', height:'600px', background: 'white'}}>
          <canvas id="main-viewport-canvas" style={{width:'100%', height:'100%', border: '1px solid red'}}></canvas>
        </div>
      </Box>
    </div>
  );
}

export default MainViewport;
