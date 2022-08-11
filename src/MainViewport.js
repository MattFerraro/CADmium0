import Box from "@mui/material/Box"
import { useEffect, useRef } from "react"

import {
  initScene,
  planeSelectedMaterial,
  planeMaterial,
} from "./viewportUtils"

import { Raycaster, Vector2 } from "three"

function MainViewport({ doc, activeAction }) {
  const raycaster = new Raycaster()
  const canvasRef = useRef()
  const renderPackage = useRef()
  useEffect(() => {
    renderPackage.current = initScene("main-viewport-canvas", doc)

    // HANDLE ANIMATION
    function animate() {
      requestAnimationFrame(animate)
      renderPackage.current.renderer.render(
        renderPackage.current.scene,
        renderPackage.current.camera
      )
    }
    animate()
  }, [])

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
      const pointer = new Vector2()
      var rect = canvasRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      pointer.x = (x / canvasRef.current.width) * 2 - 1
      pointer.y = -(y / canvasRef.current.height) * 2 + 1

      raycaster.setFromCamera(pointer, renderPackage.current.camera)
      const intersects = raycaster
        .intersectObjects(renderPackage.current.scene.children)
        .filter((obj) => obj.object.isMesh)

      for (let i = 0; i < doc.default.planes.length; i++) {
        if (
          intersects[0] &&
          intersects[0].object &&
          intersects[0].object == doc.default.planes[i].object
        ) {
          doc.default.planes[i].object.material = planeSelectedMaterial
        } else {
          doc.default.planes[i].object.material = planeMaterial
        }
      }
    }
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
            onMouseMove={(e) => onMouseMove(e)}
          ></canvas>
        </div>
      </Box>
    </div>
  )
}

export default MainViewport
