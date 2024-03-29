export function makeExtrusion(oc, extrusion, sketch, plane, height) {
    // this makes one single extrusion of a face by a height
    const solid = {}

    const oc_face = sketch.oc_faces[extrusion['polygon']]

    const prismVec = new oc.gp_Vec_4(
        plane.oc_normal.X() * height,
        plane.oc_normal.Y() * height,
        plane.oc_normal.Z() * height)
    let body = new oc.BRepPrimAPI_MakePrism_1(
        oc_face,
        prismVec,
        true,
        true
    ).Shape()
    solid.shape = body

    return solid
}

export function makePlane(oc, action) {
    const oc_origin = new oc.gp_Pnt_3(...action.origin)
    const oc_normal = new oc.gp_Dir_2(new oc.gp_Vec_4(...action.normal))
    const oc_xAxis = new oc.gp_Dir_2(new oc.gp_Vec_4(...action.xAxis))

    const oc_plane = new oc.gp_Pln_3(oc_origin, oc_normal)
    const oc_Ax3 = new oc.gp_Ax3_3(oc_origin, oc_normal, oc_xAxis)

    const plane = {
        name: action.name,
        origin: action.origin,
        normal: action.normal,
        oc_origin,
        oc_normal,
        oc_plane,
        oc_Ax3,
    }

    return plane
}

export function makeSketch(oc, action, plane) {
    // oc is the opencascade library
    // action is a plain old javascript object that describes this new sketch
    // plane is the reference plane that this sketch lives on
    const sketch = {
        name: action.name,
        plane: plane.name,
        oc_points: [],
        oc_segments: [],
        oc_faces: {},
        polygons: [],
    }

    // What transform do we need to apply?
    const transform = new oc.gp_Trsf_1()
    const fromSystem = new oc.gp_Ax3_1()
    const toSystem = plane.oc_Ax3
    transform.SetTransformation_1(toSystem, fromSystem)

    // Add the raw points
    const oc_pointsMap = {}
    for (let pt of action.data.points) {
        const newPt = new oc.gp_Pnt_3(pt.coords[0], pt.coords[1], 0).Transformed(
            transform
        )
        sketch.oc_points.push(newPt)
        oc_pointsMap[pt.id] = newPt
    }

    // Add the segments
    for (let segment of action.data.segments) {
        const startPt = oc_pointsMap[segment.start]
        const endPt = oc_pointsMap[segment.end]
        const newSegment = new oc.GC_MakeSegment_1(startPt, endPt).Value().get()
        sketch.oc_segments.push(newSegment)
    }

    for (let polygon of action.data.polygons) {
        const points = polygon.points
        const makePolygon = new oc.BRepBuilderAPI_MakePolygon_1()
        for (let pt of points) {
            const oc_pt = oc_pointsMap[pt]
            makePolygon.Add_1(oc_pt)
        }
        makePolygon.Close()
        const wire = makePolygon.Wire()
        const f = new oc.BRepBuilderAPI_MakeFace_15(wire, false).Shape()
        sketch.oc_faces[polygon.id] = f
    }

    // finally, what orientation is this sketch tied to?
    // transform this sketch to the correct location and rotation
    // console.log("Sketch is on this plane:", plane)

    return sketch
}
