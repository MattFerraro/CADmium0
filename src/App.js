import './App.css';

import "@google/model-viewer";
import { visualizeShapes } from "./visualize.js";
import initOpenCascade from "opencascade.js";

import { useState, useEffect } from 'react'

function App() {
  const [ modelURL, setModelURL ] = useState("")
  const [ radius, setRadius ] = useState(0.65)
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

    console.log("oc is not null!")
    console.log("radius: ", radius)

    const box = new oc.BRepPrimAPI_MakeBox_2(1, 1, 1);
    const sphere = new oc.BRepPrimAPI_MakeSphere_5(new oc.gp_Pnt_3(0.5, 0.5, 0.5), radius);
    const cut = new oc.BRepAlgoAPI_Cut_3(box.Shape(), sphere.Shape(), new oc.Message_ProgressRange_1());
    cut.Build(new oc.Message_ProgressRange_1());
    const mUrl = visualizeShapes(oc, cut.Shape());
    setModelURL(mUrl)
  }, [oc, radius])


  return (
    <div className="App">
      <div>Model goes here! {modelURL}</div>
      <input type="range" min="0.55" max=".80" step="0.01" value={radius} onChange={e => setRadius(e.target.value)} className="slider" id="myRange"></input>
      <model-viewer style={{width:600, height:500}} src={modelURL} camera-controls enable-pan />
    </div>
  );
}

export default App;
