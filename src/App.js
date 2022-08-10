import "./App.css"

import "@google/model-viewer"
import { visualizeShapes, makeBottle } from "./visualize.js"
import initOpenCascade from "opencascade.js"

import { useState, useEffect } from "react"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import AppBarTop from "./AppBarTop"
import ActionBar from "./ActionBar"
import MainViewport from "./MainViewport"

function App() {
  const [modelURL, setModelURL] = useState("nope")
  const [bwidth, setBWidth] = useState(50)
  const [bheight, setBHeight] = useState(70)
  const [bthickness, setBThickness] = useState(30)
  const [oc, setOC] = useState()

  useEffect(() => {
    console.log("Starting to import openCascade wasm...")
    initOpenCascade().then((newOC) => {
      console.log("wasm is initialized!")
      setOC(newOC)
    })
  }, [setOC])

  useEffect(() => {
    if (oc == null) {
      return
    }
    const bottleShape = makeBottle(oc, bwidth, bheight, bthickness)
    const mUrl = visualizeShapes(oc, bottleShape)

    setModelURL(mUrl)
  }, [oc, bwidth, bheight, bthickness])

  return (
    <div className="App">
      <AppBarTop></AppBarTop>
      <ActionBar></ActionBar>

      <div style={{ width: "100vw", background: "#EEEEEE", display: "flex" }}>
        <div style={{ width: "20vw", background: "#FFFFFF", padding: "10px" }}>
          <div>
            Width
            <input
              type="range"
              min="20"
              max="100"
              step="1"
              value={bwidth}
              onChange={(e) => setBWidth(e.target.value)}
              className="slider"
              id="myRange"
            ></input>
          </div>

          <div>
            Height
            <input
              type="range"
              min="50"
              max="120"
              step="1"
              value={bheight}
              onChange={(e) => setBHeight(e.target.value)}
              className="slider"
              id="myRange"
            ></input>
          </div>

          <div>
            Depth
            <input
              type="range"
              min="15"
              max="50"
              step="1"
              value={bthickness}
              onChange={(e) => setBThickness(e.target.value)}
              className="slider"
              id="myRange"
            ></input>
          </div>
        </div>
        <div style={{ width: "80vw", background: "#FFFFFF" }}>
          {modelURL === "nope" && (
            <div style={{ width: "100%", height: 600, background: "#BBBBBB" }}>
              Please wait--loading OpenCascade wasm
            </div>
          )}
          {modelURL !== "nope" && <MainViewport></MainViewport>}
        </div>
      </div>
    </div>
  )
}

export default App
