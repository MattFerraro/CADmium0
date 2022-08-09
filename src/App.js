import './App.css';

import logo from '../public/logo192.png'

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
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Button variant="contained">Hello World</Button>
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
