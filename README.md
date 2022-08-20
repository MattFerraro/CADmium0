# CADmium

This is a prototype of a new 3D CAD modeling tool that runs 100% in-browser. It is completely free and open source.

[Demo Here!](https://mattferraro.github.io/CADmium/)

# Tools

This project uses [OpenCascade.js](https://ocjs.org/) as its boundary representation engine, Three.js for rendering, and React + Redux + Material UI for everything else.

# Status

This is currently an experiment to see what can be done quickly. Do not use this for anything unless you're willing to deal with buggy, immature software.

# Why?

Almost every aspect of our lives is owed to physical objects that have to be designed and manufactured. Our cars, homes, shoes, our pencils, water bottles, refrigerators--every single thing around us had to be planned out, modeled, simulated, then manufactured with the help of software.

The act of thoughtfully designing and then building things is one of the primary abilities that sets humans apart from animals. It is imperative that everyone who wants to, be able to participate in that process.

To that end, I believe it is unconscionable that the software necessary to participate in this process is either too expensive or too difficult for most people to use.

CADmium is my attempt to build a completely free, open-source CAD program that will be capable of handling the entire design process: from modeling to simulation to manufacturing.

CADmium will run in any modern browser, and I will publish Electron builds which will work without internet connection.

While I may offer cloud hosting as a convenience, _your data is yours_. CADmium will never become dependent on any cloud infrastructure for any of its core functionality. As long as browsers continue to function, you will always be able to clone the code yourself and run it all locally.

# Why not use FreeCAD?

[FreeCAD](https://www.freecadweb.org/) is an incredible achievement and much more mature that CADmium. It can do CAD, FEA/FEM, CAM, and much more. It is completely free and open source, and runs great on Windows/Mac/Linux.

The main drawbacks are that it still suffers from the [Toplogical Naming Problem](https://wiki.freecadweb.org/Topological_naming_problem), and that it has not yet comitted to a single way of handling assemblies, although the [RealThunder](https://github.com/realthunder/FreeCAD/releases) patches go a long way at fixing these deficiencies!

But the main reason I don't use FreeCAD is because its UI is too complex and unfriendly toward new users. If you ever put an untrained person in front of FreeCAD, their reaction is to be overwhelmed and discouraged and that is a serious problem. 

# Why not use Onshape?

[Onshape](https://www.onshape.com/en/) is fantastic. It's a web-based CAD modeling tool that prioritizes a clean, minimal UI and very simple, easy-to-discover user flows. Its support for assemblies is fantastic and it offers free usage for anyone who doesn't need their documents to be private. It also supports collaborative editing. It is truly a gift to anyone who wants to do CAD modeling.

The biggest downside is that it is not open source, and that it can't ever be open source because it relies on the Parasolid Boundary Representation engine which is closed-source. As wonderful as Onshape is, its parent company could go out of business, or decide to kill the product because it isn't profitable, or sell it to someone who kills it to reduce competition, or the company that owns Parasolid could refuse to renew their license. In all cases your data and your ability to the use the tool would disappear.

A second downside is that Onshape is completely dependent on cloud services. Even if you did have access to Onshape's source code, you don't have access to the data centers so your data would still be lost in the event that Onshape is ever shut down. Even worse, Onshape simply does not work offline. Many people in the world have only intermittent internet access so for them Onshape is just not an option.

The third downside is that it does not contain any functionality for simulations (FEA/FEM) or manufacturing (CAM). There is an Onshape marketplace where you can buy access to tools which do FEA/CAM, but those tools typically cost money and they break the virtuous cycle between design and simulation.

# Explicit Goals:

- Anyone with experience in other CAD modeling programs will be able to pick up CADmium and produce basic 3D designs without any coaching or tutorials whatsoever.
- Anyone with general computer familiarity will be able to pick up CADmium and produce basic 3D designs with less than 5 minutes of Youtube tutorials.
- Highly customizable but with sensible defaults: think VSCode, Android, or Ubuntu

# TODO

## Milestone 1: Bare minimum functionality

- ~~Demonstrate OpenCascade working efficiently in the browswer via wasm bindings~~
- ~~Replace the 3D model viewer with Three.js so I have complete control~~
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
