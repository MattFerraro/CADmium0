export function initDoc(oc) {
  const doc = {
    default: {
      points: [],
      planes: []
    },
  }

  // xy is top
  // xz is front
  // yz is right

  // let's pre-generate some planes and an origin point
  const topPlane = makePlane(oc, "top", [0, 0, 0], [0, 0, 1], [1, 0, 0])
  const frontPlane = makePlane(oc, "front", [0, 0, 0], [0, -1, 0], [1, 0, 0])
  const rightPlane = makePlane(oc, "right", [0, 0, 0], [1, 0, 0], [0, 1, 0])
  doc.default.planes = [topPlane, frontPlane, rightPlane]

  const originPoint = makePoint(oc, "origin", [0, 0, 0])
  doc.default.points = [originPoint]

  return doc
}

export function makePlane(oc, name, origin, normal, xAxis) {
  const oc_origin = new oc.gp_Pnt_3(...origin)
  const oc_normal = new oc.gp_Vec_4(...normal)
  const oc_xAxis = new oc.gp_Vec_4(...xAxis)

  const oc_normal_dir = new oc.gp_Dir_2(oc_normal)

  const oc_plane = new oc.gp_Pln_3(oc_origin, oc_normal_dir)

  const plane = {
    name, origin, oc_origin, normal, oc_normal, xAxis, oc_xAxis, oc_plane
  }
  return plane
}

export function makePoint(oc, name, coords) {
  const oc_point = new oc.gp_Pnt_3(...coords)
  const point = { name, oc_point }
  return point
}
