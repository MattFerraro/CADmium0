import './App.css';

import "@google/model-viewer";
import { visualizeShapes, makeBottle } from "./visualize.js";
import initOpenCascade from "opencascade.js";

import { useState, useEffect } from 'react'

function App() {
  const [ modelURL, setModelURL ] = useState("")
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

    // const box = new oc.BRepPrimAPI_MakeBox_2(1, 1, 1);
    // const sphere = new oc.BRepPrimAPI_MakeSphere_5(new oc.gp_Pnt_3(0.5, 0.5, 0.5), radius);
    // const cut = new oc.BRepAlgoAPI_Cut_3(box.Shape(), sphere.Shape(), new oc.Message_ProgressRange_1());
    // cut.Build(new oc.Message_ProgressRange_1());
    // const mUrl = visualizeShapes(oc, cut.Shape());
    // setModelURL(mUrl)

    const bottleShape = makeBottle(oc, bwidth, bheight, bthickness)
    const mUrl = visualizeShapes(oc, bottleShape);
    setModelURL(mUrl)

  }, [oc, bwidth, bheight, bthickness])


  return (
    <div className="App">
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
      <model-viewer style={{width:600, height:500}} src={modelURL} camera-controls enable-pan />
    </div>
  );
}

export default App;
