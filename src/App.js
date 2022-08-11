import "./App.css"

import "@google/model-viewer"
// import { visualizeShapes, makeBottle } from "./visualize.js"
// import initOpenCascade from "opencascade.js"

import { useState, useEffect } from "react"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import AppBarTop from "./AppBarTop"
import ActionBar from "./ActionBar"
import MainViewport from "./MainViewport"
import DocTree from "./DocTree"

import { initDoc } from "./docUtils"
import SketchPrompt from "./SketchPrompt"

function App() {
  // const [modelURL, setModelURL] = useState("nope")
  // const [bwidth, setBWidth] = useState(50)
  // const [bheight, setBHeight] = useState(70)
  // const [bthickness, setBThickness] = useState(30)
  const [oc, setOC] = useState("nope")
  const [doc, setDoc] = useState(initDoc())
  const [activeAction, setActiveAction] = useState("")

  useEffect(() => {
    console.log("Starting to import openCascade wasm...")
    // initOpenCascade().then((newOC) => {
    console.log("wasm is initialized!")
    // setOC(newOC)
    // })
    setOC("not null!")
  }, [setOC])

  // useEffect(() => {
  //   if (oc == null) {
  //     return
  //   }
  //   const bottleShape = makeBottle(oc, bwidth, bheight, bthickness)
  //   const mUrl = visualizeShapes(oc, bottleShape)

  //   setModelURL(mUrl)
  // }, [oc, bwidth, bheight, bthickness])

  useEffect(() => {
    console.log("action:", activeAction)
  }, [activeAction])

  const renderPrompt = () => {
    switch (activeAction) {
      case "new-sketch":
        return <SketchPrompt></SketchPrompt>
      case "":
        return <div>No prompt</div>
    }
  }

  return (
    <div className="App">
      <AppBarTop></AppBarTop>
      <ActionBar setActiveAction={setActiveAction}></ActionBar>

      <div style={{ width: "100vw", background: "#EEEEEE", display: "flex" }}>
        <div style={{ width: "20vw", background: "#FFFFFF", padding: "10px" }}>
          <DocTree doc={doc}></DocTree>
          {renderPrompt()}
        </div>
        <div style={{ width: "80vw", background: "#FFFFFF" }}>
          {oc === "nope" && (
            <div style={{ width: "100%", height: 600, background: "#BBBBBB" }}>
              Please wait--loading OpenCascade wasm
            </div>
          )}
          {oc !== "nope" && (
            <MainViewport doc={doc} activeAction={activeAction}></MainViewport>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
