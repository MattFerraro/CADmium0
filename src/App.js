import './App.css';

import sketch from './svgs/sketch_min.svg'
import extrude from './svgs/extrude_min.svg'
import fillet from './svgs/fillet_min.svg'
import chamfer from './svgs/chamfer_min.svg'
import draft from './svgs/draft_min.svg'
import hole from './svgs/hole_min.svg'
import loft from './svgs/loft_min.svg'
import mirrorBody from './svgs/mirrorBody_min.svg'
import patternLinear from './svgs/patternLinear_min.svg'
import patternRadial from './svgs/patternRadial_min.svg'
import plane from './svgs/plane_min.svg'
import revolve from './svgs/revolve_min.svg'
import scale from './svgs/scale_min.svg'
import shell from './svgs/shell_min.svg'
import sweep from './svgs/sweep_min.svg'
import boolean from './svgs/boolean_min.svg'

import "@google/model-viewer";
import { visualizeShapes, makeBottle } from "./visualize.js";
import initOpenCascade from "opencascade.js";

import { useState, useEffect } from 'react'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const actionIconWidth = 35

function App() {
  const [ modelURL, setModelURL ] = useState("nope")
  const [ bwidth, setBWidth ] = useState(50)
  const [ bheight, setBHeight ] = useState(70)
  const [ bthickness, setBThickness ] = useState(30)
  const [ oc, setOC ] = useState()
  
  useEffect(() => {
    console.log("Starting to import openCascade wasm...")
    initOpenCascade().then((newOC) => {
      console.log("wasm is initialized!")
      setOC(newOC)
    });
  }, [setOC])

  useEffect(() => {
    if (oc == null) {
      return
    }
    const bottleShape = makeBottle(oc, bwidth, bheight, bthickness)
    const mUrl = visualizeShapes(oc, bottleShape);
    
    setModelURL(mUrl)

  }, [oc, bwidth, bheight, bthickness])


  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='grey' elevation={0}>
          <Toolbar variant='dense'>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Cadmium.parts
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='grey' elevation={0}>
          <Toolbar variant='dense'>
            <IconButton
              size="small"
              color="inherit"
              aria-label="sketch"
            >
              <img src={sketch} alt='sketch' height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>
            
            <IconButton
              size="small"
              color="inherit"
              aria-label="extrude"
            >
              <img src={extrude} alt="extrude" height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>
            
            <IconButton
              size="small"
              color="inherit"
              aria-label="revolve"
            >
              <img src={revolve} alt="revolve" height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>

            <IconButton
              size="small"
              color="inherit"
              aria-label="sweep"
            >
              <img src={sweep} alt="sweep" height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>

            <IconButton
              size="small"
              color="inherit"
              aria-label="loft"
            >
              <img src={loft} alt="loft" height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>
            
            <IconButton
              size="small"
              color="inherit"
              aria-label="fillet"
            >
              <img src={fillet} alt="fillet" height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>

            <IconButton
              size="small"
              color="inherit"
              aria-label="chamfer"
            >
              <img src={chamfer} alt="chamfer" height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>
            
            <IconButton
              size="small"
              color="inherit"
              aria-label="draft"
            >
              <img src={draft} alt="draft" height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>

            <IconButton
              size="small"
              color="inherit"
              aria-label="shell"
            >
              <img src={shell} alt="shell" height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>

            <IconButton
              size="small"
              color="inherit"
              aria-label="hole"
            >
              <img src={hole} alt="hole" height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>


            <IconButton
              size="small"
              color="inherit"
              aria-label="patternLinear"
            >
              <img src={patternLinear} alt="patternLinear" height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>

            <IconButton
              size="small"
              color="inherit"
              aria-label="patternRadial"
            >
              <img src={patternRadial} alt="patternRadial" height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>

            <IconButton
              size="small"
              color="inherit"
              aria-label="mirrorBody"
            >
              <img src={mirrorBody} alt="mirrorBody" height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>

            <IconButton
              size="small"
              color="inherit"
              aria-label="boolean"
            >
              <img src={boolean} alt="boolean" height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>

            <IconButton
              size="small"
              color="inherit"
              aria-label="scale"
            >
              <img src={scale} alt="scale" height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>

            <IconButton
              size="small"
              color="inherit"
              aria-label="plane"
            >
              <img src={plane} alt="plane" height={actionIconWidth} width={actionIconWidth}/>
            </IconButton>

          </Toolbar>
        </AppBar>
      </Box>

      <div>
        Width
        <input type="range" min="20" max="100" step="1" value={bwidth} onChange={e => setBWidth(e.target.value)} className="slider" id="myRange"></input>
      </div>
      
      <div>
        Height
        <input type="range" min="50" max="120" step="1" value={bheight} onChange={e => setBHeight(e.target.value)} className="slider" id="myRange"></input>
      </div>
      <div>
        Thickness
        <input type="range" min="15" max="50" step="1" value={bthickness} onChange={e => setBThickness(e.target.value)} className="slider" id="myRange"></input>
      </div>
      { modelURL === "nope" && <div style={{width:600, height:500, background:'#BBBBBB'}}>Please wait--loading OpenCascade wasm</div> }
      { modelURL !== "nope" && <model-viewer style={{width:600, height:500}} src={modelURL} camera-controls enable-pan /> }
      
    </div>
  );
}

export default App;
