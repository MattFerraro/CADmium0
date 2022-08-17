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

import { History } from "./features/history/History"
import { useSelector, useDispatch } from "react-redux"
import { selectHistory } from "./features/history/historySlice"
import { makeExtrusion, makePlane, makeSketch } from "./occtUtils"

function App() {
  const [oc, setOC] = useState()
  const [doc, setDoc] = useState({})
  const [activeAction, setActiveAction] = useState("")
  const [selection, setSelection] = useState([])

  const history = useSelector(selectHistory)
  const [occtState, setOcctState] = useState({
    planes: [],
    points: [],
    sketches: [],
    solids: [],
  })

  useEffect(() => {
    console.log("Starting to import openCascade wasm...")
    const startTime = new Date()
    initOpenCascade({})
      .then((newOC) => {
        console.log("wasm is initialized!")
        const endTime = new Date()
        const delta = endTime - startTime
        console.log(delta)
        setOC(newOC)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [setOC])

  useEffect(() => {
    if (!oc) {
      return
    }
    const newState = {
      planes: [],
      points: [],
      sketches: [],
      solids: [],
    }

    const planesMap = {}
    const sketchesMap = {}
    for (let i = 0; i < history.length; i++) {
      const action = history[i]
      if (action.type === "newPlane") {
        const newPlane = makePlane(oc, action)
        newState.planes.push(newPlane)
        planesMap[newPlane.name] = newPlane
      }
      if (action.type === "newSketch") {
        const relevantPlane = planesMap[action.plane]
        const newSketch = makeSketch(oc, action, relevantPlane)
        newState.sketches.push(newSketch)
        sketchesMap[newSketch.name] = newSketch
      }
      if (action.type === "extrude") {
        for (let extrusion of action.polygons) {
          const relevantSketch = sketchesMap[extrusion.sketch]
          const relevantPlane = planesMap[relevantSketch.plane]
          const newSolid = makeExtrusion(
            oc,
            extrusion,
            relevantSketch,
            relevantPlane,
            action.height
          )
          newState.solids.push(newSolid)
        }
      }
    }

    // collect and mesh each body
    for (let s of newState.solids) {
      new oc.BRepMesh_IncrementalMesh_2(s.shape, 0.1, false, 0.1, false)
      const explorer = new oc.TopExp_Explorer_2(
        s.shape,
        oc.TopAbs_ShapeEnum.TopAbs_FACE,
        oc.TopAbs_ShapeEnum.TopAbs_SHAPE
      )

      // for this body, let's walk each face
      s.faces = []
      while (explorer.More()) {
        const newFace = {}
        const aFace = oc.TopoDS.Face_1(explorer.Current())
        const loc = new oc.TopLoc_Location_1()
        const purpose = oc.Poly_MeshPurpose_Active
        const triangulationHandle = new oc.BRep_Tool.Triangulation(aFace, loc, purpose)

        newFace.nodes = []
        newFace.triangles = [] // note that the values placed here are +1 higher than they need to be
        newFace.normals = []
        // for this face, let's walk each node and triangle
        if (!triangulationHandle.IsNull()) {
          const triangulation = triangulationHandle.get()
          for (let i = 1; i < triangulation.NbNodes() + 1; i++) {
            const node = triangulation.Node(i)
            newFace.nodes.push([node.X(), node.Y(), node.Z()])
          }
          for (let i = 1; i < triangulation.NbTriangles() + 1; i++) {
            const triangle = triangulation.Triangle(i)
            newFace.triangles.push([triangle.Value(1), triangle.Value(2), triangle.Value(3)])
          }

          console.log("do we even have normals?", triangulation.HasNormals())
        }

        s.faces.push(newFace)
        explorer.Next()
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
        <div
          style={{
            width: "20vw",
            background: "#FFFFFF",
            border: "1px solid black",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
