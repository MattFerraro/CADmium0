# OCJS Test

This is a prototype of a new 3D CAD modeling tool that runs 100% in-browser. It is completely free and open source.

[Demo Here!](https://mattferraro.github.io/ocjstest/)

This project uses [OpenCascade.js](https://ocjs.org/) as its boundary representation engine, Three.js for rendering, and React + Material UI for everything else.

# Status

This is currently an experiment to see what can be done quickly. Do not use this for anything.

# TODO

## Milestone 1: Bare minimum functionality
- ~~Demonstrate OpenCascade working efficiently in the browswer via wasm bindings~~
- Replace the 3D model viewer with Three.js so I have complete control
- Allow the user to make a sketch with no constraints
- Allow a user to extrude stuff from their sketch
- Revolve, sweep, loft, fillet, chamfer, draft, shell, hole, linear pattern, radial pattern, mirror body, transform ops (scale, rotate, move), boolean ops (intersect, union, subtract) 
- Export stl and step files
- Add or build a 2D constraint engine so sketches can have constraints
- Global variables so users can do actual parametric design
- Minimally functional undo/redo functionality
- Part history

At the end of Milestone 1, the tool should be usable for simple things like designing an enclosure to be printed on a 3D printer.

## Milestone 2: Make it pretty and friendly
- Electron build and release system in CI so users can run offline
- Rich undo/redo functions
- Configurable hotkeys and mouse gestures
- Part colors
- Tabbed UI so you can have multiple parts open
- "Projects" which have multiple parts and therefore multiple tabs
- Configurable UI colors like how VSCode themes work. Maybe even use VSCode themes?!

At the end of Milestone 2, the tool should look very good and be very friendly for beginners and intermediate users to use.

## Milestone 3: Make it do more
- Assemblies with Joints!
- Part materials
- Calculate bulk properties like part mass, inertia matrix, center of mass, etc
- Sheet metal features
- Ability to host a user's files for them
- Multi-user collaboration, like Google Docs?
- Multi-user collaboration, but like SVN?

At the end of Milestone 3, the tool should be a legit competitor for actual market share. If I get this far, I'll probably need to figure out how to make a business or non-profit or something and start asking for donations.

## Milestone 4: Make it do FEA
- A way to add boundary conditions and loads
- A way to auto-mesh with only a few hyperparams that have sensible defaults
- A way to run FEA on that mesh using some sort of open source code like NASTRAN

## Milestone 5: Make it do CAM for Mills/Routers
- A way to add setups with different stock shapes
- A way to create tools and maintain a tool library
- A way to compute toolpaths for pocket, surface, etc
- Ability to export those toolpaths
- Feeds and speeds calculation and visualization of the force over time curves