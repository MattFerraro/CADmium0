// Takes a TDocStd_Document, creates a GLB file from it and returns a ObjectURL
export function visualizeDoc(oc, doc) {
  // Export a GLB file (this will also perform the meshing)
  const cafWriter = new oc.RWGltf_CafWriter(
    new oc.TCollection_AsciiString_2("./file.glb"),
    true
  )
  cafWriter.Perform_2(
    new oc.Handle_TDocStd_Document_2(doc),
    new oc.TColStd_IndexedDataMapOfStringString_1(),
    new oc.Message_ProgressRange_1()
  )

  // Read the GLB file from the virtual file system
  const glbFile = oc.FS.readFile("./file.glb", { encoding: "binary" })
  return URL.createObjectURL(
    new Blob([glbFile.buffer], { type: "model/gltf-binary" })
  )
}

// Takes TopoDS_Shape, add to document, create GLB file from it and returns a ObjectURL
export function visualizeShapes(oc, shapes_) {
  const shapes = Array.isArray(shapes_) ? shapes_ : [shapes_]

  // Create a document add our shapes
  const doc = new oc.TDocStd_Document(new oc.TCollection_ExtendedString_1())
  const shapeTool = oc.XCAFDoc_DocumentTool.ShapeTool(doc.Main()).get()
  for (const s of shapes) {
    shapeTool.SetShape(shapeTool.NewShape(), s)
    // Tell OpenCascade that we want our shape to get meshed
    new oc.BRepMesh_IncrementalMesh_2(s, 0.1, false, 0.1, false)
  }

  // Return our visualized document
  return visualizeDoc(oc, doc)
}

