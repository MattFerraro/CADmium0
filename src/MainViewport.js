import Box from "@mui/material/Box"
import { useEffect, useRef } from "react"

import {
  initScene,
  addPlaneToScene,
} from "./viewportUtils"

import { useSelector, useDispatch } from 'react-redux';
import {
  selectHistory,
} from './features/history/historySlice';

import { Raycaster, Vector2 } from "three"

function MainViewport({ doc, activeAction, setSelection, selection }) {
  const history = useSelector(selectHistory);
  const raycaster = new Raycaster()
  const canvasRef = useRef()
  const renderPackage = useRef()
  useEffect(() => {
    renderPackage.current = initScene("main-viewport-canvas")

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
    console.log("History has changed from main viewport!")
  }, [history])


  useEffect(() => {
    if (activeAction === "sketch") {
      console.log("entering sketch mode!")
      renderPackage.current.cameraControls.setLookAt(0, 0, 5, 0, 0, 0, true)
    }
  }, [activeAction])

  // Any time selection changes, the whole MainViewport gets re-rendered
  if (doc.default) {
    // doc.default.planes.forEach((plane) => {
    //   if (plane.object) {
    //     if (plane == selection[0]) {
    //       plane.object.material = planeSelectedMaterial
    //     } else {
    //       plane.object.material = planeMaterial
    //     }
    //   }
    // })
  }

  useEffect(() => {
    if (!doc || !doc.default) { return }

    addPlaneToScene(doc.default.planes[0], renderPackage.current.scene)
    addPlaneToScene(doc.default.planes[1], renderPackage.current.scene)
    addPlaneToScene(doc.default.planes[2], renderPackage.current.scene)
  }, [doc])


  // TODO: Figure out how to do the right thing on window resize!
  // const onSizeChange = () => {
  //   console.log("size changed!")
  // }
  // window.addEventListener('resize', onSizeChange)
  const onMouseMove = (event) => {
    if (activeAction === "") {
      return
    }

    if (activeAction === "new-sketch") {
      const intersects = findIntersectingMeshes(event)
      console.log(intersects)

      if (!doc.default) {
        return
      }
      // for (let i = 0; i < doc.default.planes.length; i++) {
      //   if (
      //     intersects[0] &&
      //     intersects[0].object &&
      //     intersects[0].object == doc.default.planes[i].object
      //   ) {
      //     if (selection.length && selection[0] == doc.default.planes[i]) {
      //       doc.default.planes[i].object.material = planeSelectedMaterial
      //     } else {
      //       doc.default.planes[i].object.material = planeHoverMaterial
      //     }
      //   } else {
      //     if (selection.length && selection[0] == doc.default.planes[i]) {
      //       doc.default.planes[i].object.material = planeSelectedMaterial
      //     } else {
      //       doc.default.planes[i].object.material = planeMaterial
      //     }
      //   }
      // }
    }
  }

  const onMouseClick = (event) => {
    if (activeAction === "") {
      return
    }

    if (activeAction === "new-sketch") {
      const intersects = findIntersectingMeshes(event)

      if (intersects.length == 0) {
        // the user clicked in empty space and wants to deselect everything
        for (let plane of doc.default.planes) {
          plane.setSelected(false)
        }
      } else {
        // for (let inter of intersects) {
        //   inter.object.docRef.setSelected(true)
        //   break
        // }
        for (let p of doc.default.planes) {
          if (p == intersects[0].object.docRef) {
            p.setSelected(true)
          } else {
            p.setSelected(false)
          }
        }
      }
    }
  }

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
            onMouseDown={(e) => onMouseClick(e)}
          ></canvas>
        </div>
      </Box>
    </div>
  )
}

export default MainViewport
