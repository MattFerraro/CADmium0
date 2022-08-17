import Box from "@mui/material/Box"
import { useEffect, useRef, useState } from "react"

import { Scene } from "three"

import {
  initScene,
  addPlaneToScene,
  addLightsToScene,
  addSketchToScene,
  addSolidToScene,
} from "./viewportUtils"

import { Raycaster, Vector2 } from "three"

function MainViewport({ occtState, activeAction }) {
  const raycaster = new Raycaster()
  const canvasRef = useRef()
  const renderPackage = useRef()

  useEffect(() => {
    renderPackage.current = initScene("main-viewport-canvas")
    addLightsToScene(renderPackage.current.scene)

    // HANDLE ANIMATION
    function animate() {
      // snip
      const delta = renderPackage.current.clock.getDelta()
      const hasControlsUpdated =
        renderPackage.current.cameraControls.update(delta)

      requestAnimationFrame(animate)

      if (hasControlsUpdated) {
        renderPackage.current.renderer.render(
          renderPackage.current.scene,
          renderPackage.current.camera
        )
      }
    }
    animate()
  }, [])

  useEffect(() => {
    if (activeAction === "sketch") {
      console.log("entering sketch mode!")
      renderPackage.current.cameraControls.setLookAt(0, 0, 5, 0, 0, 0, true)
    }
  }, [activeAction])

  useEffect(() => {
    if (!occtState) {
      return
    }

    const scene2 = new Scene()
    addLightsToScene(scene2)

    for (let plane of occtState.planes) {
      addPlaneToScene(plane, scene2)
    }

    for (let sketch of occtState.sketches) {
      addSketchToScene(sketch, scene2)
    }

    for (let solid of occtState.solids) {
      addSolidToScene(solid, scene2)
    }

    // renderPackage.current.scene.dispose()
    renderPackage.current.scene = scene2

    renderPackage.current.renderer.render(scene2, renderPackage.current.camera)
  }, [occtState])

  // const onMouseClick = (event) => {
  //   if (activeAction === "") {
  //     return
  //   }

  //   if (activeAction === "new-sketch") {
  //     const intersects = findIntersectingMeshes(event)

  //     if (intersects.length == 0) {
  //       // the user clicked in empty space and wants to deselect everything
  //       for (let plane of doc.default.planes) {
  //         plane.setSelected(false)
  //       }
  //     } else {
  //       for (let p of doc.default.planes) {
  //         if (p == intersects[0].object.docRef) {
  //           p.setSelected(true)
  //         } else {
  //           p.setSelected(false)
  //         }
  //       }
  //     }
  //   }
  // }

  const findIntersectingMeshes = (event) => {
    var rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const pointer = new Vector2()
    pointer.x = (x / canvasRef.current.width) * 2 - 1
    pointer.y = -(y / canvasRef.current.height) * 2 + 1

    raycaster.setFromCamera(pointer, renderPackage.current.camera)
    const intersects = raycaster
      .intersectObjects(renderPackage.current.scene.children)
      .filter((obj) => obj.object.isMesh)
    return intersects
  }

  return (
    <div className="main-viewport-container">
      <Box sx={{ flexGrow: 1 }}>
        <div
          id="main-viewport"
          style={{ width: "100%", height: "600px", background: "white" }}
        >
          <canvas
            ref={canvasRef}
            id="main-viewport-canvas"
            style={{ width: "100%", height: "100%" }}
          // onMouseMove={(e) => onMouseMove(e)}
          //onMouseDown={(e) => onMouseClick(e)}
          ></canvas>
        </div>
      </Box>
    </div>
  )
}

export default MainViewport
