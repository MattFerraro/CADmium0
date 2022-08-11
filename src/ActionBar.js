import sketch from "./svgs/sketch_min.svg"
import extrude from "./svgs/extrude_min.svg"
import fillet from "./svgs/fillet_min.svg"
import chamfer from "./svgs/chamfer_min.svg"
import draft from "./svgs/draft_min.svg"
import hole from "./svgs/hole_min.svg"
import loft from "./svgs/loft_min.svg"
import mirrorBody from "./svgs/mirrorBody_min.svg"
import patternLinear from "./svgs/patternLinear_min.svg"
import patternRadial from "./svgs/patternRadial_min.svg"
import plane from "./svgs/plane_min.svg"
import revolve from "./svgs/revolve_min.svg"
import scale from "./svgs/scale_min.svg"
import shell from "./svgs/shell_min.svg"
import sweep from "./svgs/sweep_min.svg"
import boolean from "./svgs/boolean_min.svg"

import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import { useState } from "react"

const actionIconWidth = 35

function AppBarTop({ setActiveAction }) {


  return (
    <div className="ActionBar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="grey" elevation={0}>
          <Toolbar variant="dense">
            <IconButton size="small" color="inherit" aria-label="sketch" onClick={() => setActiveAction("new-sketch")}>
              <img
                src={sketch}
                alt="sketch"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>

            <IconButton size="small" color="inherit" aria-label="extrude">
              <img
                src={extrude}
                alt="extrude"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>

            <IconButton size="small" color="inherit" aria-label="revolve">
              <img
                src={revolve}
                alt="revolve"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>

            <IconButton size="small" color="inherit" aria-label="sweep">
              <img
                src={sweep}
                alt="sweep"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>

            <IconButton size="small" color="inherit" aria-label="loft">
              <img
                src={loft}
                alt="loft"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>

            <IconButton size="small" color="inherit" aria-label="fillet">
              <img
                src={fillet}
                alt="fillet"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>

            <IconButton size="small" color="inherit" aria-label="chamfer">
              <img
                src={chamfer}
                alt="chamfer"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>

            <IconButton size="small" color="inherit" aria-label="draft">
              <img
                src={draft}
                alt="draft"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>

            <IconButton size="small" color="inherit" aria-label="shell">
              <img
                src={shell}
                alt="shell"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>

            <IconButton size="small" color="inherit" aria-label="hole">
              <img
                src={hole}
                alt="hole"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>

            <IconButton size="small" color="inherit" aria-label="patternLinear">
              <img
                src={patternLinear}
                alt="patternLinear"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>

            <IconButton size="small" color="inherit" aria-label="patternRadial">
              <img
                src={patternRadial}
                alt="patternRadial"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>

            <IconButton size="small" color="inherit" aria-label="mirrorBody">
              <img
                src={mirrorBody}
                alt="mirrorBody"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>

            <IconButton size="small" color="inherit" aria-label="boolean">
              <img
                src={boolean}
                alt="boolean"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>

            <IconButton size="small" color="inherit" aria-label="scale">
              <img
                src={scale}
                alt="scale"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>

            <IconButton size="small" color="inherit" aria-label="plane">
              <img
                src={plane}
                alt="plane"
                height={actionIconWidth}
                width={actionIconWidth}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default AppBarTop