export function makeBottle(oc, width, height, thickness) {
  console.log(width, height, thickness)

  // Profile : Define Support Points
  const aPnt1 = new oc.gp_Pnt_3(-width / 2, 0, 0)
  const aPnt2 = new oc.gp_Pnt_3(-width / 2, -thickness / 4, 0)
  const aPnt3 = new oc.gp_Pnt_3(0, -thickness / 2, 0)
  const aPnt4 = new oc.gp_Pnt_3(width / 2, -thickness / 4, 0)
  const aPnt5 = new oc.gp_Pnt_3(width / 2, 0, 0)

  // Profile : Define the Geometry
  const anArcOfCircle = new oc.GC_MakeArcOfCircle_4(aPnt2, aPnt3, aPnt4)
  const aSegment1 = new oc.GC_MakeSegment_1(aPnt1, aPnt2)
  const aSegment2 = new oc.GC_MakeSegment_1(aPnt4, aPnt5)

  // Profile : Define the Topology
  const anEdge1 = new oc.BRepBuilderAPI_MakeEdge_24(
    new oc.Handle_Geom_Curve_2(aSegment1.Value().get())
  )
  const anEdge2 = new oc.BRepBuilderAPI_MakeEdge_24(
    new oc.Handle_Geom_Curve_2(anArcOfCircle.Value().get())
  )
  const anEdge3 = new oc.BRepBuilderAPI_MakeEdge_24(
    new oc.Handle_Geom_Curve_2(aSegment2.Value().get())
  )
  const aWire = new oc.BRepBuilderAPI_MakeWire_4(
    anEdge1.Edge(),
    anEdge2.Edge(),
    anEdge3.Edge()
  )

  // Complete Profile
  const xAxis = oc.gp.OX()
  const aTrsf = new oc.gp_Trsf_1()

  aTrsf.SetMirror_2(xAxis)
  const aBRepTrsf = new oc.BRepBuilderAPI_Transform_2(
    aWire.Wire(),
    aTrsf,
    false
  )
  const aMirroredShape = aBRepTrsf.Shape()

  const mkWire = new oc.BRepBuilderAPI_MakeWire_1()
  mkWire.Add_2(aWire.Wire())
  mkWire.Add_2(oc.TopoDS.Wire_1(aMirroredShape))
  const myWireProfile = mkWire.Wire()

  // Body : Prism the Profile
  const myFaceProfile = new oc.BRepBuilderAPI_MakeFace_15(myWireProfile, false)
  const aPrismVec = new oc.gp_Vec_4(0, 0, height)
  let myBody = new oc.BRepPrimAPI_MakePrism_1(
    myFaceProfile.Face(),
    aPrismVec,
    false,
    true
  )

  // Body : Apply Fillets
  const mkFillet = new oc.BRepFilletAPI_MakeFillet(
    myBody.Shape(),
    oc.ChFi3d_FilletShape.ChFi3d_Rational
  )
  const anEdgeExplorer = new oc.TopExp_Explorer_2(
    myBody.Shape(),
    oc.TopAbs_ShapeEnum.TopAbs_EDGE,
    oc.TopAbs_ShapeEnum.TopAbs_SHAPE
  )
  while (anEdgeExplorer.More()) {
    const anEdge = oc.TopoDS.Edge_1(anEdgeExplorer.Current())
    // Add edge to fillet algorithm
    mkFillet.Add_2(thickness / 12, anEdge)
    anEdgeExplorer.Next()
  }
  myBody = mkFillet.Shape()

  // Body : Add the Neck
  const neckLocation = new oc.gp_Pnt_3(0, 0, height)
  const neckAxis = oc.gp.DZ()
  const neckAx2 = new oc.gp_Ax2_3(neckLocation, neckAxis)

  const myNeckRadius = 5
  const myNeckHeight = 5

  const MKCylinder = new oc.BRepPrimAPI_MakeCylinder_3(
    neckAx2,
    myNeckRadius,
    myNeckHeight
  )
  const myNeck = MKCylinder.Shape()

  myBody = new oc.BRepAlgoAPI_Fuse_3(
    myBody,
    myNeck,
    new oc.Message_ProgressRange_1()
  )

  // Body : Create a Hollowed Solid
  let faceToRemove
  let zMax = -1
  const aFaceExplorer = new oc.TopExp_Explorer_2(
    myBody.Shape(),
    oc.TopAbs_ShapeEnum.TopAbs_FACE,
    oc.TopAbs_ShapeEnum.TopAbs_SHAPE
  )
  for (; aFaceExplorer.More(); aFaceExplorer.Next()) {
    const aFace = oc.TopoDS.Face_1(aFaceExplorer.Current())
    // Check if <aFace> is the top face of the bottle's neck
    const aSurface = oc.BRep_Tool.Surface_2(aFace)
    if (aSurface.get().$$.ptrType.name === "Geom_Plane*") {
      const aPlane = new oc.Handle_Geom_Plane_2(aSurface.get()).get()
      const aPnt = aPlane.Location()
      const aZ = aPnt.Z()
      if (aZ > zMax) {
        zMax = aZ
        faceToRemove = new oc.TopExp_Explorer_2(
          aFace,
          oc.TopAbs_ShapeEnum.TopAbs_FACE,
          oc.TopAbs_ShapeEnum.TopAbs_SHAPE
        ).Current()
      }
    }
  }

  const facesToRemove = new oc.TopTools_ListOfShape_1()
  facesToRemove.Append_1(faceToRemove)
  const s = myBody.Shape()
  myBody = new oc.BRepOffsetAPI_MakeThickSolid()
  myBody.MakeThickSolidByJoin(
    s,
    facesToRemove,
    -thickness / 50,
    1e-3,
    oc.BRepOffset_Mode.BRepOffset_Skin,
    false,
    false,
    oc.GeomAbs_JoinType.GeomAbs_Arc,
    false,
    new oc.Message_ProgressRange_1()
  )
  // Threading : Create Surfaces
  const aCyl1 = new oc.Geom_CylindricalSurface_1(
    new oc.gp_Ax3_2(neckAx2),
    myNeckRadius * 0.99
  )
  const aCyl2 = new oc.Geom_CylindricalSurface_1(
    new oc.gp_Ax3_2(neckAx2),
    myNeckRadius * 1.05
  )

  // Threading : Define 2D Curves
  const aPnt = new oc.gp_Pnt2d_3(2 * Math.PI, myNeckHeight / 2)
  const aDir = new oc.gp_Dir2d_4(2 * Math.PI, myNeckHeight / 4)
  const anAx2d = new oc.gp_Ax2d_2(aPnt, aDir)

  const aMajor = 2 * Math.PI
  const aMinor = myNeckHeight / 10

  const anEllipse1 = new oc.Geom2d_Ellipse_2(anAx2d, aMajor, aMinor, true)
  const anEllipse2 = new oc.Geom2d_Ellipse_2(anAx2d, aMajor, aMinor / 4, true)
  const anArc1 = new oc.Geom2d_TrimmedCurve(
    new oc.Handle_Geom2d_Curve_2(anEllipse1),
    0,
    Math.PI,
    true,
    true
  )
  const anArc2 = new oc.Geom2d_TrimmedCurve(
    new oc.Handle_Geom2d_Curve_2(anEllipse2),
    0,
    Math.PI,
    true,
    true
  )
  const tmp1 = anEllipse1.Value(0)
  const anEllipsePnt1 = new oc.gp_Pnt2d_3(tmp1.X(), tmp1.Y())
  const tmp2 = anEllipse1.Value(Math.PI)
  const anEllipsePnt2 = new oc.gp_Pnt2d_3(tmp2.X(), tmp2.Y())

  const aSegment = new oc.GCE2d_MakeSegment_1(anEllipsePnt1, anEllipsePnt2)
  // Threading : Build Edges and Wires
  const anEdge1OnSurf1 = new oc.BRepBuilderAPI_MakeEdge_30(
    new oc.Handle_Geom2d_Curve_2(anArc1),
    new oc.Handle_Geom_Surface_2(aCyl1)
  )
  const anEdge2OnSurf1 = new oc.BRepBuilderAPI_MakeEdge_30(
    new oc.Handle_Geom2d_Curve_2(aSegment.Value().get()),
    new oc.Handle_Geom_Surface_2(aCyl1)
  )
  const anEdge1OnSurf2 = new oc.BRepBuilderAPI_MakeEdge_30(
    new oc.Handle_Geom2d_Curve_2(anArc2),
    new oc.Handle_Geom_Surface_2(aCyl2)
  )
  const anEdge2OnSurf2 = new oc.BRepBuilderAPI_MakeEdge_30(
    new oc.Handle_Geom2d_Curve_2(aSegment.Value().get()),
    new oc.Handle_Geom_Surface_2(aCyl2)
  )
  const threadingWire1 = new oc.BRepBuilderAPI_MakeWire_3(
    anEdge1OnSurf1.Edge(),
    anEdge2OnSurf1.Edge()
  )
  const threadingWire2 = new oc.BRepBuilderAPI_MakeWire_3(
    anEdge1OnSurf2.Edge(),
    anEdge2OnSurf2.Edge()
  )
  oc.BRepLib.BuildCurves3d_2(threadingWire1.Wire())
  oc.BRepLib.BuildCurves3d_2(threadingWire2.Wire())
  oc.BRepLib.BuildCurves3d_2(threadingWire1.Wire())
  oc.BRepLib.BuildCurves3d_2(threadingWire2.Wire())

  // Create Threading
  const aTool = new oc.BRepOffsetAPI_ThruSections(true, false, 1.0e-6)
  aTool.AddWire(threadingWire1.Wire())
  aTool.AddWire(threadingWire2.Wire())
  aTool.CheckCompatibility(false)

  const myThreading = aTool.Shape()

  // Building the Resulting Compound
  const aRes = new oc.TopoDS_Compound()
  const aBuilder = new oc.BRep_Builder()
  aBuilder.MakeCompound(aRes)
  aBuilder.Add(aRes, myBody.Shape())
  aBuilder.Add(aRes, myThreading)

  // Rotate our finished bottle upright
  const tf = new oc.gp_Trsf_1()
  tf.SetRotation_1(
    new oc.gp_Ax1_2(new oc.gp_Pnt_1(), new oc.gp_Dir_4(1, 0, 0)),
    -Math.PI / 2
  )
  const loc = new oc.TopLoc_Location_2(tf)

  return aRes.Moved(loc, false)
}

// Make a box with a sphere cut out of it
// const box = new oc.BRepPrimAPI_MakeBox_2(1, 1, 1);
// const sphere = new oc.BRepPrimAPI_MakeSphere_5(new oc.gp_Pnt_3(0.5, 0.5, 0.5), radius);
// const cut = new oc.BRepAlgoAPI_Cut_3(box.Shape(), sphere.Shape(), new oc.Message_ProgressRange_1());
// cut.Build(new oc.Message_ProgressRange_1());
// const mUrl = visualizeShapes(oc, cut.Shape());
// setModelURL(mUrl)
