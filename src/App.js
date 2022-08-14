import "./App.css"

import "@google/model-viewer"
import initOpenCascade from "opencascade.js"
// import opencascade from './customBuild/customBuild.examples.js';
// import opencascadeWasm from './customBuild/customBuild.examples.wasm';

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

import { History } from './features/history/History';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectHistory,
} from './features/history/historySlice';
import { makePlane } from "./occtUtils";

function App() {
  const [oc, setOC] = useState()
  const [doc, setDoc] = useState({})
  const [activeAction, setActiveAction] = useState("")
  const [selection, setSelection] = useState([])

  console.log("app render")

  const history = useSelector(selectHistory);
  const [occtState, setOcctState] = useState({ planes: [], points: [] })

  useEffect(() => {
    console.log("Starting to import openCascade wasm...")
    const startTime = new Date();
    initOpenCascade({
    }).then((newOC) => {
      console.log("wasm is initialized!")
      const endTime = new Date();
      const delta = endTime - startTime
      console.log(delta)
      setOC(newOC)
    }).catch(err => {
      console.log(err)
    })
  }, [setOC])

  useEffect(() => {
    if (!oc) { return }
    const newState = {
      planes: [],
      points: [],
    }
    for (let i = 0; i < history.length; i++) {
      const action = history[i]
      if (action.type === "newPlane") {
        const newPlane = makePlane(oc, action)
        newState.planes.push(newPlane)
      }
    }
    setOcctState(newState)
  }, [oc, history])

  const renderPrompt = () => {
    switch (activeAction) {
      case "new-sketch":
        return (
          <SketchPrompt
            setActiveAction={setActiveAction}
            selection={selection}
            activeAction={activeAction}
          ></SketchPrompt>
        )
      case "":
        return <div></div>
    }
  }

  return (
    <div className="App">
      <AppBarTop></AppBarTop>
      <ActionBar
        setActiveAction={setActiveAction}
        setSelection={setSelection}
      ></ActionBar>

      <div style={{ width: "100vw", background: "#EEEEEE", display: "flex" }}>
        <div style={{ width: "20vw", background: "#AAFFFF", padding: "10px", display: "flex", flexDirection: "column" }}>
          {/* <DocTree doc={doc}></DocTree> */}
          {renderPrompt()}
          <History />
        </div>
        <div style={{ width: "80vw", background: "#FFFFFF" }}>
          {!oc && (
            <div style={{ width: "100%", height: 600, background: "#BBBBBB" }}>
              Please wait--loading OpenCascade wasm
            </div>
          )}
          {!!oc && (
            <MainViewport
              occtState={occtState}
              activeAction={activeAction}
              selection={selection}
              setSelection={setSelection}
            ></MainViewport>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
