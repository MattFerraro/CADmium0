import CloseIcon from "@mui/icons-material/Close"
import CheckIcon from "@mui/icons-material/Check"
import IconButton from "@mui/material/IconButton"

function SketchPrompt({ activeAction, setActiveAction, selection }) {
  const cancelSketch = () => {
    console.log("cancelling sketch")
    setActiveAction("")
  }

  const createSketch = () => {
    console.log("creating sketch")

    setActiveAction("sketch")
  }

  return (
    <div>
      <div>
        New Sketch
        <IconButton
          size="small"
          color="inherit"
          aria-label="accept"
          onClick={createSketch}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          size="small"
          color="inherit"
          aria-label="cancel"
          onClick={cancelSketch}
        >
          <CloseIcon />
        </IconButton>
      </div>
      {selection.length > 0 && <div>{selection[0].name}</div>}
      {selection.length === 0 && <div>Select Sketch Plane</div>}
      {activeAction}
    </div>
  )
}

export default SketchPrompt
