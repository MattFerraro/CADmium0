import logo from './logo.svg';
import './App.css';

import "@google/model-viewer";
import { visualizeShapes } from "./visualize.js";
import initOpenCascade, { BRepMesh_ModelBuilder } from "opencascade.js";

import { useState, useEffect } from 'react'

function App() {
  const [ modelURL, setModelURL ] = useState("")
  
  useEffect(() => {
    console.log("Starting to import openCascade wasm...")
    initOpenCascade().then((oc) => {
      console.log("wasm is initialized!")
      const sphereSize = .65;
      const box = new oc.BRepPrimAPI_MakeBox_2(1, 1, 1);
      console.log("I have a box!")
      const sphere = new oc.BRepPrimAPI_MakeSphere_5(new oc.gp_Pnt_3(0.5, 0.5, 0.5), sphereSize);
      console.log("I have a sphere!")
      const cut = new oc.BRepAlgoAPI_Cut_3(box.Shape(), sphere.Shape(), new oc.Message_ProgressRange_1());
      console.log("I have cut the sphere out of the box!")
      cut.Build(new oc.Message_ProgressRange_1());
      console.log("I have built the cut geometry")
      const mUrl = visualizeShapes(oc, cut.Shape());
      console.log("I have a visualizable model!")
      setModelURL(mUrl)
    });    
  }, [])


  return (
    <div className="App">
      <div>Model goes here! {modelURL}</div>
      <model-viewer style={{width:600, height:500}} src={modelURL} camera-controls enable-pan />
    </div>
  );
}

export default App;
